import { createMerger } from '@x0k/json-schema-merge';
import type { JSONSchema } from '../types.js';

export function mergeSchemas(schemas: JSONSchema[]): JSONSchema {
  const { mergeArrayOfSchemaDefinitions } = createMerger();
  // biome-ignore lint/suspicious/noExplicitAny: Library compatibility
  const merged = mergeArrayOfSchemaDefinitions(schemas as any[]);
  return merged as JSONSchema;
}
