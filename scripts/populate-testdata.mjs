
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testDataDir = path.resolve(__dirname, '../testdata');

const SAMPLES_URL = 'https://raw.githubusercontent.com/rjsf-team/react-jsonschema-form/main/packages/playground/src/samples/';

const FILES = [
  'additionalProperties.ts',
  'allOf.ts',
  'alternatives.ts',
  'anyOf.ts',
  'arrays.ts',
  'bundledSchema.ts',
  'date.ts',
  'defaults.ts',
  'enumObjects.ts',
  'errorSchema.ts',
  'errors.ts',
  'examples.ts',
  'files.ts',
  'ifThenElse.ts',
  'large.ts',
  'nested.ts',
  'null.ts',
  'nullable.ts',
  'numbers.ts',
  'oneOf.ts',
  'optionalDataControls.ts',
  'options.ts',
  'ordering.ts',
  'patternProperties.ts',
  'propertyDependencies.ts',
  'references.ts',
  'schemaDependencies.ts',
  'simple.ts',
  'single.ts',
  'validation.ts'
];

function fetchContent(filename) {
  return new Promise((resolve, reject) => {
    https.get(SAMPLES_URL + filename, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
      res.on('error', reject);
    });
  });
}

function preprocessContent(content) {
  // Remove imports
  let cleaned = content.replace(/^import .*$/gm, '');
  // Remove specific types
  cleaned = cleaned.replace(/:\s*Sample/g, '');
  cleaned = cleaned.replace(/\s+as\s+RJSFSchema/g, '');
  cleaned = cleaned.replace(/:\s*(number|string|boolean|any|void)/g, '');
  // Handle export default
  // 1. export default identifier; -> export const data = identifier;
  // 2. export default { ... }; -> export const data = { ... };
  cleaned = cleaned.replace(/export default/g, 'export const data =');

  return cleaned;
}

// Ensure testdata dir exists
if (!fs.existsSync(testDataDir)) fs.mkdirSync(testDataDir);

async function processFile(filename) {
  const name = filename.replace('.ts', '');
  console.log(`Processing ${name}...`);

  try {
    const content = await fetchContent(filename);
    const cleaned = preprocessContent(content);

    // Write to temp file to import
    const tempFile = path.resolve(__dirname, `temp_${name}.mjs`);
    fs.writeFileSync(tempFile, cleaned);

    try {
      const module = await import(`file://${tempFile}`);
      const { schema, uiSchema, formData } = module.data;

      const dir = path.join(testDataDir, name);
      if (!fs.existsSync(dir)) fs.mkdirSync(dir);

      fs.writeFileSync(path.join(dir, 'model.json'), JSON.stringify(schema, null, 2));
      if (uiSchema) fs.writeFileSync(path.join(dir, 'view.json'), JSON.stringify(uiSchema, null, 2));
      if (formData) fs.writeFileSync(path.join(dir, 'data.json'), JSON.stringify(formData, null, 2));

      console.log(`Generated ${name}`);
    } catch (e) {
      console.error(`Failed to import/extract ${name}:`, e.message);
    } finally {
      if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
    }
  } catch (e) {
    console.error(`Error processing ${filename}:`, e.message);
  }
}

async function main() {
  for (const file of FILES) {
    await processFile(file);
  }
}

main();
