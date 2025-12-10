import { describe, it } from "node:test";
import { taskB } from ".";

const inputFilePath = "day_10/input.txt";
const testInputFilePath = "day_10/input.test.txt";

// describe("Run task A", () => {
//   it("with test input", () => {
//     const result = taskA(testInputFilePath);
//     console.log("Result: ", result);
//     assert.equal(result, 7);
//   });

//   it("with real input", () => {
//     const result = taskA(inputFilePath);
//     console.log("Result: ", result);
//     // We don't know the answer!
//   });
// });

describe("Run task B", () => {
  it("with test input", () => {
    const result = taskB(testInputFilePath);
    console.log("Result: ", result);
    // assert.equal(result, 33);
  });

  // it("with real input", () => {
  //   const result = taskB(inputFilePath);
  //   console.log("Result: ", result);
  //   // We don't know the answer!
  // });
});
