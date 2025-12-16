import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/input/input.js';
import '@awesome.me/webawesome/dist/components/slider/slider.js';
export function renderNumberField(key, schema, value, onChange, view = {}, path = '', errors = []) {
    const currentErrors = errors.filter((e) => e.instanceLocation === `#${path}`);
    const errorMessage = currentErrors.length > 0 ? currentErrors.map((e) => e.error).join('; ') : undefined;
    if (view['ui:widget'] === 'range') {
        return html `
      <wa-slider
        label=${schema.title || key}
        value=${value || 0}
        min=${schema.minimum ?? 0}
        max=${schema.maximum ?? 100}
        step=${schema.multipleOf ?? 1}
        help-text=${errorMessage || view['ui:help'] || ''}
        ?invalid=${!!errorMessage}
        @wa-input=${(e) => onChange(e.target.value)}
      ></wa-slider>
    `;
    }
    return html `
    <wa-input
      type="number"
      label=${schema.title || key}
      value=${String(value || '')}
      help-text=${errorMessage || view['ui:help'] || ''}
      ?invalid=${!!errorMessage}
      @wa-input=${(e) => {
        const val = e.target.value;
        onChange(val === '' ? undefined : Number(val));
    }}
    ></wa-input>
  `;
}
//# sourceMappingURL=NumberField.js.map