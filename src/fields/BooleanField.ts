import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/checkbox/checkbox.js';
import type WaCheckbox from '@awesome.me/webawesome/dist/components/checkbox/checkbox.js';
import '@awesome.me/webawesome/dist/components/switch/switch.js';
import type WaSwitch from '@awesome.me/webawesome/dist/components/switch/switch.js';
import type { ChangeHandler, JSONSchema, UISchema } from '../types.js';
import type { ValidationError } from '../utils/validator.js';

export function renderBooleanField(
  key: string,
  schema: JSONSchema,
  value: unknown,
  onChange: ChangeHandler,
  view: UISchema = {},
  path: string = '',
  errors: ValidationError[] = [],
) {
  const isSwitch = view['ui:widget'] === 'switch';
  const currentErrors = errors.filter((e) => e.instanceLocation === `#${path}`);
  const errorMessage = currentErrors.length > 0 ? currentErrors.map((e) => e.error).join('; ') : undefined;
  const helpText = errorMessage || (view['ui:help'] as string) || '';

  if (isSwitch) {
    return html`
      <wa-switch
        checked=${!!value}
        @wa-input=${(e: Event) => onChange((e.target as WaSwitch).checked)}
        help-text=${errorMessage || (view['ui:help'] as string) || ''}
        ?invalid=${!!errorMessage}
      >${schema.title || key}</wa-switch>
    `;
  }

  // Use checkbox by default
  return html`
    <wa-checkbox
      checked=${!!value}
      @wa-input=${(e: Event) => onChange((e.target as WaCheckbox).checked)}
      help-text=${errorMessage || (view['ui:help'] as string) || ''}
      ?invalid=${!!errorMessage}
    >${schema.title || key}</wa-checkbox>
  `;
}
