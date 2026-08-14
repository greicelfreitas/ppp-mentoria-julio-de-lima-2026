const test = require('node:test');
const assert = require('node:assert/strict');
const app = require('../src/app');

let server;
let baseUrl;
let fishId;
const payload = { commonName: 'Peixe de teste E2E', scientificName: 'Testus temporarius', regions: ['Região de teste'], description: 'Massa exclusiva do fluxo E2E.' };

test.before(async () => new Promise((resolve) => {
  server = app.listen(0, () => { baseUrl = `http://127.0.0.1:${server.address().port}`; resolve(); });
}));
test.after(() => server.close());

test('CT022 E2E: cadastra espécie', async () => {
  const response = await fetch(`${baseUrl}/api/fish`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) });
  const body = await response.json();
  assert.equal(response.status, 201); assert.equal(body.success, true); fishId = body.data.id;
});
test('CT023 E2E: consulta espécie cadastrada', async () => {
  const response = await fetch(`${baseUrl}/api/fish/${fishId}`); assert.equal(response.status, 200); assert.equal((await response.json()).data.id, fishId);
});
test('CT024 E2E: identifica espécie cadastrada', async () => {
  const response = await fetch(`${baseUrl}/api/fish/identify?scientificName=Testus%20temporarius`); assert.equal(response.status, 200); assert.equal((await response.json()).data.commonName, payload.commonName);
});
test('CT025 E2E: lista espécie cadastrada', async () => {
  const response = await fetch(`${baseUrl}/api/fish`); assert.equal(response.status, 200); assert.ok((await response.json()).data.some((fish) => fish.id === fishId));
});
test('CT026 E2E: impede duplicidade', async () => {
  const response = await fetch(`${baseUrl}/api/fish`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(payload) }); assert.equal(response.status, 409);
});
test('CT027 E2E: informa espécie inexistente', async () => {
  const response = await fetch(`${baseUrl}/api/fish/identify?scientificName=Testus%20inexistens`); assert.equal(response.status, 404);
});
test('CT028 E2E: rejeita cadastro incompleto', async () => {
  const response = await fetch(`${baseUrl}/api/fish`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: '{}' }); assert.equal(response.status, 400);
});
