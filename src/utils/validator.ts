import { Validator } from '@cfworker/json-schema';
import type { JSONSchema } from '../types.js';

export interface ValidationError {
  instanceLocation: string;
  keyword: string;
  keywordLocation: string;
  error: string;
}

export class SchemaValidator {
  private validator: Validator;

  constructor(schema: JSONSchema) {
    // biome-ignore lint/suspicious/noExplicitAny: Library type compatibility
    this.validator = new Validator(schema as any);
  }

  validate(data: unknown): ValidationError[] {
    const result = this.validator.validate(data);
    return result.valid ? [] : result.errors;
  }
}

export function createValidator(schema: JSONSchema): SchemaValidator {
  return new SchemaValidator(schema);
}
