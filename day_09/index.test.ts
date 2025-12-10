import assert from "node:assert";
import { describe, it } from "node:test";
import { taskA, taskB } from ".";

const inputFilePath = "day_09/input.txt";
const testInputFilePath = "day_09/input.test.txt";

describe("Run task A", () => {
  it("with test input", () => {
    const result = taskA(testInputFilePath);
    console.log("Result: ", result);
    assert.equal(result, 40);
  });

  // ✔ Run task A (211.169083ms)
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
    assert.equal(result, 24);
  });

  // ✔ Run task B (1464.848792ms)
  it("with real input", () => {
    const result = taskB(inputFilePath);
    console.log("Result: ", result);
    // We don't know the answer!
  });
});
