import { Coordinate, Sudoku } from './types';

export default ((s: Sudoku, coord: Coordinate) : number => {
  const bx: string = `${0 | coord[0] / s.blockSize}`;
  const by: string = `${0 | coord[1] / s.blockSize}`;
  return parseInt(`${by}${bx}`, s.blockSize);
});
