import { css, html, type TemplateResult } from 'lit';
import '@awesome.me/webawesome/dist/components/input/input.js';
import type { ChangeHandler, JSONSchema, UISchema } from '../types.js';
import type { ValidationError } from '../utils/validator.js';

export const fileFieldStyles = css`
  .file-field {
    margin-bottom: 1rem;
  }
  .file-label {
    display: block;
    margin-bottom: 0.25rem;
    font-weight: 500;
  }
  .file-input {
    display: block;
    width: 100%;
  }
  .file-current {
    font-size: 0.8rem;
    margin-top: 0.25rem;
    word-break: break-all;
    color: var(--wa-color-text-quiet);
  }
  .file-error {
    color: var(--wa-color-danger-on-quiet);
    font-size: 0.8rem;
    margin-top: 0.25rem;
  }
`;

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
      <label class="file-label">${schema.title || key}</label>
      <input
        type="file"
        @change=${handleFileChange}
        accept=${((view['ui:options'] as Record<string, unknown>)?.accept as string) || ''}
        class="file-input"
      />
      ${value ? html`<div class="file-current">Current: ${(value as string).substring(0, 30)}...</div>` : ''}
      ${errorMessage ? html`<div class="file-error">${errorMessage}</div>` : ''}
    </div>
  `;
}
