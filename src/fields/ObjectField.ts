import { html, type TemplateResult } from 'lit';
import type { ChangeHandler, JSONSchema, UISchema } from '../types.js';
import type { ValidationError } from '../utils/validator.js';
import { renderField } from './index.js';

export function renderObjectField(
  key: string,
  schema: JSONSchema,
  value: unknown,
  onChange: ChangeHandler,
  view: UISchema = {},
  path: string = '',
  errors: ValidationError[] = [],
): TemplateResult {
  if (!schema.properties) {
    return html``;
  }

  const currentValue = (value as Record<string, unknown>) || {};

  return html`
    <div class="object-field">
      ${schema.title ? html`<h3>${schema.title}</h3>` : ''}
      <div class="object-properties" style="display: flex; flex-direction: column; gap: 1rem; padding-left: 1rem; border-left: 2px solid #eee;">
        ${Object.keys(schema.properties).map((key) => {
          const propSchema = schema.properties![key];
          const propValue = currentValue[key];

          return renderField(
            key,
            propSchema,
            propValue,
            (_k, v) => {
              onChange({ ...currentValue, [key]: v });
            },
            view,
            `${path}/${key}`,
            errors,
          );
        })}
      </div>
    </div>
  `;
}
