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

test('GraphQL exibe a interface ao abrir a rota no navegador', async () => {
  const response = await fetch(`${baseUrl}/graphql`, {
    headers: { accept: 'text/html' }
  });
  const html = await response.text();

  assert.equal(response.status, 200);
  assert.match(response.headers.get('content-type'), /text\/html/);
  assert.match(html, /API GraphQL de Espécies de Peixes/);
  assert.match(html, /Executar/);
});

test('GraphQL lista as espécies cadastradas', async () => {
  const { response, body } = await graphql('{ fishes { id commonName scientificName } }');
  assert.equal(response.status, 200);
  assert.equal(body.errors, undefined);
  assert.ok(body.data.fishes.length >= 3);
});

test('GraphQL busca uma espécie por ID', async () => {
  const { body } = await graphql('query ($id: ID!) { fish(id: $id) { scientificName } }', { id: '1' });
  assert.equal(body.data.fish.scientificName, 'Amphiprion ocellaris');
});

test('GraphQL cadastra e identifica uma espécie', async () => {
  const mutation = `
    mutation ($input: FishInput!) {
      createFish(input: $input) { id commonName scientificName regions }
    }
  `;
  const input = {
    commonName: 'Peixe GraphQL',
    scientificName: 'Graphqlus example',
    regions: ['Região de teste'],
    description: 'Criado pelo teste GraphQL.'
  };
  const created = await graphql(mutation, { input });
  assert.equal(created.body.errors, undefined);
  assert.equal(created.body.data.createFish.scientificName, input.scientificName);

  const identified = await graphql(
    'query ($name: String!) { identifyFish(scientificName: $name) { commonName } }',
    { name: input.scientificName }
  );
  assert.equal(identified.body.data.identifyFish.commonName, input.commonName);
});
