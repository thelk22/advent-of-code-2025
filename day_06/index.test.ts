import { describe, it } from "node:test";
import { taskA, taskB } from ".";

describe("Run task", () => {
  it("task A", () => {
    console.log("Running task A...");
    const result = taskA();

    console.log("Result: ", result);
  });

  it("task B", () => {
    console.log("Running task B...");
    const result = taskB();

    console.log("Result: ", result);
  });
});
