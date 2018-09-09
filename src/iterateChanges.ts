import areWeDoneYet from './areWeDoneYet';
import getUnique from './getUnique';
import iterateCoords from './iterateCoords';
import map from './map';
import pipe from './pipe';
import { Sudoku } from './types';
export default ((s: Sudoku) : void => {
  s.changes = [
    ...new Set(
      s.changes.map(change => getUnique(s, iterateCoords(s, change))).reduce((arr, v) => arr.concat(v), [])
    )
  ];
  if (s.changes.length < 1) {
    // either we're done or something did a bad
    if (areWeDoneYet(s)) {
      throw Error('Nothing went wrong!');
    } else {
      throw Error('this sudoku is warm and bad');
    }
  }
  console.log(s.changes);
});
