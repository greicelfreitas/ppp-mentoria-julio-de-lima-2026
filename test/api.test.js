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
