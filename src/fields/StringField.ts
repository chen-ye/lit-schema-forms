import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/input/input.js';

export function renderStringField(schema: any, value: any, onChange: (val: string) => void, view: any = {}) {
  return html`
    <wa-input
      label=${schema.title || ''}
      value=${value || ''}
      placeholder=${view?.['ui:placeholder'] ? view['ui:placeholder'] : ''}
      help-text=${view?.['ui:help'] ? view['ui:help'] : ''}
      @wa-input=${(e: any) => onChange(e.target.value)}
    ></wa-input>
  `;
}
