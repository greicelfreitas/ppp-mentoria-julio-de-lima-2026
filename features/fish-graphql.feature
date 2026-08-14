# language: pt
Funcionalidade: API GraphQL de espécies de peixes
  Para selecionar os dados necessários das espécies
  Como consumidor da API
  Quero consultar e cadastrar espécies pelo GraphQL

  Cenário: Listar as espécies cadastradas
    Quando eu executar a query "fishes"
    Então a resposta não deve conter erros
    E deve retornar as espécies cadastradas

  Cenário: Buscar uma espécie por ID
    Dado que existe uma espécie com o identificador 1
    Quando eu executar a query "fish"
    Então o nome científico deve ser "Amphiprion ocellaris"

  Cenário: Cadastrar e identificar uma espécie
    Dado um cadastro válido para uma nova espécie
    Quando eu executar a mutation "createFish"
    Então a resposta não deve conter erros
    E a espécie deve ser encontrada pela query "identifyFish"
