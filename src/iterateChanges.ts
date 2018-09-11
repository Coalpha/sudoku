import areWeDoneYet from './areWeDoneYet';
import getUnique from './getUnique';
import iterateCoords from './iterateCoords';
import map from './map';
import pipe from './pipe';
import { Sudoku } from './types';
export default ((s: Sudoku) : void => {
  console.log(s.matrix.map((v) => v.join('').replace(/(.{3})/g, "$1|")).reduce((a, v, i) => a += `${i % 3 ? '' : '------------\n'}${v}\n`, ""));
  s.blocks.forEach(block => { console.log(block.identifier); console.log([...block.values]); });
  s.rows.forEach(row => { console.log(row.identifier); console.log([...row.values]); });
  s.cols.forEach(col => { console.log(col.identifier); console.log([...col.values]); });
  s.changes = [
    ...new Set(
      s.changes.map(change => getUnique(s, iterateCoords(s, change))).reduce((arr, v) => arr.concat(v), [])
    )
  ];
  if (s.changes.length < 1) {
    console.warn('iterateChanges/default: changes.length < 1!');
    // either we're done or something did a bad
    if (areWeDoneYet(s)) {
      throw Error('Nothing went wrong!');
    } else {
      throw Error('this sudoku is warm and bad');
    }
  }
  console.log(s.changes);
});
