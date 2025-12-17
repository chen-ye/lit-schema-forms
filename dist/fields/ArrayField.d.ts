import { type TemplateResult } from 'lit';
import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/icon/icon.js';
import type { ChangeHandler, JSONSchema, UISchema, WidgetRegistry } from '../types.js';
import type { ValidationError } from '../utils/validator.js';
export declare const arrayFieldStyles: import("lit").CSSResult;
export declare function renderArrayField(key: string, schema: JSONSchema, value: unknown, onChange: ChangeHandler, view?: UISchema, path?: string, errors?: ValidationError[], widgets?: WidgetRegistry): TemplateResult<1>;
