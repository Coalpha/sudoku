import parseCellGroup from './parseCellGroup';
import { CellGroup, Coordinate, PossiVals, PossibleValues, Sudoku } from './types';

export default ((s: Sudoku, group: string) : PossibleValues => {
  const cg = parseCellGroup(s, group);
  const collectionOfPossiVals = cg.coords.map((coord: Coordinate) : PossiVals => {
    const bx = 0 | coord[0] / s.blockSize;
    const by = 0 | coord[1] / s.blockSize;
    const currentBlock = s.blocks[parseInt(`${by}${bx}`, s.blockSize)];
    const currentRow = s.rows[coord[1]];
    const currentCol = s.cols[coord[0]];
    const currentSet = new Set([...currentBlock.values, ...currentRow.values, ...currentCol.values]);
    return s.allPossibleValues.filter((value) => !currentSet.has(value));
    // There's no need to re-dedupe this since it was already deduped before
  });
  return ({
    group,
    values: collectionOfPossiVals,
  });
});
