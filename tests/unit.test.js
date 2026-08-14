const test = require('node:test');
const assert = require('node:assert/strict');
const service = require('../src/services/fish.service');

test('CT001 unidade: consulta espécies por ID e nome científico', () => {
  assert.equal(service.findFish(1).scientificName, 'Amphiprion ocellaris');
  assert.equal(service.findFish(99999), undefined);
  assert.equal(service.identifyByScientificName('cichla kelberi').commonName, 'Tucunaré');
  assert.equal(service.identifyByScientificName('Testus inexistens'), undefined);
});

test('CT002 unidade: impede nome científico duplicado', () => {
  const result = service.createFish({
    commonName: 'Outro',
    scientificName: 'CICHLA KELBERI',
    regions: ['Teste']
  });
  assert.deepEqual(result, { conflict: true });
});
