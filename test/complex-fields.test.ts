import { expect, fixture, html, oneEvent } from '@open-wc/testing';
import '../src/json-schema-form.js';
import type { JsonSchemaForm } from '../src/json-schema-form.js';

describe('JsonSchemaForm Complex Fields', () => {
  it('renders nested object fields', async () => {
    const schema = {
      type: 'object',
      properties: {
        meta: {
          type: 'object',
          title: 'Metadata',
          properties: {
            created: { type: 'string', title: 'Created' },
            version: { type: 'number', title: 'Version' },
          },
        },
      },
    };
    const el: JsonSchemaForm = await fixture(html`<wa-json-schema-form .schema=${schema}></wa-json-schema-form>`);

    // Check for nested inputs
    const inputs = el.shadowRoot?.querySelectorAll('wa-input');
    expect(inputs.length).to.equal(2);
    expect(inputs[0].label).to.equal('Created');
    expect(inputs[1].label).to.equal('Version');

    // Check for grouping title
    const headings = el.shadowRoot?.querySelectorAll('h3');
    expect(headings.length).to.be.greaterThan(0);
    expect(Array.from(headings).find((h) => h.textContent === 'Metadata')).to.exist;
  });

  it('renders array fields and supports adding items', async () => {
    const schema = {
      type: 'object',
      properties: {
        tags: {
          type: 'array',
          title: 'Tags',
          items: { type: 'string' },
        },
      },
    };
    const el: JsonSchemaForm = await fixture(html`<wa-json-schema-form .schema=${schema}></wa-json-schema-form>`);

    // Initially no items
    let inputs = el.shadowRoot?.querySelectorAll('wa-input');
    expect(inputs.length).to.equal(0);

    // Click Add
    // biome-ignore lint/style/noNonNullAssertion: Test utility
    const button = el.shadowRoot.querySelector('wa-button')!;
    expect(button.textContent?.trim()).to.equal('Add');

    // Setup listener BEFORE action to catch sync events
    const listener = oneEvent(el, 'lsf-change');
    button.click();
    const { detail } = await listener;

    expect(detail.data.tags).to.have.lengthOf(1);
    expect(detail.data.tags[0]).to.equal('');

    await el.updateComplete;

    // Now check inputs
    inputs = el.shadowRoot?.querySelectorAll('wa-input');
    expect(inputs.length).to.equal(1);
  });

  it('supports removing array items', async () => {
    const schema = {
      type: 'object',
      properties: {
        tags: {
          type: 'array',
          items: { type: 'string' },
        },
      },
    };
    const data = { tags: ['A', 'B'] };
    const el: JsonSchemaForm = await fixture(
      html`<wa-json-schema-form .schema=${schema} .data=${data}></wa-json-schema-form>`,
    );

    let inputs = el.shadowRoot?.querySelectorAll('wa-input');
    expect(inputs.length).to.equal(2);
    expect(inputs[0].value).to.equal('A');

    // Find remove buttons (variant="danger")
    const buttons = Array.from(el.shadowRoot?.querySelectorAll('wa-button'));
    const removeBtn = buttons.find((b) => b.variant === 'danger');
    expect(removeBtn).to.exist;

    const listener = oneEvent(el, 'lsf-change');
    removeBtn?.click();
    const { detail } = await listener;

    expect(detail.data.tags).to.have.lengthOf(1);
    expect(detail.data.tags[0]).to.equal('B'); // B should remain if we removed index 0

    await el.updateComplete;
    inputs = el.shadowRoot?.querySelectorAll('wa-input');
    expect(inputs.length).to.equal(1);
    expect(inputs[0].value).to.equal('B');
  });

  it('updates array items', async () => {
    const schema = {
      type: 'object',
      properties: {
        tags: {
          type: 'array',
          items: { type: 'string' },
        },
      },
    };
    const data = { tags: ['Old'] };
    const el: JsonSchemaForm = await fixture(
      html`<wa-json-schema-form .schema=${schema} .data=${data}></wa-json-schema-form>`,
    );

    // biome-ignore lint/style/noNonNullAssertion: Test utility
    const input = el.shadowRoot.querySelector('wa-input')!;

    const listener = oneEvent(el, 'lsf-change');
    input.value = 'New';
    input.dispatchEvent(new CustomEvent('wa-input', { detail: { value: 'New' }, bubbles: true, composed: true }));
    const { detail } = await listener;

    expect(detail.data.tags[0]).to.equal('New');
  });
});
