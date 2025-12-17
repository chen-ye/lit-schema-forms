import { css, html } from 'lit';
import { renderField } from './index.js';
import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/icon/icon.js';
export const arrayFieldStyles = css `
  .array-field {
    border: 1px solid var(--wa-color-neutral-border-normal);
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 4px;
  }
  .array-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }
  .array-items {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.5rem;
  }
  .array-item {
    display: flex;
    gap: 0.5rem;
    align-items: flex-start;
    border: 1px solid var(--wa-color-neutral-border-normal);
    padding: 0.5rem;
    border-radius: 4px;
  }
`;
export function renderArrayField(key, schema, value, onChange, view = {}, path = '', errors = [], widgets = {}) {
    const items = (Array.isArray(value) ? value : []);
    const itemSchema = schema.items || {};
    const handleAdd = () => {
        let newItem;
        const itemsSchema = schema.items;
        if (itemsSchema) {
            if (itemsSchema.type === 'string')
                newItem = '';
            if (itemsSchema.type === 'number' || itemsSchema.type === 'integer')
                newItem = 0;
            if (itemsSchema.type === 'boolean')
                newItem = false;
            if (itemsSchema.type === 'object')
                newItem = {};
            if (itemsSchema.type === 'array')
                newItem = [];
        }
        const newItems = [...items, newItem];
        onChange(newItems);
    };
    const handleRemove = (index) => {
        const newItems = items.filter((_, i) => i !== index);
        onChange(newItems);
    };
    const handleChange = (index, val) => {
        const newItems = [...items];
        newItems[index] = val;
        onChange(newItems);
    };
    return html `
    <div class="array-field">
      <div class="array-header">
        <label style="font-weight: 500;">${schema.title || key}</label>
        <wa-button size="small" @click=${handleAdd}>
          <wa-icon slot="prefix" name="plus"></wa-icon>
          Add
        </wa-button>
      </div>

      <div class="array-items">
        ${items.map((item, index) => html `
          <div class="array-item">
            <div style="flex: 1;">
              ${renderField(String(index), itemSchema, item, (_key, val) => handleChange(index, val), view, `${path}/${index}`, errors, widgets)}
            </div>
            <wa-button variant="danger" size="small" outline @click=${() => handleRemove(index)}>
               <wa-icon name="trash"></wa-icon>
            </wa-button>
          </div>
          `)}
      </div>
    </div>
  `;
}
//# sourceMappingURL=ArrayField.js.map