import { css, html } from 'lit';
import { renderField } from './index.js';
export const objectFieldStyles = css`
  .object-properties {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-left: 1rem;
    border-left: 2px solid var(--wa-color-neutral-border-normal);
  }
`;
export function renderObjectField(key, schema, value, onChange, view = {}, path = '', errors = [], widgets = {}) {
  if (!schema.properties) {
    return html``;
  }
  const currentValue = value || {};
  return html`
    <div class="object-field">
      ${schema.title ? html`<h3>${schema.title}</h3>` : ''}
      <div class="object-properties">
        ${Object.keys(schema.properties).map((key) => {
          const propSchema = schema.properties[key];
          if (typeof propSchema === 'boolean') {
            // Boolean schema in properties (true=allow, false=deny).
            // For a form generator, we generally skip 'true' (no structure to render) or 'false' (hidden).
            return html``;
          }
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
            widgets,
          );
        })}
      </div>
    </div>
  `;
}
//# sourceMappingURL=ObjectField.js.map
