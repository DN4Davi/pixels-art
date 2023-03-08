import { css } from '@emotion/css';

export default class PixelsTable {
  /**
   * @param {string} tableClass
   * @param {import('./ColorPalette').default} colorPalette
   * @param {number} size
   */
  constructor(tableClass, colorPalette, size = 15) {
    this.table = document.querySelector(tableClass);
    this.colorPalette = colorPalette;
    this.size = size;
    this.pixels = [];
    this.configureTable();
  }

  configureTable() {
    const tableClass = css({
      gridTemplateColumns: `repeat(${this.size}, 1fr)`,
    });
    this.table.classList.add(tableClass);

    this.table.addEventListener('pointerdown', this.paintPixel);

    this.table.addEventListener('pointerup', () => {
      this.table.removeEventListener('pointerover', this.paintPixel);
    });

    for (let iteration = 1; iteration <= this.size ** 2; iteration += 1) {
      const pixel = PixelsTable.createPixel();
      this.table.appendChild(pixel);
      this.pixels.push(pixel);
    }

    this.restorePixels();
  }

  static createPixel() {
    const pixel = document.createElement('div');
    pixel.classList.add('pixel');
    pixel.dataset.cy = 'pixel';
    return pixel;
  }

  /**
   * @param {{target: HTMLElement}}
   */
  paintPixel = ({ target }) => {
    if (target === this.table) return;
    const color = getComputedStyle(this.colorPalette.selected).backgroundColor;
    target.style.backgroundColor = color;
    this.event = this.table.addEventListener('pointerover', this.paintPixel);
    this.savePixels();
  };

  savePixels() {
    const pixelsColors = this.pixels.map(
      (pixel) => getComputedStyle(pixel).backgroundColor
    );
    localStorage.setItem('pixel-table', JSON.stringify(pixelsColors));
  }

  restorePixels() {
    const pixelsColors = localStorage.getItem('pixel-table');
    if (pixelsColors) {
      this.pixels.forEach((pixel, index) => {
        pixel.style.backgroundColor = JSON.parse(pixelsColors)[index];
      });
    }
  }

  /**
   * @param {string} tableClass
   * @param {import('./ColorPalette').default} colorPalette
   * @param {number} size
   */
  static init(tableClass, colorPalette, size = 15) {
    return new PixelsTable(tableClass, colorPalette, size);
  }
}
