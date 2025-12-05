import { describe, it } from "node:test";
import { dayFiveTaskA, dayFiveTaskB } from ".";

describe("dayFive", () => {
  it("run day five task A", () => {
    console.log("Running day five task A...");
    const result = dayFiveTaskA();

    console.log("Result: ", result);
  });

  it("run day five task B", () => {
    console.log("Running day five task B...");
    const result = dayFiveTaskB();

    console.log("Result: ", result);
  });
});
