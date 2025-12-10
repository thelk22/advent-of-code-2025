/*
 * A test file that can be run with ts-node for working out how things work in TypeScript.
 */

import { solve } from "vectorious";

const X = solve(
  [
    [2, 1, 0],
    [1, 1, 1],
    [0, 1, 2],
  ],
  [4, 3, 4]
);

console.log("X: ", X.toString());
