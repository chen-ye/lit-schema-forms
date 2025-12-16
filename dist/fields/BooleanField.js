import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/checkbox/checkbox.js';
import '@awesome.me/webawesome/dist/components/switch/switch.js';
export function renderBooleanField(key, schema, value, onChange, view = {}, path = '', errors = []) {
    const isSwitch = view['ui:widget'] === 'switch';
    const currentErrors = errors.filter((e) => e.instanceLocation === `#${path}`);
    const errorMessage = currentErrors.length > 0 ? currentErrors.map((e) => e.error).join('; ') : undefined;
    const helpText = errorMessage || view['ui:help'] || '';
    if (isSwitch) {
        return html `
      <wa-switch
        checked=${!!value}
        @wa-input=${(e) => onChange(e.target.checked)}
        help-text=${errorMessage || view['ui:help'] || ''}
        ?invalid=${!!errorMessage}
      >${schema.title || key}</wa-switch>
    `;
    }
    // Use checkbox by default
    return html `
    <wa-checkbox
      checked=${!!value}
      @wa-input=${(e) => onChange(e.target.checked)}
      help-text=${errorMessage || view['ui:help'] || ''}
      ?invalid=${!!errorMessage}
    >${schema.title || key}</wa-checkbox>
  `;
}
//# sourceMappingURL=BooleanField.js.map