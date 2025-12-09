import { readFileLines } from "../utils/readFile";

export function taskA(inputFilePath: string) {
  let nodes = readFileLines(inputFilePath).map((line) =>
    line.split(",").map(Number)
  );

  // console.log("Nodes: ", nodes);

  // PSEUDO CODE:
  // Find the area of the rectangle created by each combination of red tiles
  // If X is the same, the area is the difference in Y
  // If Y is the same, the area is the difference in X
  // If X and Y are different, the area is the product of the differences

  const rectanglesIndex: { [id: string]: number } = {};

  nodes.forEach((nodeA, indexA) => {
    nodes.forEach((nodeB, indexB) => {
      if (indexA === indexB) return;

      const rectId = [indexA, indexB].sort().join("-");

      if (rectanglesIndex[rectId]) return;

      const xDiff = Math.abs(nodeA[0] - nodeB[0]) + 1;
      const yDiff = Math.abs(nodeA[1] - nodeB[1]) + 1;

      let area = 0;
      if (xDiff === 0) {
        area = yDiff;
      } else if (yDiff === 0) {
        area = xDiff;
      } else {
        area = xDiff * yDiff;
      }

      rectanglesIndex[rectId] = area;
    });
  });

  // console.log("Rectangles index: ", rectanglesIndex);

  const rectanglesByOriginalName: { [id: string]: number } = {};
  Object.entries(rectanglesIndex).forEach(([rectId, area]) => {
    const [indexA, indexB] = rectId.split("-").map(Number);
    const originalNameA = nodes[indexA];
    const originalNameB = nodes[indexB];
    const newRectId = `${originalNameA}-${originalNameB}`;
    rectanglesByOriginalName[newRectId] = area;
  });

  // console.log("Rectangles", rectanglesByOriginalName);

  const rectangles = Object.values(rectanglesIndex);
  const result = rectangles.sort((a, b) => a - b)[rectangles.length - 1];
  return result;
}

export function taskB(inputFilePath: string) {
  // PSEUDO CODE:

  // Step 1: For every row, work out the min and max X coordinates of the coloured nodes

  // Step 2: For every pair of red nodes, determine if the rectangle is completely coloured
  // by iterating through the rows of the rectangle and checking the row is contained in the
  // coloured nodes for that row

  // Step 3: Filter and sort all possible rectangles by those that are completely coloured
  // to find the one with the largest area

  let nodes = readFileLines(inputFilePath).map((line) =>
    line.split(",").map(Number)
  );

  const minY = Math.min(...nodes.map((n) => n[1]));
  const maxY = Math.max(...nodes.map((n) => n[1]));

  let rowsIndexed: Record<number, { minX: number; maxX: number }> = {};
  let colsIndexed: Record<number, { minY: number; maxY: number }> = {};

  for (let i = 0; i < nodes.length; i++) {
    const nodeA = nodes[i];
    const nodeB = nodes[(i + 1) % nodes.length];
    // console.log("Processing nodes:", nodeA, nodeB);

    if (nodeA[0] === nodeB[0]) {
      // vertical line
      colsIndexed[nodeA[0]] = {
        minY: Math.min(nodeA[1], nodeB[1]),
        maxY: Math.max(nodeA[1], nodeB[1]),
      };
    } else if (nodeA[1] === nodeB[1]) {
      // horizontal line
      rowsIndexed[nodeA[1]] = {
        minX: Math.min(nodeA[0], nodeB[0]),
        maxX: Math.max(nodeA[0], nodeB[0]),
      };
    }
  }

  // console.log("Rows:", rowsIndexed);
  // console.log("Cols:", colsIndexed);

  const cols = Object.entries(colsIndexed).map(([x, { minY, maxY }]) => ({
    x: Number(x),
    minY,
    maxY,
  }));

  // Now find the min and max for every row
  let rowIndex = minY;
  while (rowIndex <= maxY) {
    if (!rowsIndexed[rowIndex]) {
      // find the columns that cover this row
      const coveringCols = cols.filter(
        (col) => rowIndex >= col.minY && rowIndex <= col.maxY
      );
      // if (coveringCols.length !== 2) {
      //   throw new Error(
      //     `Expected 2 covering columns for row ${rowIndex} but found ${coveringCols.length}`
      //   );
      // }
      // Get the min and max X from these columns
      const minX = Math.min(...coveringCols.map((col) => col.x));
      const maxX = Math.max(...coveringCols.map((col) => col.x));
      rowsIndexed[rowIndex] = { minX, maxX };
    } else {
      // make sure the existing row min/max X includes any covering columns
      const existingRow = rowsIndexed[rowIndex];
      const coveringCols = cols.filter(
        (col) => rowIndex >= col.minY && rowIndex <= col.maxY
      );
      if (coveringCols.length > 0) {
        const minX = Math.min(
          existingRow.minX,
          ...coveringCols.map((col) => col.x)
        );
        const maxX = Math.max(
          existingRow.maxX,
          ...coveringCols.map((col) => col.x)
        );
        rowsIndexed[rowIndex] = { minX, maxX };
      }
    }

    rowIndex++;
  }

  // console.log("Completed Rows:", rowsIndexed);

  // Now find the largest area between two red nodes (similar to part A)
  const rectanglesIndex: {
    [id: string]: { area: number; allColoured: boolean };
  } = {};
  nodes.forEach((nodeA, indexA) => {
    nodes.forEach((nodeB, indexB) => {
      if (indexA === indexB) return;

      const rectId = [indexA, indexB].sort().join("-");

      if (rectanglesIndex[rectId]) return;

      const xDiff = Math.abs(nodeA[0] - nodeB[0]) + 1;
      const yDiff = Math.abs(nodeA[1] - nodeB[1]) + 1;

      let area = 0;
      if (xDiff === 0) {
        area = yDiff;
      } else if (yDiff === 0) {
        area = xDiff;
      } else {
        area = xDiff * yDiff;
      }

      // Check if all rows/columns between these nodes are completely coloured (i.e. are between min/max X/Y in the respective row of rowsIndex))
      // Since rowsIndex tells us where the coloured nodes are
      const [minX, maxX] = [nodeA[0], nodeB[0]].sort((a, b) => a - b);
      const [minY, maxY] = [nodeA[1], nodeB[1]].sort((a, b) => a - b);

      let allColoured = true;

      // Check rows
      for (let y = minY; y <= maxY; y++) {
        const row = rowsIndexed[y];
        if (!row || row.minX > minX || row.maxX < maxX) {
          allColoured = false;
          break;
        }
      }

      rectanglesIndex[rectId] = { area, allColoured };
    });
  });

  // console.log("Rectangles index: ", rectanglesIndex);

  const result = Object.values(rectanglesIndex)
    .filter((r) => r.allColoured)
    .sort((a, b) => b.area - a.area)[0].area;

  // console.log("Result:", result);

  return result;
}
