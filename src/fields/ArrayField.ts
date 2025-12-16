import { html, type TemplateResult } from 'lit';
import { renderField } from './index.js';
import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/icon/icon.js';
import type { ChangeHandler, JSONSchema, UISchema } from '../types.js';
import type { ValidationError } from '../utils/validator.js';

export function renderArrayField(
  key: string,
  schema: JSONSchema,
  value: unknown,
  onChange: ChangeHandler,
  view: UISchema = {},
  path: string = '',
  errors: ValidationError[] = [],
) {
  const items = (Array.isArray(value) ? value : []) as unknown[];
  const itemSchema = (schema.items as JSONSchema) || {};

  const handleAdd = () => {
    let newItem: unknown;
    const itemsSchema = schema.items as JSONSchema;

    if (itemsSchema) {
      if (itemsSchema.type === 'string') newItem = '';
      if (itemsSchema.type === 'number' || itemsSchema.type === 'integer') newItem = 0;
      if (itemsSchema.type === 'boolean') newItem = false;
      if (itemsSchema.type === 'object') newItem = {};
      if (itemsSchema.type === 'array') newItem = [];
    }

    const newItems = [...items, newItem];
    onChange(newItems);
  };

  const handleRemove = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
  };

  const handleChange = (index: number, val: unknown) => {
    const newItems = [...items];
    newItems[index] = val;
    onChange(newItems);
  };

  return html`
    <div class="array-field" style="border: 1px solid #ccc; padding: 1rem; margin-bottom: 1rem; border-radius: 4px;">
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
        <label style="font-weight: 500;">${schema.title || key}</label>
        <wa-button size="small" @click=${handleAdd}>
          <wa-icon slot="prefix" name="plus"></wa-icon>
          Add
        </wa-button>
      </div>

      <div class="array-items" style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem;">
        ${items.map(
          (item, index): TemplateResult => html`
          <div class="array-item" style="display: flex; gap: 0.5rem; align-items: flex-start; border: 1px solid #ddd; padding: 0.5rem; border-radius: 4px;">
            <div style="flex: 1;">
              ${renderField(
                String(index),
                itemSchema,
                item,
                (_key, val) => handleChange(index, val),
                view,
                `${path}/${index}`,
                errors,
              )}
            </div>
            <wa-button variant="danger" size="small" outline @click=${() => handleRemove(index)}>
               <wa-icon name="trash"></wa-icon>
            </wa-button>
          </div>
          `,
        )}
      </div>
    </div>
  `;
}
