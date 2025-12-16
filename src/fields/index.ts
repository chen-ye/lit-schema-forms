import { html, type TemplateResult } from 'lit';
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

import type { ValidationError } from '../utils/validator.js';

export function renderField(
  key: string,
  schema: JSONSchema,
  value: unknown,
  onChange: KeyChangeHandler,
  view: UISchema = {},
  path: string = '',
  errors: ValidationError[] = [],
): TemplateResult {
  const fieldView = key === '' ? view : (view[key] as UISchema) || {};
  const currentPath = path ? `${path}/${key}` : key ? `/${key}` : '';

  // Handle allOf (merge and render)
  if (schema.allOf) {
    const merged = mergeSchemas(schema.allOf as JSONSchema[]);
    return renderField(key, merged, value, onChange, view, path, errors);
  }

  // Handle Composition (oneOf / anyOf)
  if (schema.oneOf || schema.anyOf) {
    return renderCompositionField(key, schema, value, (val) => onChange(key, val), fieldView, currentPath, errors);
  }

  // Handle Enum -> Select
  if (schema.enum) {
    return renderSelectField(key, schema, value, (val) => onChange(key, val), fieldView, currentPath, errors);
  }

  // Handle specific types
  // Infer object if properties exist but type is missing
  if (schema.type === 'object' || schema.properties) {
    return renderObjectField(key, schema, value, (val) => onChange(key, val), fieldView, currentPath, errors);
  }

  switch (schema.type) {
    case 'array':
      return renderArrayField(key, schema, value, (val) => onChange(key, val), fieldView, currentPath, errors);

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
          help-text=${errorMessage || (fieldView['ui:help'] as string) || ''}
          ?invalid=${!!errorMessage}
          @wa-input=${(e: Event) => onChange(key, (e.target as HTMLInputElement).value)}
        ></wa-textarea>
      `;
    }
  }
}
