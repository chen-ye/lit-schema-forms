import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/input/input.js';
import '@awesome.me/webawesome/dist/components/textarea/textarea.js';
export function renderStringField(key, schema, value, onChange, view = {}, path = '', errors = []) {
  const currentErrors = errors.filter((e) => e.instanceLocation === `#${path}`);
  const errorMessage = currentErrors.length > 0 ? currentErrors.map((e) => e.error).join('; ') : undefined;
  if (view['ui:widget'] === 'textarea') {
    return html`
      <wa-textarea
        label=${schema.title || key}
        value=${value || ''}
        placeholder=${view['ui:placeholder'] || ''}
        help-text=${errorMessage || view['ui:help'] || ''}
        ?invalid=${!!errorMessage}
        @wa-input=${(e) => onChange(e.target.value)}
      ></wa-textarea>
    `;
  }
  let inputType = 'text';
  const widget = view['ui:widget'];
  if (widget === 'password') inputType = 'password';
  if (widget === 'email') inputType = 'email';
  if (widget === 'uri') inputType = 'url';
  if (widget === 'date') inputType = 'date';
  if (widget === 'datetime-local') inputType = 'datetime-local';
  if (widget === 'time') inputType = 'time';
  if (widget === 'color') inputType = 'color';
  if (widget === 'tel') inputType = 'tel';
  if (widget === 'search') inputType = 'search';
  if (schema.format === 'email') inputType = 'email';
  if (schema.format === 'uri') inputType = 'url';
  if (schema.format === 'date-time') inputType = 'datetime-local';
  if (schema.format === 'date') inputType = 'date';
  if (schema.format === 'time') inputType = 'time';
  return html`

    <wa-input
      type=${inputType}
      label=${schema.title || key}
      value=${value || ''}
      placeholder=${view['ui:placeholder'] || ''}
      help-text=${errorMessage || view['ui:help'] || ''}
      ?invalid=${!!errorMessage}
      @wa-input=${(e) => onChange(e.target.value)}
    ></wa-input>
  `;
}
//# sourceMappingURL=StringField.js.map
