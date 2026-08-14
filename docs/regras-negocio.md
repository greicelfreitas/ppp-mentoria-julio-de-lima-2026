# Regras de negócio

* RN01: `commonName`, `scientificName` e ao menos uma região são obrigatórios.
* RN02: textos não podem conter apenas espaços.
* RN03: o nome científico segue o formato `Gênero espécie` e possui entre 3 e 160 caracteres.
* RN04: nomes científicos são únicos, ignorando diferenças entre maiúsculas, minúsculas e acentos.
* RN05: `commonName` e cada região possuem até 120 caracteres; a descrição possui até 500.
* RN06: identificadores devem ser números inteiros positivos.
* RN07: a identificação exige um `scientificName` válido.
* RN08: as respostas REST usam envelopes padronizados de sucesso ou erro.
* RN09: o cadastro REST aceita somente `application/json`.

Uploads de imagem não fazem parte desta versão. A identificação é textual, pelo nome científico. Os dados são mantidos em memória e reinicializados com a aplicação.

## Tabela de decisão

| Situação | Nome popular | Nome científico | Regiões | Já cadastrado | Resultado | HTTP |
| --- | --- | --- | --- | --- | --- | --- |
| Cadastro válido | Informado | Informado | Uma ou mais | Não | Cria a espécie | 201 |
| Campos obrigatórios ausentes | Ausente ou inválido | Qualquer | Qualquer | Qualquer | `INVALID_SPECIES_DATA` | 400 |
| Nome científico duplicado | Informado | Informado | Uma ou mais | Sim | `SCIENTIFIC_NAME_ALREADY_REGISTERED` | 409 |
| Identificação encontrada | — | Informado e cadastrado | — | — | Retorna nome popular, científico e regiões | 200 |
| Identificação não encontrada | — | Informado e não cadastrado | — | — | `FISH_NOT_IDENTIFIED` | 404 |
| Consulta por ID inexistente | — | — | — | — | `SPECIES_NOT_FOUND` | 404 |
