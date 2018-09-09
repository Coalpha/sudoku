import { Changes, Sudoku } from './types';

export default ((s: Sudoku) : boolean => s.matrix.every(row => row.every(val => Number.isInteger(val) && val > 0)));
