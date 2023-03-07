import ColorPalette from './modules/ColorPalette';
import PixelsTable from './modules/PixelsTable';
import './style.css';

const colorPalette = ColorPalette.init('.color', '.color-picker');
PixelsTable.init('.pixels-table', colorPalette, 15);
