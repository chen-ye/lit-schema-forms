import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/input/input.js';

export function renderNumberField(schema: any, value: any, onChange: (val: number) => void, view: any = {}) {
  return html`
    <wa-input
      type="number"
      label=${schema.title || ''}
      value=${value !== undefined ? String(value) : ''}
      placeholder=${view?.['ui:placeholder'] ? view['ui:placeholder'] : ''}
      help-text=${view?.['ui:help'] ? view['ui:help'] : ''}
      @wa-input=${(e: any) => {
        const val = e.target.value;
        onChange(val === '' ? undefined : Number(val));
      }}
    ></wa-input>
  `;
}
