import * as validator from '@cfworker/json-schema';

console.log(Object.keys(validator));
console.log(validator.Validator ? 'Validator exists' : 'Validator missing');
if (validator.Validator) {
  try {
    const v = new validator.Validator({});
    console.log('Validator instance created', v);
    // Should have a validate method
    console.log('validate method:', typeof v.validate);
  } catch (e) {
    console.error('Error creating Validator', e);
  }
}
