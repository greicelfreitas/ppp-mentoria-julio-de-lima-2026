# language: pt
Funcionalidade: Regras de negócio das espécies de peixes
  Para manter o comportamento da API consistente
  Como equipe de qualidade
  Quero validar as regras da camada de serviço

  Cenário: CT001 - Localizar uma espécie existente
    Dado que existe uma espécie com o identificador 1
    Quando a espécie for buscada pelo identificador
    Então o nome científico deve ser "Amphiprion ocellaris"

  Cenário: CT002 - Não localizar um identificador inexistente
    Dado que não existe uma espécie com o identificador 99999
    Quando a espécie for buscada pelo identificador
    Então nenhuma espécie deve ser retornada

  Cenário: CT003 - Identificar ignorando diferença entre maiúsculas e minúsculas
    Dado o nome científico "cichla kelberi"
    Quando a identificação for realizada
    Então o nome popular retornado deve ser "Tucunaré"

  Cenário: CT004 - Identificar uma espécie existente
    Dado o nome científico "Cichla kelberi"
    Quando a identificação for realizada
    Então o nome científico retornado deve ser "Cichla kelberi"

  Cenário: CT005 - Não identificar uma espécie desconhecida
    Dado o nome científico "Testus inexistens"
    Quando a identificação for realizada
    Então nenhuma espécie deve ser retornada

  Cenário: CT006 - Impedir nome científico duplicado
    Dado que já existe a espécie de nome científico "Cichla kelberi"
    Quando outra espécie for cadastrada com o nome científico "CICHLA KELBERI"
    Então o serviço deve informar conflito
