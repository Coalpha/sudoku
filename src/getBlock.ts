import { CellGroup, Coordinate, Sudoku } from './types';

export default ((s: Sudoku, coord: Coordinate) : CellGroup => {
  const bx = 0 | coord[0] / s.blockSize;
  const by = 0 | coord[1] / s.blockSize;
  return s.blocks[parseInt(`${by}${bx}`, s.blockSize)];
});
