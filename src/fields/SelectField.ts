import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/select/select.js';
import type WaSelect from '@awesome.me/webawesome/dist/components/select/select.js';
import '@awesome.me/webawesome/dist/components/option/option.js';
import '@awesome.me/webawesome/dist/components/radio-group/radio-group.js';
import '@awesome.me/webawesome/dist/components/radio/radio.js';
import type WaRadioGroup from '@awesome.me/webawesome/dist/components/radio-group/radio-group.js';
import type { ChangeHandler, JSONSchema, UISchema } from '../types.js';
import type { ValidationError } from '../utils/validator.js';

export function renderSelectField(
  key: string,
  schema: JSONSchema,
  value: unknown,
  onChange: ChangeHandler,
  view: UISchema = {},
  path: string = '',
  errors: ValidationError[] = [],
) {
  const options = schema.enum || [];
  const currentErrors = errors.filter((e) => e.instanceLocation === `#${path}`);
  const errorMessage = currentErrors.length > 0 ? currentErrors.map((e) => e.error).join('; ') : undefined;

  if (view['ui:widget'] === 'radio') {
    return html`
      <wa-radio-group
        label=${schema.title || key}
        value=${String(value || '')}
        help-text=${errorMessage || (view['ui:help'] as string) || ''}
        ?invalid=${!!errorMessage}
        @wa-input=${(e: Event) => onChange((e.target as WaRadioGroup).value)}
      >
        ${options.map(
          (opt: unknown) => html`
            <wa-radio value=${String(opt)}>${String(opt)}</wa-radio>
          `,
        )}
      </wa-radio-group>
    `;
  }

  return html`
    <wa-select
      label=${schema.title || key}
      value=${String(value || '')}
      help-text=${errorMessage || (view['ui:help'] as string) || ''}
      ?invalid=${!!errorMessage}
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
