interface Coordinate {
  0: number; // x
  1: number; // y
}
export const Matrix = (size: number) : Array<Array<any>> => Array(size).fill(0).map(() => Array(size));
interface CellGroup {
  identifier: string;
  values: Set<number>;
  coords: Array<Coordinate>
}
export const CellGroupFactory = (identifier: string, coords: Array<Coordinate>) : CellGroup => ({
  identifier,
  coords,
  values: new Set(Array(coords.length).fill(0).map((v, i) => i)),
});
export const CellGroup = (coords: Array<Coordinate>) => {};
export const Sudoku = matrix => ({
  matrix,
  size: matrix.length,
});
