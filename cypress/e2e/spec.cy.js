describe('Testa a funcionalidade da paleta de cores', () => {
  it('Verifica se há um elemento com [data-cy="color-palette"]', () => {

  });

  it('Verifica se, dentro da paleta de cores, existem 4 elementos com [data-cy="color"]', () => {

  });

  it('Verifica se cada [data-cy="color"] tem como background uma cor primária do modelo CMYK', () => {

  });

  it('Verifica se, dentro da paleta de cores, existe um input do tipo color com [data-cy="color-picker"]', () => {

  });

  it('Verifica se, ao selecionar uma cor, o input passa a ter a mesma cor como valor', () => {

  });

  it('Verifica se, ao alterar a cor do input, a cor selecionada também altera', () => {

  });
});

describe('Testa a funcionalidade do tabuleiro de pixels', () => {
  it('Verifica se há um elemento com [data-cy="pixels-table"]', () => {

  });

  it('verifica se a altura do tabuleiro de pixels é igual à sua largura', () => {

  });

  it('Verifica se, dentro do tabuleiro de pixels, há 625 elementos com [data-cy="pixel"]', () => {

  });

  it('Verifica se cada pixel tem altura igual à sua largura e tamanho igual aos outros', () => {

  });

  it('Verifica se cada pixel tem como cor inicial a cor branca', () => {

  });
});

describe('Testa a integração entre a paleta de cores e o tabuleiro de pixels', () => {
  it('Verifica se, ao clicar em um pixel, ele recebe a cor selecionada na paleta de cores', () => {

  });

  it('Verifica se, ao clicar em um pixel com a cor já alterada com outra cor selecionada, ele recebe a nova cor', () => {

  });
});

describe('Testa a integração da paleta de cores e do tabuleiro de pixels com o local storage', () => {
  
});