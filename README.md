# API de Espécies de Peixes

Este repositório contém uma API REST e GraphQL para cadastrar, identificar e consultar espécies de peixes. A aplicação tem escopo propositalmente simples: não possui banco de dados, autenticação ou frontend.

O foco principal do projeto está em qualidade de software, testes automatizados e CI/CD, incluindo validação de contrato, rastreabilidade e documentação dos testes como parte do Projeto Final de Portfólio da Mentoria Julio de Lima.

Os testes E2E exercitam o fluxo completo de uma espécie — cadastro, consulta, identificação e cenários de erro — utilizando apenas a API local e o executor nativo do Node.js.

---

# Tecnologias principais

* [Node.js](https://nodejs.org/): ambiente de execução.
* [Express](https://expressjs.com/): framework da API.
* [GraphQL](https://graphql.org/): linguagem de consulta da API GraphQL.
* [graphql-http](https://github.com/graphql/graphql-http): integração HTTP do GraphQL com Express.
* Node Test Runner: testes automatizados de API.
* [Ajv](https://ajv.js.org/): validação dos dados de cadastro.
* [Swagger UI](https://swagger.io/tools/swagger-ui/): documentação interativa da API REST.

---

# Pré-requisitos

* Node.js 18 ou superior.
* npm, instalado junto com o Node.js.

---

# Estrutura do projeto

```text
.
├── .github/workflows/  # integração contínua
├── docs/               # estratégia e registros de testes
├── postman/            # coleção e ambiente Postman
├── resources/          # especificação Swagger/OpenAPI
├── src/
│   ├── controllers/    # respostas HTTP da API REST
│   ├── graphql/        # schema, queries e mutations GraphQL
│   ├── models/         # dados em memória
│   ├── routes/         # endpoints REST
│   ├── services/       # regras de negócio compartilhadas
│   └── validation/     # validação dos dados de entrada
└── test/               # testes automatizados com Node.js
```

---

# Instalação e execução

1. Clone o repositório:

```bash
git clone https://github.com/greicelfreitas/ppp-mentoria-julio-de-lima-2026.git
cd ppp-mentoria-julio-de-lima-2026
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie a API:

```bash
npm start
```

A API estará disponível em `http://localhost:3000`.

---

# API REST

Com a aplicação em execução, a documentação Swagger está disponível em:

```text
http://localhost:3000/api-docs
```

| Método | Rota | Finalidade |
| --- | --- | --- |
| `POST` | `/api/fish` | Cadastra uma espécie. |
| `GET` | `/api/fish` | Lista as espécies cadastradas. |
| `GET` | `/api/fish/identify?scientificName={nome}` | Identifica uma espécie pelo nome científico. |
| `GET` | `/api/fish/:id` | Consulta uma espécie por ID. |

---

# API GraphQL

O endpoint GraphQL está disponível em:

```text
http://localhost:3000/graphql
```

| Tipo | Operação | Finalidade |
| --- | --- | --- |
| Query | `fishes` | Lista todas as espécies. |
| Query | `fish(id: ID!)` | Consulta uma espécie por ID. |
| Query | `identifyFish(scientificName: String!)` | Identifica uma espécie pelo nome científico. |
| Mutation | `createFish(input: FishInput!)` | Cadastra uma espécie. |

---

# Execução dos testes

Para executar todos os testes:

```bash
npm test
```

Para executar cada nível isoladamente:

```bash
npm run test:unit
npm run test:integration
npm run test:contract
npm run test:graphql
npm run test:e2e
```

Para gerar a evidência JUnit:

```bash
npm run test:report
```

A estratégia e o registro das execuções estão documentados em [docs/TEST_STRATEGY.md](docs/TEST_STRATEGY.md) e [docs/TEST_EXECUTION.md](docs/TEST_EXECUTION.md). A pipeline executa `npm test` em pushes e pull requests para a branch `master`.

---

# Escopo dos testes E2E

## Fluxo positivo

1. Cadastra uma espécie e valida o retorno.
2. Consulta a espécie cadastrada por ID.
3. Identifica a espécie pelo nome científico.
4. Lista as espécies e confirma a presença do cadastro.

## Fluxo negativo

1. Tenta cadastrar um nome científico duplicado.
2. Busca uma espécie inexistente.
3. Envia um cadastro incompleto.

Os testes usam uma massa exclusiva em um servidor temporário, sem depender de serviços externos ou interface gráfica. Os dados da API são armazenados em memória e reinicializados ao reiniciar o servidor.
