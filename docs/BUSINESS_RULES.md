# Regras de negócio

RN01: `commonName`, `scientificName` e ao menos uma região são obrigatórios. RN02: textos não podem conter apenas espaços. RN03: nome científico segue `Gênero espécie` e possui 3–160 caracteres. RN04: nomes científicos são únicos, ignorando caixa e acentos. RN05: campos respeitam os limites do contrato (`commonName`/região até 120; descrição até 500). RN06: IDs devem ser inteiros positivos. RN07: identificação exige `scientificName` válido. RN08: todas as respostas usam envelopes de sucesso ou erro. RN09: POST aceita somente `application/json`.

Uploads de imagem não fazem parte desta versão: a identificação é textual, por nome científico.
