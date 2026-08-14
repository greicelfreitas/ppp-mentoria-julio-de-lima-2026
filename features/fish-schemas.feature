Funcionalidade: Contrato de cadastro de espécies
  Para impedir dados inválidos na API
  Como equipe de qualidade
  Quero validar o cadastro pelo JSON Schema

  Cenário: CT015 - Aceitar um cadastro válido
    Dado um cadastro com nome popular, nome científico e região válidos
    Quando o cadastro for validado
    Então o resultado da validação deve ser válido

  Esquema do Cenário: Rejeitar um cadastro inválido
    Dado um cadastro com "<condição>"
    Quando o cadastro for validado
    Então o resultado da validação deve ser inválido

    Exemplos:
      | condição                              |
      | CT016 - nome popular ausente          |
      | CT017 - nome popular em branco        |
      | CT018 - nome científico fora do padrão |
      | CT019 - lista de regiões vazia        |
      | CT020 - tipo de regiões incorreto     |
      | CT021 - propriedade adicional         |
