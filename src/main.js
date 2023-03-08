import ColorPalette from './modules/ColorPalette';
import PixelsTable from './modules/PixelsTable';
import './style.css';

const colorPalette = ColorPalette.init('.color', '.color-picker');
const pixelsTable = PixelsTable.init('.pixels-table', colorPalette, 15);

document.querySelector('.reset-button').addEventListener('click', pixelsTable.reset);
