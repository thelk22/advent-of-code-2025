export const transpose = (matrix: [][]) => {
  return matrix[0].map((_, colIndex) => {
    return matrix.map((row) => row[colIndex]);
  });
};
