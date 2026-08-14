# Casos de teste

Os casos de teste estão escritos em Gherkin, em português, na pasta [features](../features):

* `fish-service.feature`: regras da camada de serviço, CT001 a CT006.
* `fish-api.feature`: endpoints REST e validações, CT007 a CT014.
* `fish-contract.feature`: contrato JSON Schema, CT015 a CT021.
* `fish-e2e.feature`: fluxo completo da API, CT022 a CT028.
* `fish-graphql.feature`: queries e mutation GraphQL.

Os arquivos `.feature` descrevem o comportamento esperado com `Dado`, `Quando` e `Então`. A implementação automatizada correspondente permanece nos arquivos `*.test.js` da pasta `test` e é executada com `npm test`.
