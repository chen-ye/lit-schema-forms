import { html } from 'lit';
import { mergeSchemas } from '../utils/schema-utils.js';
import { arrayFieldStyles, renderArrayField } from './ArrayField.js';
import { renderBooleanField } from './BooleanField.js';
import { compositionFieldStyles, renderCompositionField } from './CompositionField.js';
import { fileFieldStyles, renderFileField } from './FileField.js';
import { nullFieldStyles, renderNullField } from './NullField.js';
import { renderNumberField } from './NumberField.js';
import { objectFieldStyles, renderObjectField } from './ObjectField.js';
import { renderSelectField } from './SelectField.js';
import { renderStringField } from './StringField.js';
import '@awesome.me/webawesome/dist/components/textarea/textarea.js';
export { arrayFieldStyles, compositionFieldStyles, fileFieldStyles, nullFieldStyles, objectFieldStyles };
export function renderField(key, schema, value, onChange, view = {}, path = '', errors = [], widgets = {}) {
  const fieldView = key === '' ? view : view[key] || {};
  const currentPath = path ? `${path}/${key}` : key ? `/${key}` : '';
  // Check for custom widget in registry
  const widgetName = fieldView['ui:widget'];
  if (widgetName && typeof widgetName === 'string' && widgets[widgetName]) {
    return widgets[widgetName](key, schema, value, onChange, fieldView, currentPath, errors, widgets);
  }
  if (fieldView['ui:widget'] === 'hidden') {
    return html``;
  }
  if (fieldView['ui:widget'] === 'file') {
    return renderFileField(key, schema, value, (val) => onChange(key, val), fieldView, currentPath, errors);
  }
  // Handle allOf (merge and render)
  if (schema.allOf) {
    const merged = mergeSchemas(schema.allOf);
    return renderField(key, merged, value, onChange, view, path, errors, widgets);
  }
  // Handle Composition (oneOf / anyOf)
  if (schema.oneOf || schema.anyOf) {
    return renderCompositionField(
      key,
      schema,
      value,
      (val) => onChange(key, val),
      fieldView,
      currentPath,
      errors,
      widgets,
    );
  }
  // Handle Enum -> Select
  if (schema.enum) {
    return renderSelectField(key, schema, value, (val) => onChange(key, val), fieldView, currentPath, errors);
  }
  // Handle specific types
  // Infer object if properties exist but type is missing
  if (schema.type === 'object' || schema.properties) {
    return renderObjectField(key, schema, value, (val) => onChange(key, val), fieldView, currentPath, errors, widgets);
  }
  switch (schema.type) {
    case 'array':
      return renderArrayField(key, schema, value, (val) => onChange(key, val), fieldView, currentPath, errors, widgets);
    case 'string':
      return renderStringField(key, schema, value, (val) => onChange(key, val), fieldView, currentPath, errors);
    case 'number':
    case 'integer':
      return renderNumberField(key, schema, value, (val) => onChange(key, val), fieldView, currentPath, errors);
    case 'boolean':
      return renderBooleanField(key, schema, value, (val) => onChange(key, val), fieldView, currentPath, errors);
    case 'null':
      return renderNullField(schema);
    default: {
      // Default fallback (textarea-ish)
      const fieldErrors = errors.filter((e) => e.instanceLocation === '#' + currentPath);
      const errorMessage = fieldErrors.length > 0 ? fieldErrors.map((e) => e.error).join('; ') : undefined;
      return html`
        <wa-textarea
          label=${schema.title || key}
          value=${String(value || '')}
          help-text=${errorMessage || fieldView['ui:help'] || ''}
          ?invalid=${!!errorMessage}
          @wa-input=${(e) => onChange(key, e.target.value)}
        ></wa-textarea>
      `;
    }
  }
}
//# sourceMappingURL=index.js.map
