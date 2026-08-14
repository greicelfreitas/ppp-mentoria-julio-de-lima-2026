const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('../src/app');

let server;
let baseUrl;

test.before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, () => {
      baseUrl = `http://127.0.0.1:${server.address().port}`;
      resolve();
    });
  });
});

test.after(() => server.close());

test('cadastra espécie e retorna resposta de sucesso padronizada', async () => {
  const response = await fetch(`${baseUrl}/api/fish`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      commonName: 'Tilápia-do-Nilo',
      scientificName: 'Oreochromis niloticus',
      regions: ['África', 'Reservatórios brasileiros'],
      description: 'Peixe de água doce.'
    })
  });
  const body = await response.json();
  assert.equal(response.status, 201);
  assert.equal(body.success, true);
  assert.equal(body.data.scientificName, 'Oreochromis niloticus');
});

test('identifica por nome científico e retorna nome popular e regiões', async () => {
  const response = await fetch(`${baseUrl}/api/fish/identify?scientificName=Cichla%20kelberi`);
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.deepEqual(body, {
    success: true,
    data: {
      commonName: 'Tucunaré',
      scientificName: 'Cichla kelberi',
      regions: ['Bacia do Araguaia-Tocantins', 'Bacia Amazônica']
    }
  });
});

test('retorna erro padronizado para espécie não identificada', async () => {
  const response = await fetch(`${baseUrl}/api/fish/identify?scientificName=Nome%20inexistente`);
  const body = await response.json();
  assert.equal(response.status, 404);
  assert.deepEqual(body, {
    success: false,
    error: {
      code: 'FISH_NOT_IDENTIFIED',
      message: 'Não foi possível identificar um peixe com o nome científico informado.'
    }
  });
});

test('CT007 integração: lista espécies com envelope de sucesso', async () => {
  const response = await fetch(`${baseUrl}/api/fish`);
  const body = await response.json();
  assert.equal(response.status, 200);
  assert.equal(body.success, true);
  assert.ok(Array.isArray(body.data));
});

test('CT008 integração: consulta espécie existente por ID', async () => {
  const response = await fetch(`${baseUrl}/api/fish/1`);
  assert.equal(response.status, 200);
  assert.equal((await response.json()).data.commonName, 'Peixe-palhaço');
});

test('CT009 integração: rejeita ID não numérico', async () => {
  const response = await fetch(`${baseUrl}/api/fish/abc`);
  assert.equal(response.status, 400);
  assert.equal((await response.json()).error.code, 'INVALID_ID');
});

test('CT010 integração: informa ID inexistente', async () => {
  const response = await fetch(`${baseUrl}/api/fish/9999`);
  assert.equal(response.status, 404);
  assert.equal((await response.json()).error.code, 'SPECIES_NOT_FOUND');
});

test('CT011 integração: exige nome científico na identificação', async () => {
  const response = await fetch(`${baseUrl}/api/fish/identify`);
  assert.equal(response.status, 400);
  assert.equal((await response.json()).error.code, 'SCIENTIFIC_NAME_REQUIRED');
});

test('CT012 integração: rejeita formato científico inválido', async () => {
  const response = await fetch(`${baseUrl}/api/fish/identify?scientificName=invalido`);
  assert.equal(response.status, 400);
  assert.equal((await response.json()).error.code, 'INVALID_SCIENTIFIC_NAME');
});

test('CT013 integração: rejeita body vazio', async () => {
  const response = await fetch(`${baseUrl}/api/fish`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' });
  assert.equal(response.status, 400);
  assert.equal((await response.json()).error.code, 'INVALID_SPECIES_DATA');
});

test('CT014 integração: rejeita JSON inválido e tipo de conteúdo incorreto', async () => {
  const invalidJson = await fetch(`${baseUrl}/api/fish`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{' });
  assert.equal(invalidJson.status, 400);
  assert.equal((await invalidJson.json()).error.code, 'INVALID_JSON');
  const mediaType = await fetch(`${baseUrl}/api/fish`, { method: 'POST', body: 'texto' });
  assert.equal(mediaType.status, 415);
  assert.equal((await mediaType.json()).error.code, 'UNSUPPORTED_MEDIA_TYPE');
});
