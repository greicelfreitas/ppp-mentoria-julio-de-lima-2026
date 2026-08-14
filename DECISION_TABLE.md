# Tabela de decisão — cadastro e identificação de espécies

| Regra | Nome popular | Nome científico | Regiões | Já cadastrado | Resultado | HTTP |
| --- | --- | --- | --- | --- | --- | --- |
| Cadastro válido | Informado | Informado | Uma ou mais | Não | Cria a espécie | 201 |
| Campos obrigatórios ausentes | Ausente ou inválido | Qualquer | Qualquer | Qualquer | `INVALID_SPECIES_DATA` | 400 |
| Nome científico duplicado | Informado | Informado | Uma ou mais | Sim | `SCIENTIFIC_NAME_ALREADY_REGISTERED` | 409 |
| Identificação encontrada | — | Informado e cadastrado | — | — | Retorna nome popular, científico e regiões | 200 |
| Identificação não encontrada | — | Informado, não cadastrado | — | — | `FISH_NOT_IDENTIFIED` | 404 |
| Consulta por id inexistente | — | — | — | — | `SPECIES_NOT_FOUND` | 404 |
