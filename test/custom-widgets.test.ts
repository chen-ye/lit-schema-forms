import { expect, fixture, html } from '@open-wc/testing';
import '../src/json-schema-form.js';
import type { JsonSchemaForm } from '../src/json-schema-form.js';
import type { JSONSchema, UISchema, WidgetRegistry } from '../src/types.js';

describe('Custom Widgets', () => {
  it('renders a custom widget when provided in the registry', async () => {
    const schema: JSONSchema = {
      type: 'object',
      properties: {
        customField: {
          type: 'string',
          title: 'Custom Field',
        },
      },
    };

    const view: UISchema = {
      customField: {
        'ui:widget': 'myCustomWidget',
      },
    };

    const widgets: WidgetRegistry = {
      myCustomWidget: (key, _schema, value, _onChange) => {
        return html`<div class="custom-widget" data-key="${key}">Custom: ${value}</div>`;
      },
    };

    const el = await fixture<JsonSchemaForm>(html`
      <wa-json-schema-form .schema=${schema} .view=${view} .widgets=${widgets} .data=${{ customField: 'Hello' }}></wa-json-schema-form>
    `);

    const customEl = el.shadowRoot!.querySelector('.custom-widget');
    expect(customEl).to.exist;
    expect(customEl!.textContent).to.contain('Custom: Hello');
    expect(customEl!.getAttribute('data-key')).to.equal('customField');
  });

  it('falls back to default rendering if widget is not in registry', async () => {
    const schema: JSONSchema = {
      type: 'object',
      properties: {
        defaultField: {
          type: 'string',
          title: 'Default Field',
        },
      },
    };

    const view: UISchema = {
      defaultField: {
        'ui:widget': 'nonExistentWidget',
      },
    };

    const el = await fixture<JsonSchemaForm>(html`
      <wa-json-schema-form .schema=${schema} .view=${view} .data=${{ defaultField: 'World' }}></wa-json-schema-form>
    `);

    // Should render as default input (checking for wa-input or wa-textarea depending on default string fallback)
    // Actually default string is wa-input, but if widget is unknown it falls through.
    // Wait, let's check index.ts:
    // if widgetName && widgets[widgetName] return ...
    // ... string render ...
    // renderStringField handles standard widgets. 'nonExistentWidget' won't match standard ones.
    // It should render a default wa-input.

    const input = el.shadowRoot!.querySelector('wa-input');
    expect(input).to.exist;
    expect(input!.value).to.equal('World');
  });
});
