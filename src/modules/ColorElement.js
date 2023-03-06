import { css } from '@emotion/css';
import Color from 'color';

export default class ColorElement {
  /**
   * @param {HTMLElement} colorElement
   */
  constructor(colorElement) {
    this.element = colorElement;
    this.className = css({
      backgroundColor: colorElement.dataset.defaultColor,
    });
    this.element.classList.add(this.className);
  }

  get color() {
    return Color(getComputedStyle(this.element).backgroundColor).hex();
  }

  set color(color) {
    this.element.classList.remove(this.className);
    this.className = css({
      backgroundColor: color,
    });
    this.element.classList.add(this.className);
  }
}
