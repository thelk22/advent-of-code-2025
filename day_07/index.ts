import { readFileLines } from "../utils/readFile";

const processGrid = (input: string[][]): [string[][], number] => {
  let splitCount = 0;
  let previousLine = input[0];

  const processedGrid = input.map((line, lineIndex) => {
    console.log("Processing line:", lineIndex);

    if (lineIndex === 0) return line;

    if (lineIndex === 1) {
      console.log("Previous line (0):", previousLine);
      const newLine = line.map((char, charIndex) => {
        console.log("Processing char:", char, charIndex);
        console.log("Previous char:", previousLine[charIndex], charIndex);
        if (previousLine[charIndex] === "S") {
          console.log("Replacing S with | at index:", charIndex);
          return "|";
        }
        return char;
      });
      console.log("Processed line 1:", newLine);
      previousLine = newLine;
      return newLine;
    }

    console.log(`Previous line (${lineIndex - 1}):`, previousLine);
    console.log(`Current line (${lineIndex}):`, line);

    let newLine = [...line];
    line.forEach((char, charIndex) => {
      if (char === "^" && previousLine[charIndex] === "|") {
        if (charIndex > 0) {
          newLine[charIndex - 1] = "|";
        }
        if (charIndex < line.length - 1) {
          newLine[charIndex + 1] = "|";
        }
        splitCount++;
      } else if (char === "." && previousLine[charIndex] === "|") {
        newLine[charIndex] = "|";
      }
    });
    previousLine = newLine;
    return newLine;
  });

  return [processedGrid, splitCount];
};

export function taskA(inputFilePath: string) {
  // PSEUDO CODE:
  // Number of times beam is split is the total number of ^ symbols that are hit with a beam
  // On first line, replace S with | (beam) and record indices of the beam
  // For each line after, replace ^ with | if it is in the indices of the beam from the previous line, and update the indices of the beam
  // Add to the count of splits each time a ^ is replaced with a |
  const input = readFileLines(inputFilePath).map((line) => line.split(""));

  console.log("Input:", input);

  const [processedGrid, splitCount] = processGrid(input);

  return splitCount;
}

export function taskB(inputFilePath: string) {
  // Can we do something mathematically clever to simplify the problem?
  // Can't think of anything right now... let's brute force it

  // Assumptions:
  // - None of the splitters are at the edge of the grid
  // - None of the splitters are directly next to each other

  // Keep track of the number of paths leading to each beam on the previous line
  // Then on the next line, each splitter that has a beam leading to sends that number of paths to each of its two outputs
  // Then you need to sum the number of outputs for each beam on that line (in case there are additional paths from other splitters)

  // PSEUDO CODE:
  // Loop through lines and for previous line keep track of:
  // - indices of beams
  // - number of paths leading to each beam
  // Then on the next line, loop through the indices of beams and if you hit a splitter:
  // - create entries for the indices of the two new beams and the path count
  // - if there is already a beam at that index, add to the path count
  // - don't forget to keep track of beams that don't hit splitters and carry their path counts forward!

  const input = readFileLines(inputFilePath).map((line) => line.split(""));
  const [processedGrid, splitCount] = processGrid(input);

  const initialPathIndex = input[0].indexOf("S");
  let beamPaths: { [index: number]: number } = { [initialPathIndex]: 1 };

  let previousLine = processedGrid[0];
  processedGrid.forEach((line, lineIndex) => {
    console.log("Processing line for paths:", lineIndex);

    const splitters = line
      .map((char, charIndex) => ({ char, charIndex }))
      .filter((char) => char.char === "^");

    if (splitters.length === 0) {
      // No splitters on this line, just carry forward the beam paths
      previousLine = line;
      return;
    }

    console.log(
      "Splitters found at indices:",
      splitters.map((s) => s.charIndex)
    );

    splitters.forEach((splitter) => {
      const isActive = previousLine[splitter.charIndex] === "|";
      if (isActive) {
        console.log("Consider active splitter:", splitter);
        const pathsToSplitter = beamPaths[splitter.charIndex] || 1;
        console.log("Paths to splitter:", pathsToSplitter);

        // Split left
        const leftIndex = splitter.charIndex - 1;
        if (!beamPaths[leftIndex]) {
          beamPaths[leftIndex] = 0;
        }
        beamPaths[leftIndex] += pathsToSplitter;

        // Split right
        const rightIndex = splitter.charIndex + 1;
        if (!beamPaths[rightIndex]) {
          beamPaths[rightIndex] = 0;
        }
        beamPaths[rightIndex] += pathsToSplitter;

        // Remove paths from the splitter itself
        beamPaths[splitter.charIndex] = 0;
      }
    });

    console.log("Beam paths:", beamPaths);
    previousLine = line;
  });

  const totalPaths = Object.values(beamPaths).reduce(
    (sum, paths) => sum + paths,
    0
  );
  return totalPaths;
}
