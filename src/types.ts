import type { JSONSchema as StandardJSONSchema } from 'json-schema-typed';

// Our application generally assumes the schema is an object (with .type, .properties etc.)
// Standard JSON Schema allows it to be a boolean (true/false), but we exclude that for our internal usages
// to prevent TS errors when accessing properties.
export type JSONSchema = Extract<StandardJSONSchema, object>;

export interface UISchema {
  [key: string]: unknown; // Can contain nested UI config or string properties
  'ui:widget'?: string;
  'ui:title'?: string;
  'ui:description'?: string;
  'ui:help'?: string;
  'ui:placeholder'?: string;
  'ui:disabled'?: boolean;
}

export type FormData = unknown; // Recursively defined JSON value, usually.

export type ChangeHandler = (value: FormData) => void;
export type KeyChangeHandler = (key: string, value: FormData) => void;

export type WidgetRenderer = (
  key: string,
  schema: JSONSchema,
  value: unknown,
  onChange: KeyChangeHandler,
  view: UISchema,
  path: string,
  errors: import('./utils/validator.js').ValidationError[],
  widgets: WidgetRegistry, // Circular reference if we are not careful? No, interface allows it.
) => import('lit').TemplateResult;

export interface WidgetRegistry {
  [key: string]: WidgetRenderer;
}

// Helper for Lit events
export interface InputEvent extends Event {
  target: HTMLInputElement & { value: string };
}
