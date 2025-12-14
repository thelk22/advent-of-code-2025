import { describe, it } from "node:test";
import { taskA } from ".";

const inputFilePath = "day_12/input.txt";

describe("Run task A", () => {
  // it("with test input", () => {
  //   const result = taskA(testInputFilePath);
  //   console.log("Result: ", result);
  //   // assert.equal(result, 5);
  // });

  it("with real input", () => {
    const result = taskA(inputFilePath);
    console.log("Result: ", result);
    // We don't know the answer!
  });
});