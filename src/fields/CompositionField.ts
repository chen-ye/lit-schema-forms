import { html } from 'lit';
import { renderField } from './index.js';
import '@awesome.me/webawesome/dist/components/select/select.js';
import type WaSelect from '@awesome.me/webawesome/dist/components/select/select.js';
import '@awesome.me/webawesome/dist/components/option/option.js';
import type { ChangeHandler, JSONSchema, UISchema } from '../types.js';

export function renderCompositionField(
  schema: JSONSchema,
  value: unknown,
  onChange: ChangeHandler,
  view: UISchema = {},
) {
  // Determine if it's oneOf or anyOf
  const options = (schema.oneOf || schema.anyOf) as JSONSchema[];
  if (!options || !Array.isArray(options)) {
    return html`<div style="color: red">Invalid schema: missing oneOf/anyOf options</div>`;
  }

  // Heuristic: try to match value to an option index
  // For now, we rely on a custom property or just index 0 if not present
  // A better way is "validation based inference" but that is expensive.
  // We will assume `value` might help us.

  // Minimal state management: store selected index in a way that persists?
  // For this simple implementation, we might stick to index 0 unless value matches type of option.

  let selectedIndex = 0;

  // Simple type matching
  if (value !== undefined) {
    const valType = Array.isArray(value) ? 'array' : typeof value;
    const matchIndex = options.findIndex((opt) => opt.type === valType);
    if (matchIndex >= 0) {
      selectedIndex = matchIndex;
    }
  }

  const handleOptionChange = (e: Event) => {
    const newIndex = Number((e.target as WaSelect).value);
    const newSchema = options[newIndex];
    let newData: unknown;
    if (newSchema.properties) newData = {};
    if (newSchema.type === 'array') newData = [];
    if (newSchema.type === 'string') newData = '';
    if (newSchema.type === 'number' || newSchema.type === 'integer') newData = 0;
    if (newSchema.type === 'boolean') newData = false;

    onChange(newData);
    // Force re-render happens via parent update
  };

  const currentSchema = options[selectedIndex] || options[0];

  return html`
    <div class="composition-field" style="border: 1px dashed #ccc; padding: 1rem; border-radius: 4px;">
      <div style="margin-bottom: 1rem;">
        <label>${schema.title || 'Options'}</label>
        <wa-select
            value=${String(selectedIndex)}
            @input=${handleOptionChange}
            size="small"
        >
          ${options.map(
            (opt: JSONSchema, i: number) => html`
            <wa-option value=${String(i)}>${opt.title || `Option ${i + 1}`}</wa-option>
          `,
          )}
        </wa-select>
        </div>

      ${renderField('option-' + selectedIndex, currentSchema, value, (_k, val) => onChange(val), view)}
    </div>
  `;
}
