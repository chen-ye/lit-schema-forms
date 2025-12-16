import type { JSONSchema as StandardJSONSchema } from 'json-schema-typed';
export type JSONSchema = Extract<StandardJSONSchema, object>;
export interface UISchema {
    [key: string]: unknown;
    'ui:widget'?: string;
    'ui:title'?: string;
    'ui:description'?: string;
    'ui:help'?: string;
    'ui:placeholder'?: string;
    'ui:disabled'?: boolean;
}
export type FormData = unknown;
export type ChangeHandler = (value: FormData) => void;
export type KeyChangeHandler = (key: string, value: FormData) => void;
export type WidgetRenderer = (key: string, schema: JSONSchema, value: unknown, onChange: KeyChangeHandler, view: UISchema, path: string, errors: import('./utils/validator.js').ValidationError[], widgets: WidgetRegistry) => import('lit').TemplateResult;
export interface WidgetRegistry {
    [key: string]: WidgetRenderer;
}
export interface InputEvent extends Event {
    target: HTMLInputElement & {
        value: string;
    };
}
