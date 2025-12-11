import { describe, it } from "node:test";
import { taskA, taskB, taskBV2 } from ".";
import assert from "node:assert";

const inputFilePath = "day_10/input.txt";
const testInputFilePath = "day_10/input.test.txt";

describe("Run task A", () => {
  it("with test input", () => {
    const result = taskA(testInputFilePath);
    console.log("Result: ", result);
    assert.equal(result, 7);
  });

  it("with real input", () => {
    const result = taskA(inputFilePath);
    console.log("Result: ", result);
    // We don't know the answer!
  });
});

describe("Run task B", () => {
  it("with test input", () => {
    const result = taskB(testInputFilePath);
    console.log("Result: ", result);
    // assert.equal(result, 33);
  });

  // Completed part B in Python in day_10/index.py
  // it("with real input", () => {
  //   const result = taskBV2(inputFilePath);
  //   console.log("Result: ", result);
  //   // We don't know the answer!
  // });
});
