import type { JSONSchema } from '../types.js';
export interface ValidationError {
    instanceLocation: string;
    keyword: string;
    keywordLocation: string;
    error: string;
}
export declare class SchemaValidator {
    private validator;
    constructor(schema: JSONSchema);
    validate(data: unknown): ValidationError[];
}
export declare function createValidator(schema: JSONSchema): SchemaValidator;
