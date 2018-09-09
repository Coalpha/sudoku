import getBlockIndex from './getBlockIndex';
import parseCellGroup from './parseCellGroup';
import { CellGroup, Coordinate, PossiVals, PossibleValues, Sudoku } from './types';

export default ((s: Sudoku, group: string) : PossibleValues => {
  const cg = parseCellGroup(s, group);
  const collectionOfPossiVals = cg.coords.map((coord: Coordinate) : PossiVals => {
    const currentBlock = s.blocks[getBlockIndex(s, coord)];
    const currentRow = s.rows[coord[1]];
    const currentCol = s.cols[coord[0]];
    const currentSet = new Set([...currentBlock.values, ...currentRow.values, ...currentCol.values]);
    const r = s.allPossibleValues.filter((value) => !currentSet.has(value));
    console.log(r);
    return r;
    // There's no need to re-dedupe this since it was already deduped before
  });
  return ({
    group,
    values: collectionOfPossiVals,
  });
});
