# Registro de defeitos

Os defeitos abaixo foram encontrados na validação das operações GraphQL. A suíte de reprodução está em `tests/defeitos-conhecidos.test.js` e é executada separadamente para não interromper a pipeline de regressão.

| ID | Título | Severidade | Esperado | Obtido | Status | Evidência |
| --- | --- | --- | --- | --- | --- | --- |
| BUG001 | GraphQL aceita ID não numérico | Média | Retornar erro `INVALID_ID` | Retorna `fish: null`, sem erro | Aberto | `npm run test:defects` |
| BUG002 | GraphQL não diferencia ID inexistente | Média | Retornar erro `SPECIES_NOT_FOUND` | Retorna `fish: null`, sem erro | Aberto | `npm run test:defects` |
| BUG003 | GraphQL aceita nome científico fora do formato | Média | Retornar erro `INVALID_SCIENTIFIC_NAME` | Retorna `identifyFish: null`, sem erro | Aberto | `npm run test:defects` |

## Como reproduzir

Execute os três testes de defeito:

```bash
npm run test:defects
```

O resultado esperado enquanto os defeitos estiverem abertos é `3` testes reprovados. Para gerar a evidência JUnit em `reports/defeitos-conhecidos.xml`:

```bash
npm run test:defects:report
```

Esses testes não fazem parte de `npm test`. A suíte principal deve continuar aprovada até que os defeitos sejam priorizados e corrigidos; após a correção, os cenários devem ser transferidos para a suíte de regressão.
