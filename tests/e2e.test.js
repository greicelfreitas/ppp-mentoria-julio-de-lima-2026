const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('../src/app');

let server;
let baseUrl;
const payload = {
  commonName: 'Peixe de teste E2E', scientificName: 'Testus temporarius',
  regions: ['Região de teste'], description: 'Massa exclusiva do fluxo E2E.'
};

test.before(async () => new Promise((resolve) => {
  server = app.listen(0, () => {
    baseUrl = `http://127.0.0.1:${server.address().port}`;
    resolve();
  });
}));
test.after(() => server.close());

test('CT009 E2E: executa o fluxo positivo completo', async () => {
  const createResponse = await fetch(`${baseUrl}/api/fish`, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload)
  });
  const created = await createResponse.json();
  assert.equal(createResponse.status, 201);

  const getResponse = await fetch(`${baseUrl}/api/fish/${created.data.id}`);
  assert.equal(getResponse.status, 200);

  const identifyResponse = await fetch(`${baseUrl}/api/fish/identify?scientificName=Testus%20temporarius`);
  assert.equal(identifyResponse.status, 200);

  const listResponse = await fetch(`${baseUrl}/api/fish`);
  assert.ok((await listResponse.json()).data.some((fish) => fish.id === created.data.id));
});

test('CT010 E2E: executa o fluxo negativo', async () => {
  const duplicate = await fetch(`${baseUrl}/api/fish`, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload)
  });
  assert.equal(duplicate.status, 409);

  const unknown = await fetch(`${baseUrl}/api/fish/identify?scientificName=Testus%20inexistens`);
  assert.equal(unknown.status, 404);

  const incomplete = await fetch(`${baseUrl}/api/fish`, {
    method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}'
  });
  assert.equal(incomplete.status, 400);
});
