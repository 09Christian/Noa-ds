interface Produto {
  nome: string;
  preco: number;
}

describe("SauceDemo - ofertas abaixo de $20.00", () => {
  it("faz login, mapeia a vitrine e lista produtos < $20.00", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get('[data-test="username"]').type("standard_user");
    cy.get('[data-test="password"]').type("secret_sauce");
    cy.get('[data-test="login-button"]').click();

    cy.url().should("include", "/inventory.html");

    const produtos: Produto[] = [];

    cy.get(".inventory_item")
      .should("have.length.greaterThan", 0)
      .each(($item) => {
        const nome = $item.find(".inventory_item_name").text().trim();
        const preco = parseFloat(
          $item.find(".inventory_item_price").text().replace("$", "")
        );
        produtos.push({ nome, preco });
      })
      .then(() => {
        const ofertas = produtos.filter((p) => p.preco < 20.0);

        const linhas = [
          `Total de produtos mapeados: ${produtos.length}`,
          `Produtos abaixo de $20.00: ${ofertas.length}`,
          ...ofertas.map((p) => `- ${p.nome} | $${p.preco.toFixed(2)}`),
        ];
        const saida = linhas.join("\n");

        cy.task("log", `\n===== OFERTAS SAUCEDEMO =====\n${saida}\n`);
        cy.task("saveFile", { name: "saucedemo-ofertas.txt", content: saida });

        expect(produtos.length, "itens mapeados").to.be.greaterThan(0);
        ofertas.forEach((p) => expect(p.preco).to.be.lessThan(20));
      });
  });
});
