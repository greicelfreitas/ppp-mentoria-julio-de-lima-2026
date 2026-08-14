# language: pt
Funcionalidade: Fluxo completo de espécies de peixes
  Para garantir o funcionamento integrado da API
  Como equipe de qualidade
  Quero validar o fluxo de ponta a ponta

  Cenário: CT022 a CT025 - Cadastrar, consultar, identificar e listar uma espécie
    Dado um cadastro válido e exclusivo para o teste E2E
    Quando eu cadastrar a espécie
    Então o status da resposta deve ser 201
    Quando eu consultar a espécie cadastrada pelo ID
    Então o status da resposta deve ser 200
    Quando eu identificar a espécie pelo nome científico
    Então o status da resposta deve ser 200
    Quando eu listar as espécies
    Então a espécie cadastrada deve estar na lista

  Cenário: CT026 - Impedir cadastro duplicado
    Dado que a espécie do teste E2E já foi cadastrada
    Quando eu cadastrar novamente a mesma espécie
    Então o status da resposta deve ser 409

  Cenário: CT027 - Informar espécie inexistente
    Dado um nome científico não cadastrado
    Quando eu solicitar a identificação da espécie
    Então o status da resposta deve ser 404

  Cenário: CT028 - Rejeitar cadastro incompleto
    Dado um cadastro sem os campos obrigatórios
    Quando eu enviar o cadastro
    Então o status da resposta deve ser 400
