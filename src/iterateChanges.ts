import areWeDoneYet from './areWeDoneYet';
import getUnique from './getUnique';
import iterateCoords from './iterateCoords';
import map from './map';
import pipe from './pipe';
import { Sudoku } from './types';
export default ((s: Sudoku) : void => {
  const PossibleValuesCollection = s.changes.map(change => iterateCoords(s, change));
  s.changes = getUnique(s, PossibleValuesCollection);
  if (s.changes.length < 1) {
    // either we're done or something did a bad
    if (areWeDoneYet(s)) {
      throw Error('Nothing went wrong!');
    } else {
      throw Error('this sudoku is warm and bad');
    }
  }
});
