type CellGroupType = 'block'
  | 'row'
  | 'col';
type Matrix = Array<Array<number|void>>;
export type PossiVals = Array<number>; // the possible values for one cell
export type Changes = Array<string>;
// export interface Coordinate {
//   [index: number]: number;
// }
export type Coordinate = Array<number>;
export interface ArrayFunction<T> {
  (ary: Array<any>): Array<T>;
}
export interface PossibleValues { // the possible values for an entire CellGroup
  group: string;
  values: Array<PossiVals>;
}
export const makeCellGroupId = (type: CellGroupType, index: number) : string => `${type}:${index}`;
export const MatrixFactory = (size: number) : Matrix => Array(size).fill(0).map(() => Array(size).fill(null));
export class CellGroup {
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
export class Sudoku {
  blockSize: number;
  maxValue: number;
  totalSize: number;
  blocks: Array<CellGroup>;
  rows: Array<CellGroup>;
  cols: Array<CellGroup>;
  changes: Changes;
  matrix: Array<Array<number>> | void;
  allPossibleValues: Array<number>;

  constructor(blockSize = 3, matrix: Matrix) {
    this.blockSize = matrix.length;
    this.maxValue = blockSize ** 2;
    this.totalSize = blockSize ** 3;
    this.changes = [];
    const aryMaxVal = Array(this.maxValue).fill(0);
    this.allPossibleValues

    this.blocks = aryMaxVal.map((v, blockIdx) => {
      const id = makeCellGroupId('block', blockIdx);
      this.changes.push(id);
      const block = Array(this.maxValue).fill(0).map((_, cellIdx) => [cellIdx % blockSize, 0 | cellIdx / blockSize]);
      return new CellGroup(id, block);
    });
    this.rows = aryMaxVal.map((v, y) => {
      const id = makeCellGroupId('row', y);
      this.changes.push(id);
      const row = aryMaxVal.map((_, x) => [x, y]);
      return new CellGroup(id, row);
    });
    this.cols = aryMaxVal.map((v, x) => {
      const id = makeCellGroupId('col', x);
      this.changes.push(id);
      const col = aryMaxVal.map((_, y) => [x, y]);
      return new CellGroup(id, col);
    });
    this.matrix = matrix || MatrixFactory(this.totalSize);
    this.allPossibleValues = aryMaxVal.map((v, i) => i);
  }
}
