# Cenários de testes

Os cenários funcionais estão escritos em Gherkin, em português, na pasta [features](../features):

* `fish-service.feature`: regras do serviço, CT001 a CT006.
* `fish-api.feature`: endpoints REST e erros, CT007 a CT014.
* `fish-schemas.feature`: validação do JSON Schema, CT015 a CT021.
* `fish-e2e.feature`: fluxo completo, CT022 a CT028.
* `fish-graphql.feature`: queries e mutation GraphQL.

Os fluxos positivos cobrem cadastro, consulta, identificação e listagem. Os fluxos negativos e de erro cobrem duplicidade, recurso inexistente, campos ausentes, dados inválidos, JSON inválido e Content-Type não suportado.

## Testes exploratórios

A sessão ET01 explora as validações de cadastro com espaços, lista vazia, campo adicional, JSON inválido e Content-Type incorreto. O comportamento esperado é retornar erros padronizados, sem resposta 500. Esses cenários foram automatizados nos casos CT013 a CT021 e nenhum defeito funcional foi confirmado.

## Modelos GraphQL

Com a aplicação em execução, abra `http://localhost:3000/graphql` para executar as operações.

### Listar espécies

```graphql
query {
  fishes {
    id
    commonName
    scientificName
    regions
    description
  }
}
```

### Consultar por ID

```graphql
query {
  fish(id: 1) {
    id
    commonName
    scientificName
    regions
    description
  }
}
```

### Identificar pelo nome científico

```graphql
query {
  identifyFish(scientificName: "Cichla kelberi") {
    id
    commonName
    scientificName
    regions
    description
  }
}
```

### Cadastrar uma espécie

```graphql
mutation {
  createFish(
    input: {
      commonName: "Pirarucu"
      scientificName: "Arapaima gigas"
      regions: ["Bacia Amazônica"]
      description: "Peixe de água doce encontrado na região amazônica."
    }
  ) {
    id
    commonName
    scientificName
    regions
    description
  }
}
```

Os arquivos `.feature` documentam o comportamento esperado. Os arquivos `*.test.js` em `tests` implementam a automação executada por `npm test`.
