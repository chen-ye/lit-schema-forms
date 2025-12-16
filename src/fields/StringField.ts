import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/input/input.js';
import type WaInput from '@awesome.me/webawesome/dist/components/input/input.js';
import '@awesome.me/webawesome/dist/components/textarea/textarea.js';
import type { ChangeHandler, JSONSchema, UISchema } from '../types.js';

export function renderStringField(schema: JSONSchema, value: unknown, onChange: ChangeHandler, view: UISchema = {}) {
  if (view['ui:widget'] === 'textarea') {
    return html`
      <wa-textarea
        label=${schema.title || ''}
        value=${(value as string) || ''}
        placeholder=${(view['ui:placeholder'] as string) || ''}
        help-text=${(view['ui:help'] as string) || ''}
        @wa-input=${(e: Event) => onChange((e.target as HTMLInputElement).value)}
      ></wa-textarea>
    `;
  }

  return html`
    <wa-input
      label=${schema.title || ''}
      value=${(value as string) || ''}
      placeholder=${(view['ui:placeholder'] as string) || ''}
      help-text=${(view['ui:help'] as string) || ''}
      @wa-input=${(e: Event) => onChange((e.target as WaInput).value)}
    ></wa-input>
  `;
}
