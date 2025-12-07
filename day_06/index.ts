import { readFileLines } from "../utils/readFile";

export function taskA() {
  const input = readFileLines("day_06/input.txt").map((line) =>
    // Split on any number of whitespaces
    line.split(/\s+/)
  );

  const nCols = input[0].length;

  console.log("Dimension of input: ", input.length, nCols);
  console.log("Input first line: ", input[0]);
  console.log("Input last line: ", input[input.length - 1]);

  // Convert into array of problems
  const problems = Array.from({ length: nCols }, (_, colIndex) =>
    input.map((row) => row[colIndex])
  );
  console.log("Dimension of problems: ", problems.length, problems[0].length);
  console.log("Problems first line: ", problems[0]);
  console.log("Problems last line: ", problems[problems.length - 1]);

  // Get the required operation for each problem
  const operations = new Set(
    problems.map((problem) => {
      const operation = problem[problem.length - 1];
      return operation;
    })
  );
  console.log("Operations: ", operations);

  // Solve each problem based on the required operation
  const problemResults = problems.map((problem) => {
    const operation = problem[problem.length - 1];
    if (operation === "+") {
      return problem.slice(0, -1).reduce((acc, val) => acc + Number(val), 0);
    } else if (operation === "*") {
      return problem.slice(0, -1).reduce((acc, val) => acc * Number(val), 1);
    } else {
      throw new Error(`Unknown operation: ${operation}`);
    }
  });

  console.log("Problem results: ", problemResults);

  // Sum the results
  const finalResult = problemResults.reduce((acc, val) => acc + val, 0);

  console.log("Problem results: ", problemResults);

  return finalResult;
}

const isWhitespaceOnly = (s: string) => /^\s*$/.test(s);

export function taskB() {
  const input = readFileLines("day_06/input.txt").map((line) => line.split(""));

  const operations = input[input.length - 1].join("").split(/\s+/);

  const nCols = input[0].length;
  // Get the numbers from reading down each column
  const numbers = Array.from({ length: nCols }, (_, colIndex) =>
    input.map((row) => row[colIndex])
  ).map((col) => col.join("").slice(0, -1).trim());

  // Split numbers into groups (one for each problem)
  const problems = numbers.reduce(
    (acc: string[][], val) => {
      if (isWhitespaceOnly(val)) {
        acc.push([]);
      } else {
        acc[acc.length - 1].push(val);
      }
      return acc;
    },
    [[]]
  );

  console.log("Numbers: ", numbers);
  console.log("Problems: ", problems);
  console.log("Operations: ", operations);

  // Loop through and solve each problem
  let totalResult = 0;
  for (let i = 0; i < problems.length; i++) {
    const problem = problems[i];
    const operation = operations[i];

    if (problem.length === 0) {
      console.log(`Skipping empty problem ${i + 1}`);
      continue;
    }

    console.log(
      `Solving problem ${i + 1}:`,
      problem,
      "with operation",
      operation
    );

    let result: number;
    if (operation === "+") {
      result = problem.reduce((acc, val) => acc + Number(val), 0);
    } else if (operation === "*") {
      result = problem.reduce((acc, val) => acc * Number(val), 1);
    } else {
      throw new Error(`Unknown operation: ${operation}`);
    }

    totalResult += result;

    console.log(`Problem ${i + 1}: Operation ${operation}, Result: ${result}`);
  }

  return totalResult;
}
