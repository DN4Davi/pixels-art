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

    this.colorElements.forEach((colorElement) => {
      colorElement.style.backgroundColor = colorElement.dataset.defaultColor;
      colorElement.addEventListener('click', this.selectColor);
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
    const color = target.style.backgroundColor;
    this.colorPicker.value = Color(color).hex();
  };

  /**
   * @param {{target: HTMLElement}}
   */
  changeSelectedColor = ({ target }) => {
    this.selected.style.backgroundColor = target.value;
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
    if (colorPalette) {
      this.colorElements.forEach((colorElement, index) => {
        colorElement.style.backgroundColor = JSON.parse(colorPalette)[index];
      });
    }
  }
}
