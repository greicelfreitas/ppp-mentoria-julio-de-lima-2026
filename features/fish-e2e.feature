# language: pt
Funcionalidade: Fluxo completo da API

  Cenário: CT009 - Executar o fluxo positivo
    Dado um cadastro válido e exclusivo
    Quando eu cadastrar, consultar, identificar e listar a espécie
    Então todas as etapas devem ser concluídas com sucesso

  Cenário: CT010 - Executar o fluxo negativo
    Dado que existem dados duplicados, inexistentes ou incompletos
    Quando eu enviar as requisições correspondentes
    Então a API deve rejeitar cada requisição com o status esperado
