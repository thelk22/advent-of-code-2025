/*
 * A test file that can be run with ts-node for working out how things work in TypeScript.
 */

const bank = ["5", "9", "8", "3", "2", "7", "4", "6", "1", "0"];

const maxVoltage = bank
  .map((battery, index) => [Number(battery), index])
  .sort((a, b) => b[0] - a[0])
  .slice(0, 6)
  .sort((a, b) => a[1] - b[1])
  .map(([battery, index]) => battery)
  .join("");

console.log("Max voltage: ", maxVoltage);
