import iterateCoords from './iterateCoords';
import map from './map';
import pipe from './pipe';
import { Sudoku } from './types';
export default ((s: Sudoku) : void => {
  const changes = s.changes;
  s.changes = [];
  iterateCoords(s, changes);
});
