import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/input/input.js';
import type WaInput from '@awesome.me/webawesome/dist/components/input/input.js';
import type { ChangeHandler, JSONSchema, UISchema } from '../types.js';

export function renderNumberField(schema: JSONSchema, value: unknown, onChange: ChangeHandler, view: UISchema = {}) {
  return html`
    <wa-input
      type="number"
      label=${schema.title || ''}
      value=${String(value || '')}
      help-text=${(view['ui:help'] as string) || ''}
      @wa-input=${(e: Event) => {
        const val = (e.target as WaInput).value;
        onChange(val === '' ? undefined : Number(val));
      }}
    ></wa-input>
  `;
}
