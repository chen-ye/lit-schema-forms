import { html } from 'lit';
import { renderField } from './index.js';
import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/icon/icon.js';

export function renderArrayField(
  schema: any,
  value: any[],
  onChange: (val: any[]) => void,
  view: any = {}
) {
  const items = value || [];
  const itemSchema = schema.items || {};

  const handleAdd = () => {
    const newItems = [...items, getDefaultValue(itemSchema)];
    onChange(newItems);
  };

  const handleRemove = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
  };

  const handleChange = (index: number, val: any) => {
    const newItems = [...items];
    newItems[index] = val;
    onChange(newItems);
  };

  return html`
    <div class="array-field">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <label>${schema.title || 'Items'}</label>
        <wa-button size="small" @click=${handleAdd}>Add</wa-button>
      </div>

      <div class="array-items" style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.5rem;">
        ${items.map((item, index) => html`
          <div class="array-item" style="display: flex; gap: 0.5rem; align-items: flex-start; border: 1px solid #ddd; padding: 0.5rem; border-radius: 4px;">
            <div style="flex: 1;">
              ${renderField(
                String(index),
                itemSchema,
                item,
                (_, val) => handleChange(index, val),
                view.items || {} // Assuming view.items holds config for items
              )}
            </div>
            <wa-button variant="danger" size="small" @click=${() => handleRemove(index)}>
               <wa-icon name="trash" label="Remove"></wa-icon>
            </wa-button>
          </div>
        `)}
      </div>
    </div>
  `;
}

function getDefaultValue(schema: any) {
  if (schema.default !== undefined) return schema.default;
  if (schema.type === 'string') return '';
  if (schema.type === 'number') return 0;
  if (schema.type === 'boolean') return false;
  if (schema.type === 'object') return {};
  if (schema.type === 'array') return [];
  return undefined;
}
