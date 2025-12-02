import { readFileLines } from "../utils/readFile";

export function dayOneTaskA() {
  // Read input file into list of instructions
  const instructions = readFileLines("day_01/input.txt");
  console.log(`Loaded ${instructions.length} instructions`);

  // Store starting position
  let position = 50;
  // Store initial password = 0
  let password = 0;
  let handledInstructions = 0;

  // Loop through instructions and update position
  for (const instruction of instructions) {
    const direction = instruction.slice(0, 1);
    const distance = Number(instruction.slice(1));

    console.log("Processing instruction:", {
      instruction,
      direction,
      distance,
      prevPosition: position,
      password,
    });

    if (direction === "R") {
      position = position + distance;
    } else if (direction === "L") {
      position = position - distance;
    } else {
      throw new Error(`Invalid direction: ${direction}`);
    }

    if (position % 100 === 0) {
      password++;
      console.log("Password incremented:", { instruction, position, password });
    }
    handledInstructions += 1;
  }

  console.log("Final password:", password);

  console.log("Handled instructions:", handledInstructions);

  return password;
}

export function dayOneTaskB() {
  // Read input file into list of instructions
  const instructions = readFileLines("day_01/input.txt");
  console.log(`Loaded ${instructions.length} instructions`);

  // Store starting position
  let position = 50;
  // Store initial password = 0
  let password = 0;

  // Loop through instructions and update position
  for (const instruction of instructions) {
    const prevPosition = position;

    const direction = instruction.slice(0, 1);
    const distance = Number(instruction.slice(1));

    if (direction !== "L" && direction !== "R") {
      throw new Error(`Invalid direction: ${direction}`);
    }

    for (let i = 1; i <= distance; i++) {
      if (direction === "R") {
        const tempPosition = position + i;
        if (tempPosition % 100 === 0) {
          password += 1;
        }
      } else {
        const tempPosition = position - i;
        if (tempPosition % 100 === 0) {
          password += 1;
        }
      }
    }

    if (direction === "R") {
      position = (position + distance) % 100;
    } else {
      position = (position - distance) % 100;
      if (position < 0) {
        position += 100;
      }
    }
  }

  console.log("Final password:", password);

  return password;
}
