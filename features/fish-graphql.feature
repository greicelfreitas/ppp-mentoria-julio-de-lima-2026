# language: pt
Funcionalidade: API GraphQL de espécies

  Cenário: CT007 - Abrir a interface e executar consultas
    Quando eu acessar a interface GraphQL e consultar espécies
    Então a interface e os dados devem ser retornados

  Cenário: CT008 - Cadastrar e identificar uma espécie
    Dado um cadastro válido
    Quando eu executar a mutation de cadastro e a query de identificação
    Então a espécie cadastrada deve ser identificada
