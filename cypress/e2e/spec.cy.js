describe("Adicionar o título 'Pixels Art' à página", () => {
  beforeEach(() => cy.visit("http://localhost:5173/pixels-art/"));

  it("Verifica se existe um elemento com [data-cy='title']", () => {
    cy.get("[data-cy='title']").should('exist');
  });

  it("Verifica se o referido elemento é um <h1> possui o texto 'Pixels Art'", () => {
    cy.get("[data-cy='title']").contains('h1',"Pixels Art");
  });

});

describe("Adicionar uma paleta de cores com 6 cores distintas", () => {
  beforeEach(() => cy.visit("http://localhost:5173/pixels-art/"));

  it("Verifica se existe um elemento com [data-cy='colors-palette']", () => {
    cy.get('[data-cy="colors-palette"').should("exist");
  });

  it("Verifica se existem 6 elementos com [data-cy='color'] dentro da paleta de cores", () => {
    cy.get('[data-cy="colors-palette"')
    .get("[data-cy='color']")
    .should('have.length', 6)
    .then((colors) => {
      const colorsArray = Array.from(colors)
      .map((color) => getComputedStyle(color).backgroundColor)
      expect(Array.from(new Set(colorsArray)).length).to.equal(colorsArray.length)
    });
  });
});