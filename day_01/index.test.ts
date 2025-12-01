import { describe, it } from "node:test";
import { dayOneTaskA } from ".";
import assert from "node:assert";

describe("dayOne", () => {
    it("run day one task A", () => {
        console.log("Running day one task A...");
        const password = dayOneTaskA();
        console.log("Password from test:", password);

        assert.equal(password, 1074);
    });
});