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
    this.colorPicker.addEventListener('change', this.changeColor);
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
  changeColor = ({ target }) => {
    this.selected.style.backgroundColor = target.value;
  };
}
