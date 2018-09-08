import { Changes, Coordinate, PossibleValuesCollection, Sudoku } from './types';

interface option {
  coord: Coordinate,
  num: number
}

const makeOption = (coord: Coordinate, num: number) => ({ coord, num });
const dedupeOptionsByNum = (options: Array<option>) => {
  const seen: Map<number, number> = new Map(); // num to num
  options.forEach(option => {
    const { num } = option;
    const seenNum = seen.get(num);
    if (seenNum) {
      seen.set(num, seenNum + 1);
    } else {
      seen.set(num, 1);
    }
  });
  return options.filter(option => seen.get(option.num) === 1);
};

const dedupeOptionsByCoord = options => {
  const seen = new Map(); // [num, num] to num
  options.forEach(option => {
    const { coord } = option;
    const seenCoord = seen.get(coord);
    if (seenCoord) {
      seen.set(coord, seenCoord + 1);
    } else {
      seen.set(coord, 1);
    }
  });
  return options.filter(option => seen.get(option.coord) === 1);
};

const place = ({
  size, blocks, rows, cols, matrix
}) => ({ coords: [x, y], num }) => {
  const bx = Math.floor(x / size);
  const by = Math.floor(y / size);
  const blockNum = parseInt(`${by}${bx}`, 2);
  const cblock = blocks[blockNum];
  const ccol = cols[x];
  const crow = rows[y];
  cblock.add(num);
  ccol.add(num);
  crow.add(num);
  matrix[y][x] = num;
  return [`block:${blockNum}`, `col:${x}`, `row:${y}`];
};

const getUnique = sudoku => ({ group: { coords }, vals }) => {
  const options = vals.reduce((arr, vals, i) => arr.concat(vals.map(val => option(coords[i], val))), []);
  const placements = dedupeOptionsByNum(options).concat(dedupeOptionsByCoord(options));
  return placements.map(place(sudoku)).reduce((arr, v) => arr.concat(v), []);
};

export const parseCellGroup = (sudoku, cellGroup) => {
  const items = cellGroup.split(':');
  return sudoku[items[0]][items[1]];
};

export default getUnique;
