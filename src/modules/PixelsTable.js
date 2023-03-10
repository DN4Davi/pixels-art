import { css } from '@emotion/css';
import ColorPalette from './ColorPalette';

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
    target.className = `pixel ${this.colorPalette.selected.dataset.className}`;
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
    const pixelsColors = JSON.parse(localStorage.getItem('pixel-table'));
    if (pixelsColors) {
      const colorsSet = new Set(pixelsColors);
      colorsSet.forEach((color) => {
        const className = css({ backgroundColor: color });
        this.pixels.forEach((pixel, index) => {
          if (pixelsColors[index] === color) pixel.classList.add(className);
        });
      });
    }
  }

  reset = () => {
    this.table.innerHTML = '';
    localStorage.clear();
    this.colorPalette = new ColorPalette('.color', '.color-picker');
    this.configureTable();
  };

  /**
   * @param {string} tableClass
   * @param {import('./ColorPalette').default} colorPalette
   * @param {number} size
   */
  static init(tableClass, colorPalette, size = 15) {
    return new PixelsTable(tableClass, colorPalette, size);
  }
}
