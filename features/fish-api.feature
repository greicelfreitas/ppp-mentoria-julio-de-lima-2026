Funcionalidade: API REST de espécies de peixes
  Para consultar e manter informações de espécies
  Como consumidor da API
  Quero receber respostas HTTP padronizadas

  Cenário: Cadastrar uma espécie válida
    Dado um cadastro de espécie com todos os dados obrigatórios
    Quando eu enviar uma requisição POST para "/api/fish"
    Então o status da resposta deve ser 201
    E a resposta deve indicar sucesso

  Cenário: Identificar uma espécie pelo nome científico
    Dado que existe a espécie de nome científico "Cichla kelberi"
    Quando eu enviar uma requisição GET para "/api/fish/identify"
    Então o status da resposta deve ser 200
    E o nome popular retornado deve ser "Tucunaré"

  Cenário: Retornar erro para espécie não identificada
    Dado um nome científico não cadastrado
    Quando eu solicitar a identificação da espécie
    Então o status da resposta deve ser 404
    E o código de erro deve ser "FISH_NOT_IDENTIFIED"

  Cenário: CT007 - Listar espécies
    Quando eu enviar uma requisição GET para "/api/fish"
    Então o status da resposta deve ser 200
    E os dados devem ser uma lista

  Cenário: CT008 - Consultar uma espécie existente por ID
    Dado que existe uma espécie com o identificador 1
    Quando eu consultar a espécie pelo identificador
    Então o status da resposta deve ser 200

  Esquema do Cenário: Validar erros de entrada da API
    Dado que a entrada possui a condição "<condição>"
    Quando eu enviar a requisição correspondente
    Então o status da resposta deve ser <status>
    E o código de erro deve ser "<código>"

    Exemplos:
      | condição                    | status | código                   |
      | CT009 - ID não numérico     | 400    | INVALID_ID               |
      | CT010 - ID inexistente      | 404    | SPECIES_NOT_FOUND        |
      | CT011 - nome não informado  | 400    | SCIENTIFIC_NAME_REQUIRED |
      | CT012 - nome inválido       | 400    | INVALID_SCIENTIFIC_NAME  |
      | CT013 - corpo vazio         | 400    | INVALID_SPECIES_DATA     |
      | CT014 - JSON inválido       | 400    | INVALID_JSON             |
      | CT014 - tipo não suportado  | 415    | UNSUPPORTED_MEDIA_TYPE   |
