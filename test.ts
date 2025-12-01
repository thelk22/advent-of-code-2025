/*
* A test file that can be run with ts-node for working out how things work in TypeScript.
*/

let res = 100 % 99;
console.log(res);

res = 99 % 99;
console.log(res);

res = 198 % 99;
console.log(res);

res = 3 % 99;
console.log(res);

res = -4 % 99;
console.log(res);

const prev = 3;
const next = -6;
console.log((prev + next) % 99);