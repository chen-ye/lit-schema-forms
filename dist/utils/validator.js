import { Validator } from '@cfworker/json-schema';
export class SchemaValidator {
    validator;
    constructor(schema) {
        // biome-ignore lint/suspicious/noExplicitAny: Library type compatibility
        this.validator = new Validator(schema);
    }
    validate(data) {
        const result = this.validator.validate(data);
        return result.valid ? [] : result.errors;
    }
}
export function createValidator(schema) {
    return new SchemaValidator(schema);
}
//# sourceMappingURL=validator.js.map