# Matriz de rastreabilidade

| Requisito | Regras | Cenários | Testes automatizados | Resultado |
| --- | --- | --- | --- | --- |
| RF01 Cadastrar espécie | RN01–RN05, RN09 | Cadastro válido, inválido e duplicado | CT002, CT004–CT006, CT008–CT010 | Coberto |
| RF02 Consultar espécie | RN06, RN08 | Listagem e consulta por ID | CT001, CT003, CT007, CT009 | Coberto |
| RF03 Identificar espécie | RN03, RN07, RN08 | Identificação válida e inexistente | CT001, CT004, CT008–CT010 | Coberto com defeitos conhecidos |

As regras estão em [regras-negocio.md](regras-negocio.md), os cenários em [cenarios-testes.md](cenarios-testes.md) e a automação na pasta [tests](../tests).
