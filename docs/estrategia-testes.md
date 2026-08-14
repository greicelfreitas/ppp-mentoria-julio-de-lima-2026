# Estratégia de testes

## Objetivo e escopo

Verificar as regras de cadastro, consulta e identificação de espécies e dar confiança para alterações. O projeto possui escopo propositalmente simples e prioriza qualidade de software, testes automatizados e CI/CD.

São cobertos os serviços, endpoints REST, operações GraphQL, validação do JSON Schema, respostas de sucesso e erro e o fluxo completo da API. Banco de dados, autenticação, frontend e testes de performance não fazem parte do escopo.

## Tipos de testes

* Unitários: regras da camada de serviço.
* Integração/API: rotas REST, status HTTP e respostas.
* Schema: dados de cadastro validados com Ajv e JSON Schema.
* GraphQL: queries, mutation e acesso ao endpoint HTTP.
* E2E: fluxo de cadastro, consulta, identificação e erros, executado exclusivamente com Node Test Runner.
* Exploratórios: validações de entrada e comportamento de erro.

Os cenários são descritos em Gherkin, em português, na pasta `features`. A automação correspondente fica em `tests`.

## Ferramentas e abordagem

São utilizados Node Test Runner, `fetch`, Ajv, JSON Schema, Swagger/OpenAPI, Postman e GitHub Actions. O ciclo consiste em planejar, executar `npm test`, registrar o resultado em `execucao-testes.md`, registrar defeitos em `bugs.md`, corrigir, retestar e encerrar.

As evidências são a saída do terminal e o relatório JUnit em `reports/node-tests.xml`.

## Pipeline

Em pushes e pull requests para a branch `master`, o GitHub Actions instala as dependências com `npm ci`, executa `npm test`, gera o relatório JUnit, audita as dependências de produção e publica o relatório como artefato.
