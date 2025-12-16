import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/input/input.js';
import type WaInput from '@awesome.me/webawesome/dist/components/input/input.js';
import '@awesome.me/webawesome/dist/components/slider/slider.js';
import type WaSlider from '@awesome.me/webawesome/dist/components/slider/slider.js';
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

  if (view['ui:widget'] === 'range') {
    return html`
      <wa-slider
        label=${schema.title || key}
        value=${(value as number) || 0}
        min=${schema.minimum ?? 0}
        max=${schema.maximum ?? 100}
        step=${schema.multipleOf ?? 1}
        help-text=${errorMessage || (view['ui:help'] as string) || ''}
        ?invalid=${!!errorMessage}
        @wa-input=${(e: Event) => onChange((e.target as WaSlider).value)}
      ></wa-slider>
    `;
  }

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
