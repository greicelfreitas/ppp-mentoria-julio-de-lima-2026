describe('API de Espécies de Peixes: testes E2E', () => {
  const scientificName = `Peixe de Teste ${Date.now()}`;
  const fishPayload = {
    commonName: 'Peixe de teste',
    scientificName,
    regions: ['Região de teste', 'Outra região de teste'],
    description: 'Espécie criada exclusivamente durante a execução E2E.'
  };
  let fishId;

  before(() => {
    cy.log(`Ambiente carregado. API base: ${Cypress.config('baseUrl')}`);
  });

  context('Fluxo positivo - operações de sucesso', () => {
    it('cadastra uma espécie e valida os campos retornados', () => {
      cy.request({ method: 'POST', url: '/api/fish', body: fishPayload }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.success).to.eq(true);
        expect(response.body.data).to.include({
          commonName: fishPayload.commonName,
          scientificName: fishPayload.scientificName,
          description: fishPayload.description
        });
        expect(response.body.data.regions).to.deep.eq(fishPayload.regions);
        fishId = response.body.data.id;
        cy.log(`Espécie cadastrada: ${fishId}`);
      });
    });

    it('consulta a espécie cadastrada por identificador', () => {
      cy.request(`/api/fish/${fishId}`).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.success).to.eq(true);
        expect(response.body.data.id).to.eq(fishId);
        expect(response.body.data.scientificName).to.eq(scientificName);
      });
    });

    it('identifica a espécie pelo nome científico', () => {
      cy.request({ method: 'GET', url: '/api/fish/identify', qs: { scientificName } }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.success).to.eq(true);
        expect(response.body.data.commonName).to.eq(fishPayload.commonName);
        expect(response.body.data.scientificName).to.eq(scientificName);
        expect(response.body.data.regions).to.deep.eq(fishPayload.regions);
      });
    });

    it('lista as espécies e confirma a espécie cadastrada', () => {
      cy.request('/api/fish').then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.success).to.eq(true);
        expect(response.body.data).to.be.an('array');
        expect(response.body.data.some((fish) => fish.id === fishId)).to.eq(true);
      });
    });
  });

  context('Fluxo negativo - cenários de erro', () => {
    it('impede o cadastro de nome científico duplicado', () => {
      cy.request({ method: 'POST', url: '/api/fish', body: fishPayload, failOnStatusCode: false }).then((response) => {
        expect(response.status).to.eq(409);
        expect(response.body.success).to.eq(false);
        expect(response.body.error.code).to.eq('SCIENTIFIC_NAME_ALREADY_REGISTERED');
      });
    });

    it('informa quando um peixe não pode ser identificado', () => {
      cy.request({
        method: 'GET',
        url: '/api/fish/identify',
        qs: { scientificName: 'Espécie inexistente' },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(404);
        expect(response.body.success).to.eq(false);
        expect(response.body.error.code).to.eq('FISH_NOT_IDENTIFIED');
      });
    });

    it('valida os campos obrigatórios no cadastro', () => {
      cy.request({
        method: 'POST',
        url: '/api/fish',
        body: { commonName: 'Cadastro inválido' },
        failOnStatusCode: false
      }).then((response) => {
        expect(response.status).to.eq(400);
        expect(response.body.success).to.eq(false);
        expect(response.body.error.code).to.eq('INVALID_SPECIES_DATA');
      });
    });
  });
});
