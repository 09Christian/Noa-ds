# Desafio QA - Automação com Cypress (TypeScript)

## Pré-requisitos
- Node.js 18+

## Instalação
```bash
npm install
```

## Execução
```bash
npm run cy:run            # todos os testes (headless)
npm run cy:open           # modo interativo

npm run test:saucedemo    # Questão 1
npm run test:books        # Questão 2
npm run test:tables       # Questão 3
```

## Questões
| # | Site | Spec | Saída |
|---|------|------|-------|
| 1 | saucedemo.com | `cypress/e2e/1-saucedemo.cy.ts` | console + `resultados/saucedemo-ofertas.txt` |
| 2 | books.toscrape.com | `cypress/e2e/2-books.cy.ts` | console + `resultados/books-extraidos.txt` (total 40) |
| 3 | the-internet.herokuapp.com/tables | `cypress/e2e/3-tables.cy.ts` | console + `resultados/tables-devedores.txt` |

A saída é impressa no terminal via `cy.task('log')` (o `cy.log` aparece apenas no
runner visual) e também salva em arquivos na pasta `resultados/`.
