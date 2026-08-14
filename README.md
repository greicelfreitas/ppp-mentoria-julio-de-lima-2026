# 🐟 API de Espécies de Peixes

Este repositório contém uma API REST para cadastrar, identificar e consultar espécies de peixes. O projeto inclui testes automatizados de API com Cypress, validação de contrato por JSON Schema e documentação Swagger.

Os testes E2E exercitam o fluxo completo de uma espécie — cadastro, consulta, identificação e cenários de erro — utilizando apenas a API local.

---

# 🛠️ Tecnologias principais

* [Node.js](https://nodejs.org/): ambiente de execução.
* [Express](https://expressjs.com/): framework da API REST.
* [Cypress](https://www.cypress.io/): testes End-to-End de API.
* [Ajv](https://ajv.js.org/): validação do contrato JSON Schema.
* [Swagger UI](https://swagger.io/tools/swagger-ui/): documentação interativa OpenAPI.

---

# ⚙️ Pré-requisitos

* Node.js 18 ou superior.
* npm, instalado junto com o Node.js.

---

# 📁 Estrutura do projeto

```text
.
├── .github/workflows/  # integração contínua
├── contracts/          # contrato JSON Schema
├── cypress/e2e/        # testes E2E de API
├── postman/            # coleção e ambiente Postman
├── resources/          # especificação Swagger/OpenAPI
├── src/
│   ├── controllers/    # respostas HTTP
│   ├── models/         # dados em memória
│   ├── routes/         # endpoints
│   ├── services/       # regras de negócio
│   └── validation/     # validação de contrato
└── test/               # testes automatizados com Node.js
```

---

# 💻 Instalação e execução

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

# 📚 Documentação

Com a API em execução, acesse a interface Swagger em:

```text
http://localhost:3000/api-docs
```

O arquivo da especificação está em [resources/swagger.yaml](resources/swagger.yaml).

---

# 📋 Endpoints

| Método | Rota | Finalidade |
| --- | --- | --- |
| `POST` | `/api/fish` | Cadastra nome popular, nome científico, regiões e descrição. |
| `GET` | `/api/fish` | Lista espécies cadastradas. |
| `GET` | `/api/fish/identify?scientificName={nome}` | Identifica uma espécie pelo nome científico. |
| `GET` | `/api/fish/:id` | Consulta informações básicas de uma espécie. |

Exemplo de cadastro:

```bash
curl -X POST http://localhost:3000/api/fish \
  -H "Content-Type: application/json" \
  -d '{"commonName":"Tilápia-do-Nilo","scientificName":"Oreochromis niloticus","regions":["África","Reservatórios brasileiros"],"description":"Peixe de água doce amplamente cultivado."}'
```

---

# ▶️ Execução dos testes

## Testes de unidade e integração

```bash
npm test
```

## Testes E2E de API — modo headless

O comando inicia a API, aguarda sua disponibilidade e executa os cenários Cypress:

```bash
npm run test:e2e
```

## Testes E2E de API — modo interativo

Em outro terminal, inicie a API com `npm start`. Depois, execute:

```bash
npm run test:e2e:open
```

---

# 📌 Escopo e detalhes dos testes E2E

## Fluxo positivo

1. Cadastra uma espécie e valida `201` e os campos retornados.
2. Consulta a espécie cadastrada por ID e valida `200`.
3. Identifica a espécie pelo nome científico e valida nome popular e regiões.
4. Lista as espécies e confirma a presença do cadastro.

## Fluxo negativo

1. Tenta cadastrar um nome científico duplicado e valida `409`.
2. Busca uma espécie inexistente e valida `404` e `FISH_NOT_IDENTIFIED`.
3. Envia um cadastro incompleto e valida `400` e `INVALID_SPECIES_DATA`.

Os testes usam um nome científico único com `Date.now()` para evitar colisões e usam `failOnStatusCode: false` somente nos cenários em que respostas de erro são esperadas.

---

# 📦 Contratos e ferramentas complementares

* O contrato de cadastro está em [contracts/fish.schema.json](contracts/fish.schema.json).
* A coleção e o ambiente Postman estão em [postman](postman).
* As regras de negócio estão em [DECISION_TABLE.md](DECISION_TABLE.md).
* O workflow de CI está em [.github/workflows/ci.yml](.github/workflows/ci.yml).

Os dados da API são armazenados em memória e são reinicializados ao reiniciar o servidor.

---

✔️ **Obrigada por conferir o projeto!**
