interface Cliente {
  primeiroNome: string;
  ultimoNome: string;
  site: string;
  due: number;
}

describe("The Internet - Table 1", () => {
  it("lista clientes com 'Due' superior a $50.00", () => {
    cy.visit("https://the-internet.herokuapp.com/tables");

    const devedores: Cliente[] = [];

    // Colunas da Table 1: Last Name | First Name | Email | Due | Web Site | Action
    cy.get("#table1 tbody tr")
      .should("have.length.greaterThan", 0)
      .each(($tr) => {
        const colunas = $tr.find("td");
        const due = parseFloat(colunas.eq(3).text().replace("$", "").trim());

        if (due > 50.0) {
          devedores.push({
            ultimoNome: colunas.eq(0).text().trim(),
            primeiroNome: colunas.eq(1).text().trim(),
            due,
            site: colunas.eq(4).text().trim(),
          });
        }
      })
      .then(() => {
        const saida = devedores
          .map(
            (c) =>
              `Primeiro Nome: ${c.primeiroNome} | Último Nome: ${c.ultimoNome} | Site: ${c.site} | Due: $${c.due.toFixed(2)}`
          )
          .join("\n");

        cy.task("log", `\n===== CLIENTES COM DUE > $50.00 =====\n${saida}\n`);
        cy.task("saveFile", { name: "tables-devedores.txt", content: saida });

        expect(devedores.length).to.be.greaterThan(0);
        devedores.forEach((c) => expect(c.due).to.be.greaterThan(50));
      });
  });
});
