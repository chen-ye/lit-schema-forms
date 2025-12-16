import { type TemplateResult } from 'lit';
import type { JSONSchema, KeyChangeHandler, UISchema, WidgetRegistry } from '../types.js';
import '@awesome.me/webawesome/dist/components/textarea/textarea.js';
import type { ValidationError } from '../utils/validator.js';
export declare function renderField(key: string, schema: JSONSchema, value: unknown, onChange: KeyChangeHandler, view?: UISchema, path?: string, errors?: ValidationError[], widgets?: WidgetRegistry): TemplateResult;
