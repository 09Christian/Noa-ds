interface Livro {
  titulo: string;
  preco: string;
}

describe("Books to Scrape - paginação", () => {
  // O site às vezes dispara erros de JS de terceiros; não devem quebrar o teste
  Cypress.on("uncaught:exception", () => false);

  const extrairPaginaAtual = (acumulado: Livro[]) => {
    cy.get("article.product_pod")
      .should("have.length", 20)
      .each(($livro) => {
        acumulado.push({
          // O texto visível do título pode vir truncado; o atributo "title" é completo
          titulo: $livro.find("h3 a").attr("title") ?? "",
          preco: $livro.find(".price_color").text().trim(),
        });
      });
  };

  it("extrai título e preço das páginas 1 e 2 (total = 40)", () => {
    const livros: Livro[] = [];

    cy.visit("http://books.toscrape.com/");
    extrairPaginaAtual(livros);

    // Clica em "next" e aguarda a página 2 carregar
    cy.get("li.next a").scrollIntoView().click();
    cy.url().should("include", "page-2.html");
    extrairPaginaAtual(livros);

    cy.then(() => {
      const saida = [
        ...livros.map((l, i) => `${i + 1}. ${l.titulo} | ${l.preco}`),
        "",
        `Total de livros extraídos: ${livros.length}`,
      ].join("\n");

      cy.task("log", `\n===== BOOKS TO SCRAPE =====\n${saida}\n`);
      cy.task("saveFile", { name: "books-extraidos.txt", content: saida });

      expect(livros).to.have.length(40);
    });
  });
});
