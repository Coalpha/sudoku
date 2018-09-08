export { default as iterateChanges } from './iterateChanges';
import { Sudoku, MatrixFactory } from './types';
window.x = new Sudoku(MatrixFactory(9));
