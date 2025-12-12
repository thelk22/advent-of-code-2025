import { readFileLines } from "../utils/readFile";

type ShapeDetails = {
  shape: number[][];
  density: number;
  permutations: number[][][];
}

function density(shape: number[][]): number {
  return shape.flat().reduce((acc, cell) => acc + cell, 0);
}

function rotateShapeBy90(shape: number[][]): number[][] {
  const numRows = shape.length;
  const numCols = shape[0].length;
  const rotatedShape: number[][] = Array.from({ length: numCols }, () => Array(numRows).fill(0));

  for (let r = 0; r < numRows; r++) {
    for (let c = 0; c < numCols; c++) {
      rotatedShape[c][numRows - 1 - r] = shape[r][c];
    }
  }

  return rotatedShape;
}

function flipShapeHorizontally(shape: number[][]): number[][] {
  return shape.map(row => row.slice().reverse());
}

function flipShapeVertically(shape: number[][]): number[][] {
  return shape.slice().reverse();
}

function calculatePermutations(shape: number[][]): number[][][] {
  if (shape.length !== 3 || shape[0].length !== 3) {
    throw new Error("Only 3x3 shapes are supported");
  }

  const permutations = [
    shape, 
    rotateShapeBy90(shape), 
    rotateShapeBy90(rotateShapeBy90(shape)), 
    rotateShapeBy90(rotateShapeBy90(rotateShapeBy90(shape))),
    flipShapeHorizontally(shape),
    flipShapeVertically(shape),
  ]
  return permutations;
}

// function placeShapeAtPosition(region: number[][], shape: number[][], x: number, y: number): number[][] | null {
//   // Try to place shape or permutation of shape in region at position (x, y)
// }

// function fillRegion(region: number[][], shapes: Record<number, ShapeDetails>, requiredShapes: Record<string, number>) {
//   // Recursive backtracking algorithm to fill region

  
//   for (const shapeIndexStr of Object.keys(requiredShapes)) {
//     const shapeIndex = Number(shapeIndexStr);
//     const shapeDetails = shapes[shapeIndex];
//     const newRegion = placeShapeAtPosition();
//   }
// }



export function taskA(inputFilePath: string) {
  // PSEUDO CODE:

  // Parse the input into
  // 1. Shapes
  // 2. Regions
  // 3. Required shapes

  // For each shape, we might need to get all possible rotations/flips... come back to this

  // What information about the problem set can we use?
  // - The fact that regions are rectangular
  // - The fact that all shapes are 3x3
  // - The fact that all the shapes cover 3 squares in both dimensions (no skinny shapes)

  // We need a depth first search style algorithm that tries to fill the regions with the
  // available shapes

  // Base case:
  // - All required shapes are placed in the region

  // Recursive case:
  // - Pick the first available position in the region
  // - Loop through shapes
  //   - Loop through shape orientations
  //     - If shape fits, place it and recurse
  //     - If recursion returns success, return success
  //     - If recursion returns failure, remove shape and try next orientation/shape
  // - If no shapes fit, return failure

  // Optimisations (because this is a beast of a problem):
  // - Cache (unique - no symmetries) shape orientations
  // - Place denser shapes first (those with fewer empty spaces)
  // - Exit early when possible. 
  // ---- E.g. if remaining shapes cannot possibly fill remaining space
  // ---- Or if total number of required 1s exceeds available space in region

  const lines = readFileLines(inputFilePath);
  console.log("Input lines: ", lines);

  const lineContainingFirstRegion = lines.findIndex((line) => line.includes("x"));
  console.log("Line containing first region: ", lineContainingFirstRegion);
  
  const shapes = lines.slice(0, lineContainingFirstRegion).filter(line => line.trim() !== "")
    .filter(item => !item.includes(":")).reduce((acc, shapeLine, index) => {
        if (index % 3 === 0) {
          acc.push([shapeLine.trim().split("").map(cell => cell === "#" ? 1 : 0)]);
        } else {
          acc[acc.length - 1].push(shapeLine.trim().split("").map(cell => cell === "#" ? 1 : 0));
          
        }
        return acc;
      }, [] as number[][][])
    .map(shape => ({shape, density: density(shape), permutations: calculatePermutations(shape)}))
    .sort((a, b) => b.density - a.density)
    .reduce((acc, shapeDetails, index) => ({...acc, [index]: shapeDetails}), {} as Record<number, ShapeDetails>);

  const regions = lines.slice(lineContainingFirstRegion).filter(line => line.trim() !== "").map(line => {
    const [sizeStr, requiredShapesStr] = line.split(":").map(part => part.trim());
    const [colsStr, rowsStr] = sizeStr.split("x").map(part => part.trim());
    const rows = parseInt(rowsStr, 10);
    const cols = parseInt(colsStr, 10);
    const requiredShapes = requiredShapesStr.split(" ").map(s => s.trim()).reduce((acc, shape, index) => {
      acc[index] = (acc[index] || 0) + Number(shape);
      return acc;
    }, {} as Record<string, number>);
    return {
      rows,
      cols,
      requiredShapes,
    };
  });

  console.log("Shapes: ", shapes);
  console.log("Regions: ", regions);

  for (const region of regions) {
    console.log("Solving region: ", region);

    let initialGrid = Array.from({ length: region.rows }, () => Array(region.cols).fill(0));
    console.log("Initial grid: ", initialGrid);

    const totalRequiredFills = Object.entries(region.requiredShapes).reduce((acc, [shapeIndex, count]) => {
      const shapeDetails = shapes[Number(shapeIndex)];
      return acc + (shapeDetails.density * count);
    }, 0);
    const spaceInGrid = region.rows * region.cols;

    if (totalRequiredFills > spaceInGrid) {
      console.log("Impossible to fill region, required fills exceed space in grid");
      continue;
    }

    // Implement the recursive backtracking algorithm here to fill the region
    // with the available shapes.

    // Find the location on the grid to place the next shape
    // Get the highest density shape
    // Try to place it in all orientations
    // Use the placement that minimises the density of the shapes placed so far
    // If it fits, place it, and recurse
    // If recursion returns success, return success
    // If recursion returns failure, remove shape and try next orientation/shape

    // If no shapes fit, return failure

    console.log("Finished solving region");
  }
}

export function taskB(inputFilePath: string) {
  // PSEUDO CODE:

  const lines = readFileLines(inputFilePath);
  console.log("Input lines: ", lines);
}