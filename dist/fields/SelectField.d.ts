import '@awesome.me/webawesome/dist/components/select/select.js';
import '@awesome.me/webawesome/dist/components/option/option.js';
import '@awesome.me/webawesome/dist/components/radio-group/radio-group.js';
import '@awesome.me/webawesome/dist/components/radio/radio.js';
import type { ChangeHandler, JSONSchema, UISchema } from '../types.js';
import type { ValidationError } from '../utils/validator.js';
export declare function renderSelectField(key: string, schema: JSONSchema, value: unknown, onChange: ChangeHandler, view?: UISchema, path?: string, errors?: ValidationError[]): import("lit-html").TemplateResult<1>;
