import { css } from '@emotion/css';
import Color from 'color';

export default class ColorPalette {
  /**
   * @param {string} colorsClassName
   * @param {string} colorPickerClassName
   */
  constructor(colorsClassName, colorPickerClassName) {
    this.colorElements = document.querySelectorAll(colorsClassName);
    this.colorPicker = document.querySelector(colorPickerClassName);
    this.selected = null;

    this.colorElements.forEach((color) => {
      color.addEventListener('click', this.selectColor);
    });
    this.colorPicker.addEventListener('change', this.changeSelectedColor);
    this.restoreColors();
    this.selectColor({ target: this.colorElements[0] });
  }

  /**
   * @param {string} colorsClassName
   * @param {string} colorPickerClassName
   */
  static init(colorsClassName, colorPickerClassName) {
    return new ColorPalette(colorsClassName, colorPickerClassName);
  }

  /**
   * @param {{target: HTMLElement}}
   */
  selectColor = ({ target }) => {
    if (this.selected) this.selected.classList.remove('selected');
    target.classList.add('selected');
    this.selected = target;
    const color = getComputedStyle(target).backgroundColor;
    this.colorPicker.value = Color(color).hex();
  };

  /**
   * @param {{target: HTMLElement}}
   */
  changeSelectedColor = ({ target }) => {
    this.selected.classList.remove(this.selected.dataset.className);
    this.selected.dataset.className = css({
      backgroundColor: target.value,
    });
    this.selected.classList.add(this.selected.dataset.className);
    this.saveColors();
  };

  saveColors() {
    const colorPalette = [...this.colorElements].map(
      (colorElement) => getComputedStyle(colorElement).backgroundColor
    );
    localStorage.setItem('color-palette', JSON.stringify(colorPalette));
  }

  restoreColors() {
    const colorPalette = localStorage.getItem('color-palette');
    this.colorElements.forEach((color, index) => {
      color.dataset.className = css({
        backgroundColor: colorPalette
          ? JSON.parse(colorPalette)[index]
          : color.dataset.defaultColor,
      });
      color.classList.add(color.dataset.className);
    });
  }
}
