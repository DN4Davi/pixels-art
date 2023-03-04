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

  it('Verifica se cada pixel tem altura igual à sua largura e tamanho igual aos outros', () => {
    cy.get('[data-cy="pixel"]').then((elements) => {
      Array.from(elements).reduce((previous, element) => {
        expect(previous.getBoundingClientRect().width).to.be.equal(
          element.getBoundingClientRect().width
        );
        expect(previous.getBoundingClientRect().height).to.be.equal(
          element.getBoundingClientRect().height
        );
        expect(element.getBoundingClientRect().width).to.be.equal(
          element.getBoundingClientRect().height
        );
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
  beforeEach(() => {
    cy.visit('http://localhost:5173/pixels-art/');
  });

  it('Verifica se, ao clicar em um pixel, ele recebe a cor selecionada na paleta de cores', () => {
    cy.get('[data-cy="color"]').each((colorElement) => {
      colorElement.trigger('click');
      const color = colorElement.css('background-color');

      cy.get('[data-cy="pixel"]').each((pixel) => {
        pixel.trigger('click');
        expect(pixel.css('background-color')).to.be.equal(color);
      });
    });
  });

  it('Verifica se, ao clicar em um pixel com a cor já alterada com outra cor selecionada, ele recebe a nova cor', () => {
    //teste será removido, pois o teste anterior acaba testando a mesma coisa por tabela.
  });
});

describe('Testa a integração da paleta de cores e do tabuleiro de pixels com o local storage', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/pixels-art/').clearAllLocalStorage();
  });

  it.only('Verifica se, ao abrir a página pela primeira vez, o localStorage está vazio', () => {
    expect(localStorage.length).to.be.equal(0);
  });

  it.only('Verifica se ao alterar a paleta de cores, a nova paleta de cores é salva no localStorage', () => {
    cy.get('[data-cy="color"]').each((element, index) => {
      element.trigger('click');
      cy.get('[data-cy="color-picker"]')
        .click()
        .invoke('val', '#ff0000')
        .trigger('change');
      const saved = JSON.parse(localStorage.getItem('color-palette'));
      expect(saved[index]).to.be.equal('rgb(255, 0, 0');
    });
  });

  it.only('Verifica se, ao recarregar a página, a paleta de cores salva é recuperada', () => {
    cy.get('[data-cy="color"]').first().click();
    cy.get('[data-cy="color-picker"]')
      .click()
      .invoke('val', '#ff0000')
      .trigger('change');

    cy.get('[data-cy="color"]').last().click();
    cy.get('[data-cy="color-picker"]')
      .click()
      .invoke('val', '#0000ff')
      .trigger('change');

    cy.reload();
    cy.get('[data-cy="color"]')
      .first()
      .should('have.css', 'background-color', 'rgb(255, 0, 0)');
    cy.get('[data-cy="color"]')
      .last()
      .should('have.css', 'background-color', 'rgb(0, 0, 255)');
  });

  it('Verifica se, ao ao alterar um pixel, a nova pixel table é salva no localStorage', () => {
    cy.get('[data-cy="color"]').last().click();
    cy.get('[data-cy="pixel"]').each((pixel, index) => {
      pixel.trigger('click');
      const saved = JSON.parse(localStorage.getItem('pixel-table'));
      expect(saved[index]).to.be.equal('rgb(0, 0, 0)');
    });
  });

  it('Verifica se, ao recarregar a página, a paleta de cores salva é recuperada', () => {
    cy.get('[data-cy="color"]').last().click();
    cy.get('[data-cy="pixel"]').first().click();
    cy.get('[data-cy="pixel"]').last().click();

    cy.reload();
    cy.get('[data-cy="pixel"]')
      .first()
      .should('have.css', 'background-color', 'rgb(0, 0, 0)');
    cy.get('[data-cy="pixel"]')
      .last()
      .should('have.css', 'background-color', 'rgb(0, 0, 0)');
  });
});
