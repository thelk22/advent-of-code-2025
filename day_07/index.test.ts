import assert from "node:assert";
import { describe, it } from "node:test";
import { taskA, taskB } from ".";

const inputFilePath = "day_07/input.txt";
const testInputFilePath = "day_07/input.test.txt";

describe("Run task A", () => {
  it("with test input", () => {
    const result = taskA(testInputFilePath);
    console.log("Result: ", result);
    assert.equal(result, 21);
  });

  it("with real input A", () => {
    const result = taskA(inputFilePath);
    console.log("Result: ", result);
    // We don't know the answer!
  });
});

describe("Run task B", () => {
  it("with test input", () => {
    const result = taskB(testInputFilePath);
    console.log("Result: ", result);
    assert.equal(result, 40);
  });

  it("with real input", () => {
    const result = taskB(inputFilePath);
    console.log("Result: ", result);
    // We don't know the answer!
  });
});
