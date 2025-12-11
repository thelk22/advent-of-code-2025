import { describe, it } from "node:test";
import { taskA, taskB } from ".";
import assert from "node:assert";

const inputFilePath = "day_11/input.txt";
const testInputFilePathA = "day_11/input.test.parta.txt";
const testInputFilePathB = "day_11/input.test.partb.txt";

describe("Run task A", () => {
  it("with test input", () => {
    const result = taskA(testInputFilePathA);
    console.log("Result: ", result);
    assert.equal(result, 5);
  });

  // ✔ with real input (4.757375ms)
  it("with real input", () => {
    const result = taskA(inputFilePath);
    console.log("Result: ", result);
    // We don't know the answer!
  });
});

describe("Run task B", () => {
  it("with test input", () => {
    const result = taskB(testInputFilePathB);
    console.log("Result: ", result);
    assert.equal(result, 2);
  });

  // ✔ with real input (499.021375ms)
  it("with real input", () => {
    const result = taskB(inputFilePath);
    console.log("Result: ", result);
    // We don't know the answer!
  });
});
