/* eslint-disable multiline-comment-style */

import { pathToFileURL } from 'node:url';
import { Generator, type PackageConfig } from '@jspm/generator';
import { program } from 'commander';
import fs from 'fs';
import { access, constants, readFile } from 'fs/promises';
import path from 'path';

// --- 1. Utility: Concurrency Limiter ---
// A simple helper to limit concurrent operations (like p-limit)
// to avoid overwhelming the file system or the Generator.
const pLimit = <T>(concurrency: number) => {
  const queue: (() => Promise<void>)[] = [];
  let activeCount = 0;

  const next = () => {
    activeCount--;
    if (queue.length > 0) {
      void queue.shift()!();
    }
  };

  return (fn: () => Promise<T>): Promise<T> => {
    return new Promise((resolve, reject) => {
      const run = async () => {
        activeCount++;
        try {
          resolve(await fn());
        } catch (err) {
          // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
          reject(err);
        } finally {
          next();
        }
      };

      if (activeCount < concurrency) {
        void run();
      } else {
        queue.push(run);
      }
    });
  };
};

const limit = pLimit(10); // Run 10 installations in parallel

interface IImportMap {
  imports?: Record<string, string>;
  scopes?: Record<string, Record<string, string>>;
}

program
  .argument('<in_path>', 'directory containing the node_modules for the project', (in_path: string) => in_path, './')
  .option('--dev', 'Include devDependencies for the root package');
program.parse();

const [in_path] = program.processedArgs as [string];
const options = program.opts();
const importmapName = 'importmap.importmap';

const targetDir = path.resolve(process.cwd(), in_path);
const filename = path.join(targetDir, importmapName);
const rootNodeModules = path.resolve(process.cwd(), 'node_modules');

// Manual overrides configuration
const manualOverrides: IImportMap = {
};

/**
 * Non-blocking check to keep the event loop moving.
 */
async function exists(filePath: string): Promise<boolean> {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

/**
 * Filter mappings
 */
async function filterExistingMappings(overrides: IImportMap, baseDir: string): Promise<IImportMap> {
  const valid: IImportMap = { imports: {}, scopes: {} };

  // Filter imports in parallel
  if (overrides.imports) {
    await Promise.all(
      Object.entries(overrides.imports).map(async ([key, val]) => {
        if (await exists(path.resolve(baseDir, val))) {
          valid.imports![key] = val;
        }
      }),
    );
  }

  // Filter scopes in parallel
  if (overrides.scopes) {
    await Promise.all(
      Object.entries(overrides.scopes).map(async ([scope, mappings]) => {
        if (!(await exists(path.resolve(baseDir, scope)))) return;

        const validMappings: Record<string, string> = {};
        await Promise.all(
          Object.entries(mappings).map(async ([key, val]) => {
            if (await exists(path.resolve(baseDir, val))) {
              validMappings[key] = val;
            }
          }),
        );

        if (Object.keys(validMappings).length > 0) {
          valid.scopes![scope] = validMappings;
        }
      }),
    );
  }

  return valid;
}

const validManualOverrides = await filterExistingMappings(manualOverrides, targetDir);

// Initialize Generator
const generator = new Generator({
  mapUrl: pathToFileURL(filename).href,
  baseUrl: pathToFileURL(targetDir).href,
  defaultProvider: 'nodemodules',
  env: ['production', 'browser', 'module'],
  inputMap: validManualOverrides,
});

// Read package.json to identify dependencies
const packageJsonPath = path.join(targetDir, 'package.json');
let rootDependencies: string[] = [];

if (await exists(packageJsonPath)) {
  const pkg = JSON.parse(await readFile(packageJsonPath, 'utf-8')) as PackageConfig;
  rootDependencies = [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})];

  if (options.dev) {
    rootDependencies.push(...Object.keys(pkg.devDependencies || {}));
  }
} else {
  console.warn(`No package.json found at ${packageJsonPath}, generating empty map.`);
}

const manualMappings: Record<string, string> = {};
const visited = new Set<string>();

/**
 * Resolves an entry point from a package's exports or main field.
 */
function resolveEntryPoint(depPkg: PackageConfig): string | null {
  let entryPoint: string | null = null;
  if (depPkg.exports) {
    const exports = depPkg.exports;
    if (typeof exports === 'string') {
      entryPoint = exports;
    } else if (typeof exports === 'object' && exports !== null && !Array.isArray(exports)) {
      const exportsObj = exports as Record<string, unknown>;
      const rootExport = exportsObj['.'] ?? exports;
      if (typeof rootExport === 'string') {
        entryPoint = rootExport;
      } else if (typeof rootExport === 'object' && rootExport !== null && !Array.isArray(rootExport)) {
        const rootExportObj = rootExport as Record<string, unknown>;
        const resolved = rootExportObj.browser ?? rootExportObj.import ?? rootExportObj.default;
        if (typeof resolved === 'string') entryPoint = resolved;
      }
    }
  }
  if (!entryPoint && depPkg.main) entryPoint = depPkg.main;
  return entryPoint?.startsWith('./') ? entryPoint.substring(2) : entryPoint || null;
}

/**
 * Optimized installPackage
 */
