import { CellGroup, Sudoku } from './types';

export default ((s: Sudoku, identifier: string) : CellGroup => {
  const id = identifier.split(':');
  return s[`${id[0]}s`][id[1]];
});
