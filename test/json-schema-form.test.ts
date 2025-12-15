import { html, fixture, expect } from '@open-wc/testing';
import '../src/json-schema-form.js';
import { JsonSchemaForm } from '../src/json-schema-form.js';

describe('JsonSchemaForm', () => {
  it('renders simple fields', async () => {
    const schema = {
      type: 'object',
      properties: {
        firstName: { type: 'string', title: 'First Name' },
        age: { type: 'integer', title: 'Age' }
      }
    };
    const data = { firstName: 'Alice', age: 30 };

    const el = await fixture<JsonSchemaForm>(html`
      <wa-json-schema-form .schema=${schema} .data=${data}></wa-json-schema-form>
    `);

    const inputs = el.shadowRoot!.querySelectorAll('wa-input');
    expect(inputs.length).to.equal(2);

    const firstNameInput = inputs[0] as any;
    expect(firstNameInput.label).to.equal('First Name');

    const ageInput = inputs[1] as any;
    expect(ageInput.label).to.equal('Age');
  });

  it('renders boolean fields as checkboxes', async () => {
    const schema = {
      type: 'object',
      properties: {
        agree: { type: 'boolean', title: 'Agree' }
      }
    };
    const el = await fixture<JsonSchemaForm>(html`
      <wa-json-schema-form .schema=${schema}></wa-json-schema-form>
    `);

    const checkbox = el.shadowRoot!.querySelector('wa-checkbox') as any;
    expect(checkbox).to.exist;
    expect(checkbox.textContent).to.contain('Agree');
  });

  it('renders boolean fields as switch when requested', async () => {
    const schema = {
      type: 'object',
      properties: {
        enable: { type: 'boolean', title: 'Enable' }
      }
    };
    const view = {
      enable: { 'ui:widget': 'switch' }
    };
    const el = await fixture<JsonSchemaForm>(html`
      <wa-json-schema-form .schema=${schema} .view=${view}></wa-json-schema-form>
    `);

    const toggle = el.shadowRoot!.querySelector('wa-switch') as any;
    expect(toggle).to.exist;
    expect(toggle.textContent).to.contain('Enable');
  });

  it('renders enums as select', async () => {
    const schema = {
      type: 'object',
      properties: {
        color: { type: 'string', title: 'Color', enum: ['Red', 'Blue'] }
      }
    };
    const el = await fixture<JsonSchemaForm>(html`
      <wa-json-schema-form .schema=${schema}></wa-json-schema-form>
    `);

    const select = el.shadowRoot!.querySelector('wa-select') as any;
    expect(select).to.exist;
    expect(select.label).to.equal('Color');

    const options = select.querySelectorAll('wa-option');
    expect(options.length).to.equal(2);
  });

  it('renders textarea when widget is textarea', async () => {
    const schema = {
      type: 'object',
      properties: {
        bio: { type: 'string', title: 'Bio' }
      }
    };
    const view = {
      bio: { 'ui:widget': 'textarea' }
    };
    const el = await fixture<JsonSchemaForm>(html`
      <wa-json-schema-form .schema=${schema} .view=${view}></wa-json-schema-form>
    `);

    const textarea = el.shadowRoot!.querySelector('wa-textarea') as any;
    expect(textarea).to.exist;
    expect(textarea.label).to.equal('Bio');
  });
});
