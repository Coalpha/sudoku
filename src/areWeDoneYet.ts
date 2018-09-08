import { Changes, PossibleValuesCollection, Sudoku } from './types';

export default ((s: Sudoku) : boolean => s.matrix.every(row => row.every(Number.isInteger)));
