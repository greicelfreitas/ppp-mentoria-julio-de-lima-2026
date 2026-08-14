# Registro de execução dos testes

| Data | Ambiente | Comando | Resultado | Falhas encontradas | Reteste |
| --- | --- | --- | --- | --- | --- |
| 2026-08-14 | Local, Windows e Node.js 22.20.0 | `npm test` | 10 aprovados, 0 reprovados | Nenhuma | Não necessário |
| 2026-08-14 | Local, Windows e Node.js 22.20.0 | `npm run test:e2e` | 2 aprovados, 0 reprovados | Nenhuma | Não necessário |
| 2026-08-14 | Local, Windows e Node.js 22.20.0 | `npm run test:report` | Relatório com 10 testes e 0 falhas | Nenhuma | Não necessário |
| 2026-08-14 | Local, Windows e Node.js 22.20.0 | `npm run test:defects:report` | 3 executados, 3 reprovados | BUG001, BUG002 e BUG003 | Pendente |

Quando houver falha, devem ser registrados o teste afetado, o comportamento observado, a evidência e a correção realizada. Após a correção, o comando correspondente deve ser executado novamente e a coluna de reteste atualizada.
