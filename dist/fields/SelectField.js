import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/select/select.js';
import '@awesome.me/webawesome/dist/components/option/option.js';
import '@awesome.me/webawesome/dist/components/radio-group/radio-group.js';
import '@awesome.me/webawesome/dist/components/radio/radio.js';
export function renderSelectField(key, schema, value, onChange, view = {}, path = '', errors = []) {
  const options = schema.enum || [];
  const currentErrors = errors.filter((e) => e.instanceLocation === `#${path}`);
  const errorMessage = currentErrors.length > 0 ? currentErrors.map((e) => e.error).join('; ') : undefined;
  if (view['ui:widget'] === 'radio') {
    return html`
      <wa-radio-group
        label=${schema.title || key}
        value=${String(value || '')}
        help-text=${errorMessage || view['ui:help'] || ''}
        ?invalid=${!!errorMessage}
        @wa-input=${(e) => onChange(e.target.value)}
      >
        ${options.map(
          (opt) => html`
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
      help-text=${errorMessage || view['ui:help'] || ''}
      ?invalid=${!!errorMessage}
      @wa-input=${(e) => onChange(e.target.value)}
    >
      <wa-option value="">Select option...</wa-option>
      ${options.map(
        (opt) => html`
        <wa-option value=${String(opt)}>${String(opt)}</wa-option>
      `,
      )}
    </wa-select>
  `;
}
//# sourceMappingURL=SelectField.js.map
