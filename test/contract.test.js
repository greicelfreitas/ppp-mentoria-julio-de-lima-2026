const test = require('node:test');
const assert = require('node:assert/strict');
const { validateCreateFish } = require('../src/validation/fish.schema');

const valid = { commonName: 'Pirarucu', scientificName: 'Arapaima gigas', regions: ['Bacia Amazônica'], description: 'Peixe de água doce.' };
test('CT015 contrato: aceita payload válido', () => assert.equal(validateCreateFish(valid).valid, true));
test('CT016 contrato: exige nome popular', () => assert.equal(validateCreateFish({ ...valid, commonName: undefined }).valid, false));
test('CT017 contrato: rejeita nome popular em branco', () => assert.equal(validateCreateFish({ ...valid, commonName: '   ' }).valid, false));
test('CT018 contrato: valida formato científico', () => assert.equal(validateCreateFish({ ...valid, scientificName: 'arapaima' }).valid, false));
test('CT019 contrato: rejeita região vazia', () => assert.equal(validateCreateFish({ ...valid, regions: [] }).valid, false));
test('CT020 contrato: rejeita tipo incorreto', () => assert.equal(validateCreateFish({ ...valid, regions: 'Amazônia' }).valid, false));
test('CT021 contrato: rejeita propriedade adicional', () => assert.equal(validateCreateFish({ ...valid, origem: 'manual' }).valid, false));
