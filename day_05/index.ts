import { readFileLines } from "../utils/readFile";

export function dayFiveTaskA() {
  const input = readFileLines("day_05/input.txt");

  const ranges = input
    .filter((row) => row.includes("-"))
    .map((range) => {
      const [lower, upper] = range.split("-").map((num) => parseInt(num, 10));
      return { lower, upper };
    });
  const ingredients = input
    .filter((row) => !row.includes("-"))
    .map((num) => parseInt(num, 10));

  console.log("Ranges: ", ranges);
  console.log("Ingredients: ", ingredients);

  // loop through ingredients

  // loop through ranges

  // check greater than lower end of range
  // check less than higher end of range

  // if so count as valid ingredient and move on to next ingredient (skip rest of ranges for that ingredient)
  let validIngredients = 0;
  for (const ingredient of ingredients) {
    for (const range of ranges) {
      if (ingredient >= range.lower && ingredient <= range.upper) {
        validIngredients++;
        break;
      }
    }
  }

  return validIngredients;
}

function range(min: number, max: number): number[] {
  // Ensure the min value is not greater than the max value
  if (min > max) {
    return [];
  }

  let array = [];
  for (let i = min; i <= max; i++) {
    // Just to illustrate the loop; this can be removed
    array.push(i);
  }

  return array;
}

function findOverlappingRanges(ranges: [number, number][]): [number, number][] {
  let rangesSortedByMin = ranges.sort((a, b) => a[0] - b[0]);

  const mergedRanges: [number, number][] = [];
  let currentMin = rangesSortedByMin[0][0];
  let currentMax = rangesSortedByMin[0][1];

  for (let i = 1; i < rangesSortedByMin.length; i++) {
    const [nextMin, nextMax] = rangesSortedByMin[i];

    // Note: use max + 1 to account for integer ranges where [1, 5] and [6, 10] are adjacent.
    if (nextMin <= currentMax + 1) {
      currentMax = Math.max(currentMax, nextMax);
    } else {
      // no overlap
      mergedRanges.push([currentMin, currentMax]);
      currentMin = nextMin;
      currentMax = nextMax;
    }
  }

  mergedRanges.push([currentMin, currentMax]);

  return mergedRanges;
}

export function dayFiveTaskB() {
  const input = readFileLines("day_05/input.txt");

  const ranges = input
    .filter((row) => row.includes("-"))
    .map((range) => {
      const [lower, upper] = range.split("-").map((num) => parseInt(num, 10));
      return [lower, upper] as [number, number];
    });

  console.log("Ranges: ", ranges);

  // ranges are too large to put into arrays!
  // need something smarter...

  // for each range, start building a combined range
  // if two ranges overlap, merge them
  // at the end we have a list of non-overlapping ranges
  // then we can count the total number of values in those ranges

  const overlappingRange = findOverlappingRanges(ranges);

  let result = 0;
  overlappingRange.forEach((range) => {
    result += range[1] - range[0] + 1;
  });

  return result;
}
