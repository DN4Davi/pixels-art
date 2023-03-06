import ColorElement from './ColorElement';

export default class ColorPalette {
  /**
   *
   * @param {string} colorsClassName
   * @param {string} pickerClassName
   */
  constructor(colorsClassName, pickerClassName) {
    this.colorElements = Array.from(
      document.querySelectorAll(colorsClassName)
    ).map(
      /**
       * @param {HTMLElement} element
       */
      (element) => {
        element.addEventListener('click', (event) => this.selectColor(event));
        return new ColorElement(element);
      }
    );
    this.colorPicker = document.querySelector(pickerClassName);
    this.selectColor({ target: this.colorElements[0].element });
    this.colorPicker.addEventListener('change', this.changeColor);
  }

  selectColor = ({ target }) => {
    this.colorElements.forEach(({ element }) => {
      element.classList.remove('selected');
    });
    target.classList.add('selected');

    const selected = this.colorElements.find(
      ({ element }) => element === target
    );
    this.colorPicker.value = selected.color;
    this.selected = selected;
  };

  changeColor = ({ target: { value } }) => {
    this.selected.color = value;
  };

  /**
   *
   * @param {string} colorsClassName
   * @param {string} pickerClassName
   */
  static init(colorsClassName, pickerClassName) {
    return new ColorPalette(colorsClassName, pickerClassName);
  }
}
