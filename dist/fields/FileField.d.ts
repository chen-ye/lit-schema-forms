import { type TemplateResult } from 'lit';
import '@awesome.me/webawesome/dist/components/input/input.js';
import type { ChangeHandler, JSONSchema, UISchema } from '../types.js';
import type { ValidationError } from '../utils/validator.js';
export declare const fileFieldStyles: import('lit').CSSResult;
export declare function renderFileField(
  key: string,
  schema: JSONSchema,
  value: unknown,
  onChange: ChangeHandler,
  view?: UISchema,
  path?: string,
  errors?: ValidationError[],
): TemplateResult<1>;
