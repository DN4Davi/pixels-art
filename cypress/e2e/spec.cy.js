describe('Testa a funcionalidade da paleta de cores', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/pixels-art/');
  });

  it('Verifica se há um elemento com [data-cy="color-palette"]', () => {
    cy.get('[data-cy="color-palette"]').should('exist');
  });

  it('Verifica se, dentro da paleta de cores, existem 4 elementos com [data-cy="color"]', () => {
    cy.get('[data-cy="color-palette"]')
      .find('[data-cy="color"]')
      .should('have.length', 4);
  });

  it('Verifica se cada [data-cy="color"] tem como background uma cor primária do modelo CMYK', () => {
    const CMYKColors = [
      'rgb(0, 255, 255)',
      'rgb(255, 0, 255)',
      'rgb(255, 255, 0)',
      'rgb(0, 0, 0)',
    ];
    cy.get('[data-cy="color"]').each((element) => {
      const elementColor = element.css('background-color');
      expect(CMYKColors).to.contains(elementColor);
      CMYKColors.filter((color) => color !== elementColor);
    });
  });

  it('Verifica se, dentro da paleta de cores, existe um input do tipo color com [data-cy="color-picker"]', () => {
    cy.get('[data-cy="color-palette"]')
      .find('[data-cy="color-picker"]')
      .should('exist');
  });

  it('Verifica se, ao selecionar uma cor, o input passa a ter a mesma cor como valor', () => {
    cy.get('[data-cy="color"]').each((element) => {
      element.trigger('click');
      cy.get('[data-cy="color-picker"]').should(
        'have.value',
        element.css('background-color')
      );
    });
  });

  it('Verifica se, ao alterar a cor do input, a cor selecionada também altera', () => {
    cy.get('[data-cy="color"].active').should(
      'not.have.css',
      'background-color',
      'rgb(255, 8, 254)'
    );
    cy.get('[data-cy="color-picker"]')
      .invoke('val', '#ff08fe')
      .trigger('change');
    cy.get('[data-cy="color"].active').should(
      'have.css',
      'background-color',
      'rgb(255, 8, 254)'
    );
  });
});

describe('Testa a funcionalidade do tabuleiro de pixels', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/pixels-art/');
  });

  it('Verifica se há um elemento com [data-cy="pixels-table"]', () => {
    cy.get('[data-cy="pixels-table"]').should('exist');
  });

  it('verifica se a altura do tabuleiro de pixels é igual à sua largura', () => {
    cy.get('[data-cy="pixels-table"]').then((element) => {
      expect(element.height()).to.be.equal(element.width());
    });
  });

  it('Verifica se, dentro do tabuleiro de pixels, há 625 elementos com [data-cy="pixel"]', () => {
    cy.get('[data-cy="pixels-table"]')
      .find('[data-cy="pixel"]')
      .should('have.length', 625);
  });

  it.only('Verifica se cada pixel tem altura igual à sua largura e tamanho igual aos outros', () => {
    cy.get('[data-cy="pixel"]').then((elements) => {
      Array.from(elements).reduce((previous, element) => {
        expect(previous.getBoundingClientRect().width).to.be.equal(element.getBoundingClientRect().width);
        expect(previous.getBoundingClientRect().height).to.be.equal(element.getBoundingClientRect().height);
        expect(element.getBoundingClientRect().width).to.be.equal(element.getBoundingClientRect().height);
        return previous;
      });
    });
  });

  it('Verifica se cada pixel tem como cor inicial a cor branca', () => {
    cy.get('[data-cy="pixel"]').each((element) => {
      expect(element).to.have.css('background-color', 'rgb(255, 255, 255)');
    });
  });
});

describe('Testa a integração entre a paleta de cores e o tabuleiro de pixels', () => {
  it('Verifica se, ao clicar em um pixel, ele recebe a cor selecionada na paleta de cores', () => {});

  it('Verifica se, ao clicar em um pixel com a cor já alterada com outra cor selecionada, ele recebe a nova cor', () => {});
});

describe('Testa a integração da paleta de cores e do tabuleiro de pixels com o local storage', () => {});
