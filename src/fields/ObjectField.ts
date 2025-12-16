import { html } from 'lit';
import { renderField } from './index.js';

export function renderObjectField(
  schema: any,
  value: any,
  onChange: (val: any) => void,
  view: any = {},
  _keyPath: string = '',
) {
  if (!schema.properties) {
    return html``;
  }

  const currentValue = value || {};

  return html`
    <div class="object-field">
      ${schema.title ? html`<h3>${schema.title}</h3>` : ''}
      <div class="object-properties" style="display: flex; flex-direction: column; gap: 1rem; padding-left: 1rem; border-left: 2px solid #eee;">
        ${Object.keys(schema.properties).map((key) => {
          const propSchema = schema.properties[key];
          const _propView = view[key] || {}; // View for this specific property
          const propValue = currentValue[key];

          return renderField(
            key,
            propSchema,
            propValue,
            (_k, v) => {
              onChange({ ...currentValue, [key]: v });
            },
            view, // We pass the *parent* view context? No, renderField expects properties of parent view.
            // Actually, in index.ts logic: const fieldView = view[key] || {};
            // So we should pass 'view' (current object's view config) to renderField.
          );
        })}
      </div>
    </div>
  `;
}
