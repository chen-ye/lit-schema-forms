import { html } from 'lit';
import { mergeSchemas } from '../utils/schema-utils.js';
import { renderArrayField } from './ArrayField.js';
import { renderBooleanField } from './BooleanField.js';
import { renderCompositionField } from './CompositionField.js';
import { renderNullField } from './NullField.js';
import { renderNumberField } from './NumberField.js';
import { renderObjectField } from './ObjectField.js';
import { renderSelectField } from './SelectField.js';
import { renderStringField } from './StringField.js';
import '@awesome.me/webawesome/dist/components/textarea/textarea.js';

export function renderField(
  key: string,
  schema: any,
  value: any,
  onChange: (key: string, val: any) => void,
  view: any = {},
) {
  const fieldView = view[key] || {};

  // Handle allOf (merge and render)
  if (schema.allOf) {
    const merged = mergeSchemas(schema.allOf);
    return renderField(key, merged, value, onChange, view);
  }

  // Handle Composition (oneOf / anyOf)
  if (schema.oneOf || schema.anyOf) {
    return renderCompositionField(schema, value, (val) => onChange(key, val), fieldView);
  }

  // Handle Enum -> Select
  if (schema.enum) {
    return renderSelectField(schema, value, (val) => onChange(key, val), fieldView);
  }

  // Handle specific types
  switch (schema.type) {
    case 'null':
      return renderNullField(schema);

    case 'string':
      if (fieldView['ui:widget'] === 'textarea') {
        return html`
           <wa-textarea
             label=${schema.title || ''}
             value=${value || ''}
             help-text=${fieldView['ui:help'] || ''}
             @wa-input=${(e: any) => onChange(key, e.target.value)}
           ></wa-textarea>
         `;
      }
      return renderStringField(schema, value, (val) => onChange(key, val), fieldView);

    case 'integer':
      return renderNumberField(schema, value, (val) => onChange(key, val), fieldView);
    case 'number':
      return renderNumberField(schema, value, (val) => onChange(key, val), fieldView);

    case 'boolean':
      return renderBooleanField(schema, value, (val) => onChange(key, val), fieldView);

    case 'object':
      return renderObjectField(schema, value, (val) => onChange(key, val), view);

    case 'array':
      return renderArrayField(schema, value, (val) => onChange(key, val), fieldView);

    default:
      return html`<div>Unknown type: ${schema.type}</div>`;
  }
}
