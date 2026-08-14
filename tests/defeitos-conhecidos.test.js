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
  return response.json();
}

test('BUG001: GraphQL deve rejeitar ID não numérico', async () => {
  const body = await graphql(
    'query ($id: ID!) { fish(id: $id) { id } }',
    { id: 'abc' }
  );

  assert.equal(body.errors?.[0]?.extensions?.code, 'INVALID_ID');
});

test('BUG002: GraphQL deve informar quando o ID não existe', async () => {
  const body = await graphql(
    'query ($id: ID!) { fish(id: $id) { id } }',
    { id: '9999' }
  );

  assert.equal(body.errors?.[0]?.extensions?.code, 'SPECIES_NOT_FOUND');
});

test('BUG003: GraphQL deve rejeitar nome científico inválido', async () => {
  const body = await graphql(
    'query ($name: String!) { identifyFish(scientificName: $name) { id } }',
    { name: 'invalido' }
  );

  assert.equal(body.errors?.[0]?.extensions?.code, 'INVALID_SCIENTIFIC_NAME');
});
