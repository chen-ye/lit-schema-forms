import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/select/select.js';
import type WaSelect from '@awesome.me/webawesome/dist/components/select/select.js';
import '@awesome.me/webawesome/dist/components/option/option.js';
import type { ChangeHandler, JSONSchema, UISchema } from '../types.js';

export function renderSelectField(schema: JSONSchema, value: unknown, onChange: ChangeHandler, view: UISchema = {}) {
  const options = schema.enum || [];

  return html`
    <wa-select
      label=${schema.title || ''}
      value=${String(value || '')}
      help-text=${(view['ui:help'] as string) || ''}
      @wa-input=${(e: Event) => onChange((e.target as WaSelect).value)}
    >
      <wa-option value="">Select option...</wa-option>
      ${options.map(
        (opt: unknown) => html`
        <wa-option value=${String(opt)}>${String(opt)}</wa-option>
      `,
      )}
    </wa-select>
  `;
}
