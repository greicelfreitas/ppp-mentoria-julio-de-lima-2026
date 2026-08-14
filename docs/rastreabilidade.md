# Matriz de rastreabilidade

| Requisito | Regras | Cenários | Testes automatizados | Resultado |
| --- | --- | --- | --- | --- |
| RF01 Cadastrar espécie | RN01–RN05, RN09 | Cadastro válido, inválido e duplicado | CT006, CT013, CT015–CT022, CT026, CT028 e mutation GraphQL | Coberto |
| RF02 Consultar espécie | RN06, RN08 | Listagem e consulta por ID | CT001–CT002, CT007–CT010, CT023, CT025 e queries GraphQL | Coberto |
| RF03 Identificar espécie | RN03, RN07, RN08 | Identificação válida e inexistente | CT003–CT005, CT011–CT012, CT024, CT027 e query GraphQL | Coberto |

As regras estão em [regras-negocio.md](regras-negocio.md), os cenários em [cenarios-testes.md](cenarios-testes.md) e a automação na pasta [tests](../tests).
