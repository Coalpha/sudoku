interface Coordinate {
  [index: number]: number;
}
enum CellGroupType {
  block,
  row,
  col,
}
export const makeCellGroupId = (type: CellGroupType, index: number) : string => `${type}:${index}`;
export const Matrix = (size: number) : Array<Array<any>> => Array(size).fill(0).map(() => Array(size));
class CellGroup {
  identifier: string;
  values: Set<number>;
  coords: Array<Coordinate>
  constructor(identifier: string, coords: Array<Coordinate>) {
    return ({
      identifier,
      coords,
      values: new Set(Array(coords.length).fill(0).map((v, i) => i)),
    });
  }
}
export default class Sudoku {
  blocks: Array<CellGroup>;
  rows: Array<CellGroup>;
  cols: Array<CellGroup>;
  changes: Array<string>;
  constructor(size: number) {
    this.rows = Array(size).fill(0).map((v, y) => {
      const id = makeCellGroupId(CellGroupType.row, y);
      const row = Array(size).fill(0).map((_, x) => [x, y]);
      return new CellGroup(id, row);
    });
  }
}
