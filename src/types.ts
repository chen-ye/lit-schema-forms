export interface JSONSchema {
  type?: string;
  title?: string;
  description?: string;
  properties?: Record<string, JSONSchema>;
  items?: JSONSchema | JSONSchema[];
  enum?: (string | number)[];
  required?: string[];
  oneOf?: JSONSchema[];
  anyOf?: JSONSchema[];
  allOf?: JSONSchema[];
  [key: string]: unknown;
}

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

// Helper for Lit events
export interface InputEvent extends Event {
  target: HTMLInputElement & { value: string };
}
