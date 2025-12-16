import { Validator } from '@cfworker/json-schema';

const schema = { type: 'string', minLength: 5 };
const validator = new Validator(schema);
const result = validator.validate('abc'); // should fail
console.log('Result validity:', result.valid);
console.log('Result errors:', JSON.stringify(result.errors, null, 2));
