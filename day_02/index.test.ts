import { describe, it } from "node:test";
import { dayTwoTaskA, dayTwoTaskB } from ".";
import assert from "node:assert";

describe("dayTwo", () => {
  it("run day two task A", () => {
    console.log("Running day two task A...");
    const invalidIdCount = dayTwoTaskA();

    console.log("Invalid ID count: ", invalidIdCount);
  });

  it("run day two task B", () => {
    console.log("Running day two task B...");
    const invalidIdCount = dayTwoTaskB();

    console.log("Invalid ID count: ", invalidIdCount);
  });
});
