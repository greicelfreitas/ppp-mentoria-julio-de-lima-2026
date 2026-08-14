# Estratégia de testes

Objetivo: demonstrar QA sobre a API, mantida propositalmente simples. Escopo: cadastro, consulta, identificação, validação e envelopes HTTP. Fora de escopo: IA real, persistência, autenticação e upload de imagem. Ambiente: Node 20, API local e GitHub Actions.

Abordagem: testes unitários para serviço, integração/API com servidor Express real, contrato com Ajv/JSON Schema e E2E HTTP com Node Test Runner. Entrada: dependências instaladas e contrato atualizado. Saída: testes obrigatórios aprovados, Swagger coerente e auditoria de produção sem vulnerabilidades.
