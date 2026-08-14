# language: pt
Funcionalidade: Validação do JSON Schema

  Cenário: CT005 - Aceitar cadastro válido
    Dado um cadastro com todos os campos obrigatórios válidos
    Quando o JSON Schema validar o cadastro
    Então o resultado deve ser válido

  Cenário: CT006 - Rejeitar cadastros inválidos
    Dado um cadastro com campo ausente, formato, tipo ou propriedade inválida
    Quando o JSON Schema validar o cadastro
    Então o resultado deve ser inválido
