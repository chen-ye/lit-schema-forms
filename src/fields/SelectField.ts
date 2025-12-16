import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/select/select.js';
import '@awesome.me/webawesome/dist/components/option/option.js';

export function renderSelectField(schema: any, value: any, onChange: (val: any) => void, view: any = {}) {
  const options = schema.enum || [];

  return html`
    <wa-select
      label=${schema.title || ''}
      value=${value || ''}
      placeholder=${view['ui:placeholder'] || ''}
      help-text=${view['ui:help'] || ''}
      @wa-change=${(e: any) => onChange(e.target.value)}
    >
      ${options.map(
        (opt: any) => html`
        <wa-option value=${opt}>${opt}</wa-option>
      `,
      )}
    </wa-select>
  `;
}
