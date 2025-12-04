import assert from "node:assert";
import { describe, it } from "node:test";
import { dayFourTaskA, dayFourTaskB } from ".";

describe("dayFour", () => {
  it("run day four task A", () => {
    console.log("Running day four task A...");
    const result = dayFourTaskA();

    console.log("Result: ", result);

    assert(result === 1602);
  });

  it("run day four task B", () => {
    console.log("Running day four task B...");
    const result = dayFourTaskB();

    console.log("Result: ", result);

    assert(result === 9518);
  });
});
