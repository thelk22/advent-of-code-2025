import { describe, it } from "node:test";
import { dayThreeTaskA, dayThreeTaskB } from ".";

describe("dayThree", () => {
  it("run day three task A", () => {
    console.log("Running day three task A...");
    const maxVoltage = dayThreeTaskA();

    console.log("Max voltage: ", maxVoltage);
  });

  it("run day three task B", () => {
    console.log("Running day three task B...");
    const maxVoltage = dayThreeTaskB();

    console.log("Max voltage task B: ", maxVoltage);
  });
});
