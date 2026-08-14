# API de Espécies de Peixes

Este repositório contém uma API REST e GraphQL para cadastrar, identificar e consultar espécies de peixes. A aplicação tem escopo propositalmente simples: não possui banco de dados, autenticação ou frontend.

O foco principal do projeto está em qualidade de software, testes automatizados e CI/CD, incluindo validação por JSON Schema, rastreabilidade e documentação dos testes como parte do Projeto Final de Portfólio da Mentoria Julio de Lima.

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
├── docs/
│   ├── regras-negocio.md
│   ├── plano-de-testes.md
│   ├── cenarios-testes.md
│   ├── rastreabilidade.md
│   ├── execucao-testes.md
│   └── registro-bugs.md
├── features/           # cenários de teste escritos em Gherkin
├── postman/            # coleção e ambiente Postman
├── resources/          # especificação Swagger/OpenAPI
├── schemas/            # contrato JSON Schema
├── src/
│   ├── controllers/    # respostas HTTP da API REST
│   ├── graphql/        # schema, queries e mutations GraphQL
│   ├── models/         # dados em memória
│   ├── routes/         # endpoints REST
│   ├── services/       # regras de negócio compartilhadas
│   └── validators/     # validação dos dados de entrada
└── tests/              # testes automatizados com Node.js
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

Os modelos de consultas e mutation estão em [docs/cenarios-testes.md](docs/cenarios-testes.md).

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
npm run test:schemas
npm run test:graphql
npm run test:e2e
```

Para gerar a evidência JUnit:

```bash
npm run test:report
```

A documentação do projeto está organizada da seguinte forma:

* [Regras de negócio](docs/regras-negocio.md): regras e comportamento esperado da API.
* [Plano de testes](docs/plano-de-testes.md): abordagem de qualidade e tipos de teste.
* [Cenários de testes](docs/cenarios-testes.md): cenários funcionais, exploratórios e exemplos GraphQL.
* [Rastreabilidade](docs/rastreabilidade.md): relação entre regras, cenários e automação.
* [Execução dos testes](docs/execucao-testes.md): resultados dos ciclos executados.
* [Registro de bugs](docs/registro-bugs.md): defeitos, status e evidências.

Os cenários em Gherkin permanecem em [features](features). A pipeline executa `npm test` em pushes e pull requests para a branch `master`.

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

## Projeto em evolução
1. Inserir envio de imagens para reconhecimento da espécie.
2. Implementação de mais cenários de testes.
