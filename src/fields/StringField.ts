import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/input/input.js';
import type WaInput from '@awesome.me/webawesome/dist/components/input/input.js';
import '@awesome.me/webawesome/dist/components/textarea/textarea.js';
import type { ChangeHandler, JSONSchema, UISchema } from '../types.js';
import type { ValidationError } from '../utils/validator.js';

export function renderStringField(
  key: string,
  schema: JSONSchema,
  value: unknown,
  onChange: ChangeHandler,
  view: UISchema = {},
  path: string = '',
  errors: ValidationError[] = [],
) {
  const currentErrors = errors.filter((e) => e.instanceLocation === `#${path}`);
  const errorMessage = currentErrors.length > 0 ? currentErrors.map((e) => e.error).join('; ') : undefined;

  if (view['ui:widget'] === 'textarea') {
    return html`
      <wa-textarea
        label=${schema.title || key}
        value=${(value as string) || ''}
        placeholder=${(view['ui:placeholder'] as string) || ''}
        help-text=${errorMessage || (view['ui:help'] as string) || ''}
        ?invalid=${!!errorMessage}
        @wa-input=${(e: Event) => onChange((e.target as HTMLInputElement).value)}
      ></wa-textarea>
    `;
  }

  return html`
    <wa-input
      label=${schema.title || key}
      value=${(value as string) || ''}
      placeholder=${(view['ui:placeholder'] as string) || ''}
      help-text=${errorMessage || (view['ui:help'] as string) || ''}
      ?invalid=${!!errorMessage}
      @wa-input=${(e: Event) => onChange((e.target as WaInput).value)}
    ></wa-input>
  `;
}
