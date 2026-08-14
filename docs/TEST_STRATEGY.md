# Estratégia de testes

## Objetivo

Verificar as regras de cadastro, consulta e identificação de espécies e dar confiança para alterações na aplicação. O projeto possui escopo propositalmente simples e prioriza qualidade de software, testes automatizados e CI/CD.

## Escopo

São cobertos os serviços, endpoints REST, operações GraphQL, validação do JSON Schema, respostas de sucesso e erro e o fluxo completo da API. Banco de dados, autenticação, frontend e testes de performance não fazem parte do escopo.

## Tipos de testes

* Unitários: validam as regras da camada de serviço.
* Integração/API: validam rotas REST, status HTTP e respostas.
* Contrato: validam os dados de cadastro com Ajv e JSON Schema.
* GraphQL: validam queries e mutation pelo endpoint HTTP.
* E2E: validam o fluxo de cadastro, consulta, identificação e erros.

Os cenários são descritos em Gherkin, em português, nos arquivos da pasta `features`. Cada cenário utiliza `Dado`, `Quando` e `Então` e mantém os identificadores dos testes automatizados quando existentes. A automação correspondente continua na pasta `test`.

## Ferramentas

São utilizados Node Test Runner, `fetch`, Ajv, JSON Schema, Swagger/OpenAPI, Postman e GitHub Actions.

## Execução na pipeline

Em pushes e pull requests para a branch `master`, o GitHub Actions instala as dependências com `npm ci`, executa `npm test`, gera o relatório JUnit, realiza a auditoria das dependências de produção e publica o relatório como artefato.
