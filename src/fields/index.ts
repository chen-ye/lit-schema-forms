import { html, TemplateResult } from 'lit';
import type { JSONSchema, KeyChangeHandler, UISchema } from '../types.js';
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
  schema: JSONSchema,
  value: unknown,
  onChange: KeyChangeHandler,
  view: UISchema = {},
): TemplateResult {
  const fieldView = key === '' ? view : (view[key] as UISchema) || {};

  // Handle allOf (merge and render)
  if (schema.allOf) {
    const merged = mergeSchemas(schema.allOf as JSONSchema[]);
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
    case 'object':
      return renderObjectField(schema, value, (val) => onChange(key, val), fieldView);

    case 'array':
      return renderArrayField(schema, value, (val) => onChange(key, val), fieldView);

    case 'string':
      return renderStringField(schema, value, (val) => onChange(key, val), fieldView);

    case 'number':
    case 'integer':
      return renderNumberField(schema, value, (val) => onChange(key, val), fieldView);

    case 'boolean':
      return renderBooleanField(schema, value, (val) => onChange(key, val), fieldView);

    case 'null':
      return renderNullField(schema);

    default:
      return html`
        <wa-textarea
          label=${schema.title || key}
          value=${String(value || '')}
          help-text=${(fieldView['ui:help'] as string) || ''}
          @wa-input=${(e: Event) => onChange(key, (e.target as HTMLInputElement).value)}
        ></wa-textarea>
      `;
  }
}
