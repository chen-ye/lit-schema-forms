import { type TemplateResult } from 'lit';
import type { ChangeHandler, JSONSchema, UISchema, WidgetRegistry } from '../types.js';
import type { ValidationError } from '../utils/validator.js';
export declare const objectFieldStyles: import("lit").CSSResult;
export declare function renderObjectField(key: string, schema: JSONSchema, value: unknown, onChange: ChangeHandler, view?: UISchema, path?: string, errors?: ValidationError[], widgets?: WidgetRegistry): TemplateResult;
