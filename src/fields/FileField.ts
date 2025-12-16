import { html } from 'lit';
import '@awesome.me/webawesome/dist/components/input/input.js';
import type { ChangeHandler, JSONSchema, UISchema } from '../types.js';
import type { ValidationError } from '../utils/validator.js';

export function renderFileField(
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

  const handleFileChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      onChange(undefined);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      onChange(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  return html`
    <div class="file-field">
      <label style="display:block; margin-bottom: 0.25rem;">${schema.title || key}</label>
      <input
        type="file"
        @change=${handleFileChange}
        accept=${((view['ui:options'] as Record<string, unknown>)?.accept as string) || ''}
        style="display: block; width: 100%;"
      />
      ${value ? html`<div style="font-size: 0.8rem; margin-top: 0.25rem; word-break: break-all; color: #666;">Current: ${(value as string).substring(0, 30)}...</div>` : ''}
      ${errorMessage ? html`<div style="color: var(--wa-color-danger-600); font-size: 0.8rem; margin-top: 0.25rem;">${errorMessage}</div>` : ''}
    </div>
  `;
}
