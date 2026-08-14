const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('../src/app');

let server;
let baseUrl;

test.before(async () => new Promise((resolve) => {
  server = app.listen(0, () => {
    baseUrl = `http://127.0.0.1:${server.address().port}`;
    resolve();
  });
}));
test.after(() => server.close());

test('CT003 integração: lista e consulta espécies', async () => {
  const listResponse = await fetch(`${baseUrl}/api/fish`);
  const listBody = await listResponse.json();
  assert.equal(listResponse.status, 200);
  assert.equal(listBody.success, true);
  assert.ok(Array.isArray(listBody.data));

  const fishResponse = await fetch(`${baseUrl}/api/fish/1`);
  assert.equal(fishResponse.status, 200);
  assert.equal((await fishResponse.json()).data.commonName, 'Peixe-palhaço');
});

test('CT004 integração: retorna erros padronizados para entradas inválidas', async () => {
  const cases = [
    ['/api/fish/abc', 400, 'INVALID_ID'],
    ['/api/fish/9999', 404, 'SPECIES_NOT_FOUND'],
    ['/api/fish/identify', 400, 'SCIENTIFIC_NAME_REQUIRED'],
    ['/api/fish/identify?scientificName=invalido', 400, 'INVALID_SCIENTIFIC_NAME']
  ];

  for (const [path, status, code] of cases) {
    const response = await fetch(`${baseUrl}${path}`);
    assert.equal(response.status, status);
    assert.equal((await response.json()).error.code, code);
  }

  const emptyBody = await fetch(`${baseUrl}/api/fish`, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}'
  });
  assert.equal(emptyBody.status, 400);
  assert.equal((await emptyBody.json()).error.code, 'INVALID_SPECIES_DATA');
});
