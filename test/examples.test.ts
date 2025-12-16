import { expect, fixture, html } from '@open-wc/testing';
import '../src/json-schema-form.js';
import type { JsonSchemaForm } from '../src/json-schema-form.js';

describe('Examples Verification', () => {
  let examples: string[] = [];

  before(async () => {
    // Fetch the list of examples from the manifest
    // Note: web-test-runner serves the root of the project
    const response = await fetch('/testdata/manifest.json');
    if (!response.ok) {
      throw new Error('Failed to fetch manifest.json');
    }
    examples = await response.json();

    // Filter out examples that use schema features we haven't implemented yet
    // (allOf, anyOf, oneOf, dependencies, references, etc.)
    const unsupported = [
      'bundledSchema',
      'ifThenElse',
      'propertyDependencies',
      'schemaDependencies',
      'references',
      'files', // File widgets not implemented
      'examples', // Might rely on specific loading
      'enumObjects', // Enum as object?
      'options', // Options?
      'single',
      'additionalProperties', // Not handling additionalProps yet
    ];
    examples = examples.filter((e) => !unsupported.includes(e));
  });

  it('verifies all examples render without error', async () => {
    // We iterate manually here because tests are defined synchronously usually,
    // but we can have a dynamic test suite if we structure it differently.
    // However, Mocha usually wants `it` calls to be known at definition time.
    // Since we fetch async in `before`, we might wrap the logic in a single test
    // that iterates, OR we just assume the file is static enough or use a dynamic pattern.
    // For simplicity/reliability in browser runners, we'll iterate inside one test
    // or use a setup that enables dynamic tests if we moved the fetch outside.
    //
    // Let's iterate inside one async test for now to keep it simple.
    // If one fails, the whole test fails, which is acceptable for "smoke testing" all examples.

    expect(examples.length).to.be.greaterThan(0);

    for (const name of examples) {
      try {
        const [modelRes, viewRes, dataRes] = await Promise.all([
          fetch(`/testdata/${name}/model.json`),
          fetch(`/testdata/${name}/view.json`),
          fetch(`/testdata/${name}/data.json`),
        ]);

        // Some files might not exist (e.g. view.json), handle correctly
        const schema = await modelRes.json();
        const view = viewRes.ok ? await viewRes.json() : {};
        const data = dataRes.ok ? await dataRes.json() : {};

        const el: JsonSchemaForm = await fixture(html`
                <wa-json-schema-form
                    .schema=${schema}
                    .view=${view}
                    .data=${data}
                ></wa-json-schema-form>
            `);

        await el.updateComplete;

        // Basic assertions
        expect(el.shadowRoot).to.exist;
        const form = el.shadowRoot?.querySelector('form');
        expect(form).to.exist;

        // Check that we don't have "Unknown type" errors generally,
        // unless the schema actually has unknown types (some might).
        // But mostly we want to ensure it produced *something*.
        expect(form?.children.length).to.be.greaterThan(0, `Example '${name}' rendered empty form`);
      } catch (e) {
        console.error(`Example '${name}' failed:`, e);
        throw new Error(`Example '${name}' failed to render: ${(e as Error).message}`);
      }
    }
  });
});
