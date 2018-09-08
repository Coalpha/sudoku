import getBlockIndex from './getBlockIndex';
import parseCellGroup from './parseCellGroup';
import { Changes, Coordinate, PossibleValues, Sudoku } from './types';

interface Option {
  coord: Coordinate,
  num: number
}

const option = (coord: Coordinate, num: number) : Option => ({ coord, num });

const dedupeOptionsByNum = (options: Array<Option>) => {
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

const place = (s: Sudoku) => (option: Option) => {
  const [x, y] = option.coord;;
  const blockNum = getBlockIndex(s, option.coord);
  const currentBlock = s.blocks[blockNum];
  const currentCol = s.cols[x];
  const currentRow = s.rows[y];
  currentBlock.values.add(option.num);
  currentCol.values.add(option.num);
  currentRow.values.add(option.num);
  s.matrix[y][x] = option.num;
  return [`block:${blockNum}`, `col:${x}`, `row:${y}`];
};

const getUnique = (s: Sudoku, pvals: PossibleValues) : Changes => {
  const group = parseCellGroup(s, pvals.group);
  const options: Option[] = pvals.values.reduce(
    (ary: Array<Option>, vals: Array<number>, i: number) => ary.concat(
      vals.map(
        (val: number) : Option => option(group.coords[i], val))
      ),
      []
    );
  const placements = dedupeOptionsByNum(options).concat(dedupeOptionsByCoord(options));
  return placements.map(place(s)).reduce((arr, v) => arr.concat(v), []);
};

export default getUnique;