async function installPackage(depName: string, searchPaths: string[] = []): Promise<void> {
  // Sync check is vital here to prevent queueing the same dep multiple times
  if (visited.has(depName)) return;
  visited.add(depName);

  // Check all candidate paths in parallel and return the first one found
  const candidates = [
    ...searchPaths.map((p) => path.join(p, 'node_modules', depName)),
    path.join(targetDir, 'node_modules', depName),
    path.join(rootNodeModules, depName),
  ];

  // Check existence in parallel
  const checks = await Promise.all(candidates.map((p) => exists(p)));
  const foundPath = candidates.find((_, i) => checks[i]);

  if (!foundPath) {
    console.warn(`Skipping ${depName} (not found in any search path)`);
    return;
  }

  // Always ensure a directory mapping for all dependencies (logical path)
  let mapPath = path.relative(targetDir, foundPath);
  if (!mapPath.startsWith('.')) mapPath = './' + mapPath;

  // We can set this immediately
  manualMappings[depName + '/'] = `${mapPath}/`;

  // Attempt 1: Install by name
  try {
    await generator.install({ target: depName, subpaths: true });
    return;
  } catch (e) {
    console.debug(
      `Install by name for package ${depName} ({${mapPath}}) failed:\n`,
      e,
      '\nFalling back to path mapping.',
    );
    /* Fallback required */
  }

  // Attempt 2: Install by explicit relative path
  try {
    await generator.install({ target: mapPath, subpaths: true });
    return;
  } catch (e) {
    console.debug(
      `Install by path for package ${depName} ({${mapPath}}) failed:\n`,
      e,
      '\nFalling back to manual mapping.',
    );
    /* Fallback required */
  }

  // Attempt 3: Manual Fallback
  console.warn(`Fallback: Manual mapping for ${depName} at ${foundPath}`);
  const pkgRoot = foundPath;
  const depPackageJsonPath = path.join(pkgRoot, 'package.json');

  // Try resolving entry point via package.json
  if (await exists(depPackageJsonPath)) {
    try {
      const depPkg = JSON.parse(await readFile(depPackageJsonPath, 'utf-8')) as PackageConfig;
      const entryPoint = resolveEntryPoint(depPkg);
      if (entryPoint) {
        manualMappings[depName] = `${mapPath}/${entryPoint}`;
      }

      // Recurse for transitive dependencies
      const transitiveDeps = Object.keys(depPkg.dependencies || {});
      if (transitiveDeps.length > 0) {
        await Promise.all(transitiveDeps.map((sub) => installPackage(sub, [pkgRoot])));
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      console.warn(`Failed to read package.json for ${depName}: ${message}`);
    }
  }

  // Last resort: Look for standard index files if no mapping established yet
  if (!manualMappings[depName]) {
    if (await exists(path.join(pkgRoot, 'index.js'))) {
      manualMappings[depName] = `${mapPath}/index.js`;
    } else if (await exists(path.join(pkgRoot, 'index.mjs'))) {
      manualMappings[depName] = `${mapPath}/index.mjs`;
    }
  }
}

/**
 * Recursively sorts keys in the import map to ensure deterministic output.
 */
function sortImportMap(map: IImportMap): IImportMap {
  const sorted: IImportMap = {};
  if (map.imports) {
    sorted.imports = {};
    for (const key of Object.keys(map.imports).sort()) sorted.imports[key] = map.imports[key];
  }
  if (map.scopes) {
    sorted.scopes = {};
    for (const scope of Object.keys(map.scopes).sort()) {
      sorted.scopes[scope] = {};
      for (const key of Object.keys(map.scopes[scope]).sort()) sorted.scopes[scope][key] = map.scopes[scope][key];
    }
  }
  return sorted;
}

/**
 * Execute the generation process. Wrapped in a function to avoid "unsettled top-level await" warnings.
 */
async function main() {
  if (rootDependencies.length > 0) {
    console.log(`Generating importmap for ${rootDependencies.length} root dependencies...`);

    // Apply limit ONLY to root dependencies to avoid recursive deadlocks.
    // The transitive dependencies inside installPackage will run freely,
    // but they are naturally throttled because only 10 roots start at a time.
    await Promise.all(rootDependencies.map((dep) => limit(() => installPackage(dep))));
  }

  const map = generator.getMap() as unknown as IImportMap;

  // Merge manual mappings from fallback logic
  if (Object.keys(manualMappings).length > 0) {
    console.log('Merging manual mappings:', manualMappings);
    const imports = map.imports || (map.imports = {});
    Object.assign(imports, manualMappings);
  }

  // Re-merge validated overrides to ensure precedence
  if (validManualOverrides.imports) {
    const imports = map.imports || (map.imports = {});
    Object.assign(imports, validManualOverrides.imports);
  }

  if (validManualOverrides.scopes) {
    const scopes = map.scopes || (map.scopes = {});
    for (const [scope, mappings] of Object.entries(validManualOverrides.scopes)) {
      scopes[scope] = Object.assign(scopes[scope] || {}, mappings);
    }
  }

  const sortedMap = sortImportMap(map);

  console.log(`Writing [${filename}]`);
  fs.writeFileSync(filename, JSON.stringify(sortedMap, null, 4));
}

// Execute and catch errors
main().catch((err) => {
  console.error('Failed to generate import map:', err);
  process.exit(1);
});
