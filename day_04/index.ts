import { readFileLines } from "../utils/readFile";

export function dayFourTaskA() {
  // Read input into a matrix of 0s and 1s
  const input = readFileLines("day_04/input.txt");

  console.log("First row: ", input[0]);

  const matrix: number[][] = input.map((line) =>
    [...line].map((char) => {
      return char === "." ? 0 : 1;
    })
  );

  console.log("Matrix first row: ", matrix[0]);

  // Apply an operation to the matrix that calculates the number of 1s surrounding it
  const neighboursMatrix = matrix.map((row, rowIndex) =>
    row.map((cell, colIndex) => {
      if (cell === 0) {
        // Don't consider cells that aren't paper rolls
        return 8;
      }
      const valuesInRow = [row[colIndex - 1] ?? 0, row[colIndex + 1] ?? 0];
      const valuesAbove = [
        matrix[rowIndex - 1]?.[colIndex - 1] ?? 0,
        matrix[rowIndex - 1]?.[colIndex] ?? 0,
        matrix[rowIndex - 1]?.[colIndex + 1] ?? 0,
      ];
      const valuesBelow = [
        matrix[rowIndex + 1]?.[colIndex - 1] ?? 0,
        matrix[rowIndex + 1]?.[colIndex] ?? 0,
        matrix[rowIndex + 1]?.[colIndex + 1] ?? 0,
      ];
      return valuesInRow
        .concat(valuesAbove)
        .concat(valuesBelow)
        .reduce((acc, val) => acc + val, 0);
    })
  );

  console.log("Neighbours matrix first row: ", neighboursMatrix[0]);

  console.log("Neighbours matrix third row: ", neighboursMatrix[2]);

  console.log(
    "Neighbours matrix last row: ",
    neighboursMatrix[neighboursMatrix.length - 1]
  );

  // Find the cells that can be removed
  let result = 0;
  neighboursMatrix.forEach((row) => {
    row.forEach((cell) => {
      if (cell < 4) {
        result++;
      }
    });
  });

  return result;
}

export function dayFourTaskB() {
  // Read input into a matrix of 0s and 1s
  const input = readFileLines("day_04/input.txt");

  console.log("First row: ", input[0]);

  let matrix: number[][] = input.map((line) =>
    [...line].map((char) => {
      return char === "." ? 0 : 1;
    })
  );

  let result = 0;
  let complete = false;
  while (!complete) {
    // Apply an operation to the matrix that calculates the number of 1s surrounding it
    const neighboursMatrix = matrix.map((row, rowIndex) =>
      row.map((cell, colIndex) => {
        if (cell === 0) {
          // Don't consider cells that aren't paper rolls
          return 8;
        }
        const valuesInRow = [row[colIndex - 1] ?? 0, row[colIndex + 1] ?? 0];
        const valuesAbove = [
          matrix[rowIndex - 1]?.[colIndex - 1] ?? 0,
          matrix[rowIndex - 1]?.[colIndex] ?? 0,
          matrix[rowIndex - 1]?.[colIndex + 1] ?? 0,
        ];
        const valuesBelow = [
          matrix[rowIndex + 1]?.[colIndex - 1] ?? 0,
          matrix[rowIndex + 1]?.[colIndex] ?? 0,
          matrix[rowIndex + 1]?.[colIndex + 1] ?? 0,
        ];
        return valuesInRow
          .concat(valuesAbove)
          .concat(valuesBelow)
          .reduce((acc, val) => acc + val, 0);
      })
    );

    // Find the cells that can be removed and update the original matrix
    let resultForIteration = 0;
    neighboursMatrix.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell < 4) {
          matrix[rowIndex][colIndex] = 0;
          resultForIteration++;
        }
      });
    });
    result += resultForIteration;
    if (resultForIteration === 0) {
      complete = true;
    }
  }

  console.log("Matrix first row: ", matrix[0]);

  return result;
}
