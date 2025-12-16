import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/input/input.js';
import type WaInput from '@awesome.me/webawesome/dist/components/input/input.js';
import type { ChangeHandler, JSONSchema, UISchema } from '../types.js';
import type { ValidationError } from '../utils/validator.js';

export function renderNumberField(
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

  return html`
    <wa-input
      type="number"
      label=${schema.title || key}
      value=${String(value || '')}
      help-text=${errorMessage || (view['ui:help'] as string) || ''}
      ?invalid=${!!errorMessage}
      @wa-input=${(e: Event) => {
        const val = (e.target as WaInput).value;
        onChange(val === '' ? undefined : Number(val));
      }}
    ></wa-input>
  `;
}
