Funcionalidade: Validação do JSON Schema

  Cenário: Aceitar cadastro válido
    Dado um cadastro com todos os campos obrigatórios válidos
    Quando o JSON Schema validar o cadastro
    Então o resultado deve ser válido

  Cenário: Rejeitar cadastros inválidos
    Dado um cadastro com campo ausente, formato, tipo ou propriedade inválida
    Quando o JSON Schema validar o cadastro
    Então o resultado deve ser inválido
