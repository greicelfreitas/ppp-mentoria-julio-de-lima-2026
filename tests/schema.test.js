const test = require('node:test');
const assert = require('node:assert/strict');
const { validateCreateFish } = require('../src/validators/fish.schema');

const valid = {
  commonName: 'Pirarucu',
  scientificName: 'Arapaima gigas',
  regions: ['Bacia Amazônica'],
  description: 'Peixe de água doce.'
};

test('CT005 schema: aceita cadastro válido', () => {
  assert.equal(validateCreateFish(valid).valid, true);
});

test('CT006 schema: rejeita cadastros inválidos', () => {
  const invalidPayloads = [
    { ...valid, commonName: undefined },
    { ...valid, commonName: '   ' },
    { ...valid, scientificName: 'arapaima' },
    { ...valid, regions: [] },
    { ...valid, regions: 'Amazônia' },
    { ...valid, origem: 'manual' }
  ];
  for (const payload of invalidPayloads) {
    assert.equal(validateCreateFish(payload).valid, false);
  }
});
