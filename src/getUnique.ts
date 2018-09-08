import { Changes, Coordinate, PossibleValues, Sudoku } from './types';
import parseCellGroup from './parseCellGroup';

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

const place = (s: Sudoku) => (option: option) => {
  const [x, y] = option.coord;
  const bx = Math.floor(x / s.blockSize);
  const by = Math.floor(y / s.blockSize);
  const blockNum = parseInt(`${by}${bx}`, 2);
  const cblock = s.blocks[blockNum];
  const ccol = s.cols[x];
  const crow = s.rows[y];
  cblock.values.add(option.num);
  ccol.values.add(option.num);
  crow.values.add(option.num);
  s.matrix[y][x] = option.num;
  return [`block:${blockNum}`, `col:${x}`, `row:${y}`];
};

const getUnique = (s: Sudoku, pvals: PossibleValues) : Changes => {
  const group = parseCellGroup(s, pvals.group);
  const options = pvals.values.reduce((arr, vals, i) => arr.concat(vals.map(val => makeOption(group.coords[i], val))), []);
  const placements = dedupeOptionsByNum(options).concat(dedupeOptionsByCoord(options));
  return placements.map(place(s)).reduce((arr, v) => arr.concat(v), []);
};

export default getUnique;
