type CellGroupType = 'block'
  | 'row'
  | 'col';
type Matrix = Array<Array<number | null>>;
export type PosiVal = Set<number>;
interface Coordinate {
  [index: number]: number;
}
export interface ArrayFunction<T> {
  (ary: Array<any>): Array<T>;
}
export interface PossibleValues {
  group: string;
  values: Array<PosiVal>;
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
  changes: Array<string>;
  matrix: Array<Array<number>>;

  constructor(blockSize = 3, matrix: Matrix) {
    this.blockSize = matrix.length;
    this.maxValue = blockSize ** 2;
    this.totalSize = blockSize ** 3;
    this.changes = [];
    this.blocks = Array(this.maxValue).fill(0).map((v, blockIdx) => {
      const id = makeCellGroupId('block', blockIdx);
      this.changes.push(id);
      const block = Array(this.maxValue).fill(0).map((_, cellIdx) => [cellIdx % blockSize, 0 | cellIdx / blockSize]);
      return new CellGroup(id, block);
    });
    this.rows = Array(this.maxValue).fill(0).map((v, y) => {
      const id = makeCellGroupId('row', y);
      this.changes.push(id);
      const row = Array(this.maxValue).fill(0).map((_, x) => [x, y]);
      return new CellGroup(id, row);
    });
    this.cols = Array(this.maxValue).fill(0).map((v, x) => {
      const id = makeCellGroupId('col', x);
      this.changes.push(id);
      const col = Array(this.maxValue).fill(0).map((_, y) => [x, y]);
      return new CellGroup(id, col);
    });
    this.matrix = matrix || MatrixFactory(this.totalSize);
  }
}
