import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/input/input.js';
export function renderFileField(key, schema, value, onChange, view = {}, path = '', errors = []) {
    const currentErrors = errors.filter((e) => e.instanceLocation === `#${path}`);
    const errorMessage = currentErrors.length > 0 ? currentErrors.map((e) => e.error).join('; ') : undefined;
    const handleFileChange = (e) => {
        const input = e.target;
        const file = input.files?.[0];
        if (!file) {
            onChange(undefined);
            return;
        }
        const reader = new FileReader();
        reader.onload = (event) => {
            onChange(event.target?.result);
        };
        reader.readAsDataURL(file);
    };
    return html `
    <div class="file-field">
      <label style="display:block; margin-bottom: 0.25rem;">${schema.title || key}</label>
      <input
        type="file"
        @change=${handleFileChange}
        accept=${view['ui:options']?.accept || ''}
        style="display: block; width: 100%;"
      />
      ${value ? html `<div style="font-size: 0.8rem; margin-top: 0.25rem; word-break: break-all; color: #666;">Current: ${value.substring(0, 30)}...</div>` : ''}
      ${errorMessage ? html `<div style="color: var(--wa-color-danger-600); font-size: 0.8rem; margin-top: 0.25rem;">${errorMessage}</div>` : ''}
    </div>
  `;
}
//# sourceMappingURL=FileField.js.map