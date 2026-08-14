Funcionalidade: API REST de espécies

  Cenário: Listar e consultar espécies
    Dado que existem espécies cadastradas
    Quando eu listar as espécies e consultar uma delas por ID
    Então as respostas devem indicar sucesso

  Cenário: Validar entradas inválidas
    Dado que a requisição possui ID, nome científico ou cadastro inválido
    Quando eu enviar a requisição para a API
    Então devo receber o status e o código de erro correspondentes
