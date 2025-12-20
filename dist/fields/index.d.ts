import { type TemplateResult } from 'lit';
import type { JSONSchema, KeyChangeHandler, UISchema, WidgetRegistry } from '../types.js';
import { arrayFieldStyles } from './ArrayField.js';
import { compositionFieldStyles } from './CompositionField.js';
import { fileFieldStyles } from './FileField.js';
import { nullFieldStyles } from './NullField.js';
import { objectFieldStyles } from './ObjectField.js';
import '@awesome.me/webawesome/dist/components/textarea/textarea.js';
export { arrayFieldStyles, compositionFieldStyles, fileFieldStyles, nullFieldStyles, objectFieldStyles };
import type { ValidationError } from '../utils/validator.js';
export declare function renderField(
  key: string,
  schema: JSONSchema,
  value: unknown,
  onChange: KeyChangeHandler,
  view?: UISchema,
  path?: string,
  errors?: ValidationError[],
  widgets?: WidgetRegistry,
): TemplateResult;
