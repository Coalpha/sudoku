import getBlockIndex from './getBlockIndex';
import parseCellGroup from './parseCellGroup';
import { CellGroup, Coordinate, PossiVals, PossibleValues, Sudoku } from './types';

function logCg(cg: CellGroup, name: string) {
  console.log(`The Resulting ${name} is:`);
  console.log(cg);
  console.log('with values');
  console.log([...cg.values]);
}
export default ((s: Sudoku, group: string) : PossibleValues => {
  console.groupCollapsed('iterateCoords/default');
  console.log(`The group id is "${group}"`);
  const cg = parseCellGroup(s, group);
  logCg(cg, 'cg');
  console.info('Mapping through the coordinates');
  const collectionOfPossiVals = cg.coords.map((coord: Coordinate) : PossiVals => {
    console.groupCollapsed(`iterateCoords/.map: ${coord}`);
    const val = s.matrix[coord[1]][coord[0]];
    const possiVals: PossiVals = [];
    if (val === 0) {
      const currentBlock = s.blocks[getBlockIndex(s, coord)];
      const currentRow = s.rows[coord[1]];
      const currentCol = s.cols[coord[0]];
      const currentSet = new Set([...currentBlock.values, ...currentRow.values, ...currentCol.values]);
      logCg(currentBlock, 'currentBlock');
      logCg(currentRow, 'currentRow');
      logCg(currentCol, 'currentCol');
      s.allPossibleValues.forEach((value) => {
        if (!currentSet.has(value)) {
          possiVals.push(value);
        }
      });
      // There's no need to re-dedupe this since it was already deduped before
    } else {
      console.warn('value already filled in!');
      console.warn(val);
      possiVals.push(val);
    }
    console.log("The possible values are:");
    console.log(possiVals.slice());
    console.groupEnd();
    return possiVals;
  });
  console.groupEnd();
  return ({
    group,
    values: collectionOfPossiVals,
  });
});
