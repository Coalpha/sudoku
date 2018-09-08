export const Matrix = size => Array(size).fill().map(() => Array(size));
export const CellGroup = (coords) => {};
export const Sudoku = matrix => ({
  matrix,
  size: matrix.length,
});
