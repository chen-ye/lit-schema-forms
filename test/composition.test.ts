import { expect, fixture, html } from '@open-wc/testing';
import '../src/json-schema-form.js';
import type { JsonSchemaForm } from '../src/json-schema-form.js';

describe('Schema Composition', () => {
  it('renders allOf by merging schemas', async () => {
    const schema = {
      allOf: [
        { type: 'object', properties: { foo: { type: 'string', title: 'Foo' } } },
        { type: 'object', properties: { bar: { type: 'number', title: 'Bar' } } },
      ],
    };
    const el: JsonSchemaForm = await fixture(html`<wa-json-schema-form .schema=${schema}></wa-json-schema-form>`);

    // Should render inputs for both foo (string) and bar (number)
    const inputs = el.shadowRoot?.querySelectorAll('wa-input');
    expect(inputs.length).to.equal(2);
    expect(inputs[0].label).to.equal('Foo');
    expect(inputs[1].label).to.equal('Bar');
  });

  it('renders oneOf with a selector', async () => {
    const schema = {
      oneOf: [
        { type: 'string', title: 'Option A' },
        { type: 'number', title: 'Option B' },
      ],
    };
    const el: JsonSchemaForm = await fixture(html`<wa-json-schema-form .schema=${schema}></wa-json-schema-form>`);

    // Check for selector
    const select = el.shadowRoot?.querySelector('wa-select');
    expect(select).to.exist;

    // Default to first option (string)
    const inputs = el.shadowRoot?.querySelectorAll('wa-input');
    expect(inputs.length).to.equal(1);
    expect(inputs[0].type).to.not.equal('number'); // wa-input default type is text

    // Switch to option 2
    // biome-ignore lint/style/noNonNullAssertion: Test utility
    select!.value = '1';
    select?.dispatchEvent(new CustomEvent('input', { bubbles: true })); // CompositionField listens to input

    await el.updateComplete;
    // Wait for internal re-render or event based update?
    // CompositionField handles change by calling onChange with new default.
    // Parent updates data -> re-renders.

    // We expect parent to have updated data.
    // Wait for loop: select -> onChange -> parent.data=... -> requestUpdate -> render -> renderField -> CompositionField

    // Verify input type changed to number
    // Note: Render might take a tick.
    await new Promise((r) => setTimeout(r, 0)); // tick

    const input = el.shadowRoot?.querySelector('wa-input');
    expect(input).to.exist;
    expect(input?.type).to.equal('number');
  });

  it('persists selection when data is ambiguous (e.g. empty object matching multiple options)', async () => {
    // Both options are objects, so data={} is valid for both.
    const schema = {
      anyOf: [
        { type: 'object', title: 'Option A', properties: { a: { type: 'string' } } },
        { type: 'object', title: 'Option B', properties: { b: { type: 'string' } } },
      ],
    };
    const el: JsonSchemaForm = await fixture(html`<wa-json-schema-form .schema=${schema}></wa-json-schema-form>`);

    const select = el.shadowRoot?.querySelector('wa-select');
    expect(select).to.exist;
    expect(select?.value).to.equal('0'); // Default to A

    // Switch to Option B
    // biome-ignore lint/style/noNonNullAssertion: Test utility
    select!.value = '1';
    select?.dispatchEvent(new CustomEvent('input', { bubbles: true }));

    await el.updateComplete;
    await new Promise((r) => setTimeout(r, 0)); // Tick for render

    // In the stateless version, this would snap back to '0' because {} matches Option A first.
    // In the stateful version, it should stay '1'.
    expect(select?.value).to.equal('1');

    // Verify we are rendering Option B's field (property 'b')
    const inputs = el.shadowRoot?.querySelectorAll('wa-input');
    // Option A has 'a', Option B has 'b'.
    // We expect to see 'b' (or label 'b')
    // Since we don't have labels defined in properties, it uses key.
    expect(inputs?.length).to.equal(1);
    expect(inputs?.[0].label).to.equal('b');
  });

  it('renders null field', async () => {
    const schema = { type: 'null', title: 'Nothing here' };
    const el: JsonSchemaForm = await fixture(html`<wa-json-schema-form .schema=${schema}></wa-json-schema-form>`);
    const div = el.shadowRoot?.querySelector('.null-field');
    expect(div).to.exist;
    expect(div?.textContent).to.contain('Nothing here');
  });
});
