import '@awesome.me/webawesome/dist/components/input/input.js';
import '@awesome.me/webawesome/dist/components/slider/slider.js';
import type { ChangeHandler, JSONSchema, UISchema } from '../types.js';
import type { ValidationError } from '../utils/validator.js';
export declare function renderNumberField(key: string, schema: JSONSchema, value: unknown, onChange: ChangeHandler, view?: UISchema, path?: string, errors?: ValidationError[]): import("lit-html").TemplateResult<1>;
