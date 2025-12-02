import assert from "node:assert";
import { describe, it } from "node:test";
import { dayOneTaskA, dayOneTaskB } from ".";

describe("dayOne task A", () => {
  it("run day one task A", () => {
    console.log("Running day one task A...");
    const password = dayOneTaskA();
    console.log("Password from test:", password);

    assert.equal(password, 1074);
  });
});

describe("dayOne task B", () => {
  it("run day one task B", () => {
    console.log("Running day one task B...");
    const password = dayOneTaskB();
    console.log("Password from test:", password);
  });
});
