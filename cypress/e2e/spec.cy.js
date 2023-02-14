describe("Adicionar o título 'Pixels Art' à página", () => {
  beforeEach(() => cy.visit("http://localhost:5173/pixels-art/"));

  it("Verifica se existe um <h1> com [data-cy='title']", () => {
    cy.get("h1[data-cy='title']").should('exist');
  });

  it("Verifica se o referido h1 possui o texto 'Pixels Art'", () => {
    cy.get("h1[data-cy='title']").contains("Pixels Art");
  });

});