const test = require('node:test');
const assert = require('node:assert/strict');
const service = require('../src/services/fish.service');

test('CT001 unidade: localiza espécie existente', () => assert.equal(service.findFish(1).scientificName, 'Amphiprion ocellaris'));
test('CT002 unidade: não localiza ID inexistente', () => assert.equal(service.findFish(99999), undefined));
test('CT003 unidade: identifica ignorando caixa', () => assert.equal(service.identifyByScientificName('cichla kelberi').commonName, 'Tucunaré'));
test('CT004 unidade: identifica ignorando acento', () => assert.equal(service.identifyByScientificName('Cichla kelberi').scientificName, 'Cichla kelberi'));
test('CT005 unidade: retorna vazio para espécie desconhecida', () => assert.equal(service.identifyByScientificName('Testus inexistens'), undefined));
test('CT006 unidade: detecta duplicidade normalizada', () => assert.deepEqual(service.createFish({ commonName: 'Outro', scientificName: 'CICHLA KELBERI', regions: ['Teste'] }), { conflict: true }));
