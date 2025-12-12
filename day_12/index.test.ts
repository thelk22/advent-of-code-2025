import { describe, it } from "node:test";
import { taskA, taskB } from ".";
import assert from "node:assert";

const testInputFilePath = "day_12/input.test.txt";
const inputFilePath = "day_12/input.txt";

describe("Run task A", () => {
  it("with test input", () => {
    const result = taskA(testInputFilePath);
    console.log("Result: ", result);
    // assert.equal(result, 5);
  });

  // ✔ with real input (4.757375ms)
  // it("with real input", () => {
  //   const result = taskA(inputFilePath);
  //   console.log("Result: ", result);
  //   // We don't know the answer!
  // });
});

// describe("Run task B", () => {
//   it("with test input", () => {
//     const result = taskB(testInputFilePath);
//     console.log("Result: ", result);
//     assert.equal(result, 2);
//   });

//   // ✔ with real input (499.021375ms)
//   it("with real input", () => {
//     const result = taskB(inputFilePath);
//     console.log("Result: ", result);
//     // We don't know the answer!
//   });
// });
