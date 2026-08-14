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

async function graphql(query, variables) {
  const response = await fetch(`${baseUrl}/graphql`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ query, variables })
  });
  return { response, body: await response.json() };
}

test('CT007 GraphQL: exibe a interface e executa consultas', async () => {
  const interfaceResponse = await fetch(`${baseUrl}/graphql`, { headers: { accept: 'text/html' } });
  assert.equal(interfaceResponse.status, 200);
  assert.match(await interfaceResponse.text(), /Executar/);

  const { response, body } = await graphql('{ fishes { id } fish(id: 1) { scientificName } }');
  assert.equal(response.status, 200);
  assert.ok(body.data.fishes.length >= 3);
  assert.equal(body.data.fish.scientificName, 'Amphiprion ocellaris');
});

test('CT008 GraphQL: cadastra e identifica uma espécie', async () => {
  const input = {
    commonName: 'Peixe GraphQL', scientificName: 'Graphqlus example',
    regions: ['Região de teste'], description: 'Criado pelo teste GraphQL.'
  };
  const created = await graphql(
    'mutation ($input: FishInput!) { createFish(input: $input) { scientificName } }',
    { input }
  );
  assert.equal(created.body.data.createFish.scientificName, input.scientificName);

  const identified = await graphql(
    'query ($name: String!) { identifyFish(scientificName: $name) { commonName } }',
    { name: input.scientificName }
  );
  assert.equal(identified.body.data.identifyFish.commonName, input.commonName);
});
