# Cenários de testes

Os cenários funcionais estão escritos em Gherkin, em português, na pasta [features](../features):

* `fish-service.feature`: regras do serviço, CT001 e CT002.
* `fish-api.feature`: endpoints REST e erros, CT003 e CT004.
* `fish-schema.feature`: validação do JSON Schema, CT005 e CT006.
* `fish-graphql.feature`: queries e mutation GraphQL, CT007 e CT008.
* `fish-e2e.feature`: fluxos positivo e negativo, CT009 e CT010.

Os fluxos positivos cobrem cadastro, consulta, identificação e listagem. Os fluxos negativos e de erro cobrem duplicidade, recurso inexistente, campos ausentes, dados inválidos, JSON inválido e Content-Type não suportado.

## Testes exploratórios

A sessão ET01 explora as validações de cadastro com espaços, lista vazia, campo adicional, JSON inválido e Content-Type incorreto. O comportamento esperado é retornar erros padronizados, sem resposta 500. As principais validações foram agrupadas nos casos CT004 e CT006.

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
