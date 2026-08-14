const Ajv = require('ajv');
const fishSchema = require('../../schemas/fish.schema.json');

const ajv = new Ajv({ allErrors: true });
const validateFish = ajv.compile(fishSchema);

function validateCreateFish(payload) {
  const valid = validateFish(payload);
  return { valid, errors: validateFish.errors || [] };
}

module.exports = { validateCreateFish };
