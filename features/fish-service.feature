Funcionalidade: Regras do serviço de espécies

  Cenário: Consultar espécies por ID e nome científico
    Dado que existem espécies cadastradas
    Quando eu consultar por ID ou nome científico
    Então o serviço deve retornar a espécie correspondente ou nenhum resultado

  Cenário: Impedir nome científico duplicado
    Dado que já existe uma espécie com o mesmo nome científico
    Quando eu tentar cadastrá-la novamente
    Então o serviço deve informar conflito
