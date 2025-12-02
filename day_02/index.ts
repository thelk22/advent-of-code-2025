import { readFileLines } from "../utils/readFile";

export function dayTwoTaskA() {
    // read input file
    const input = readFileLines("day_02/input.txt");

    // separate out each range into min and max
    const ranges = input[0].split(",").map(range => {
        const [min, max] = range.split("-").map(Number);
        return { min, max };
    });

    console.log(`Loaded ${ranges.length} ranges`);

    // brute force approach:
    // loop through every value in the range and check if it contains a repeated value
    // logic for checking repeated value:
    // 1) check if length is even
    // 2) split number in half
    // 3) check first half is same as second half
    let invalidIds = 0;
    for (const {min, max} of ranges) {
        console.log(`Processing range: ${min}-${max} which has ${max - min + 1} values`);

        for (let value = min; value <= max; value++) {

            const valueStr = value.toString();
            if (valueStr.length % 2 !== 0) {
                continue;
            }

            const firstHalf = valueStr.substring(0, valueStr.length / 2);
            const secondHalf = valueStr.substring(valueStr.length / 2);
            
            if (firstHalf === secondHalf) {
                console.log("Found invalid ID", {
                    ID: valueStr,
                    len: valueStr.length,
                })
                invalidIds += value;
            }
        }
    }

    return invalidIds;
}

export function dayTwoTaskB() {
    // read input file
    const input = readFileLines("day_02/input.txt");

    // separate out each range into min and max
    const ranges = input[0].split(",").map(range => {
        const [min, max] = range.split("-").map(Number);
        return { min, max };
    });

    console.log(`Loaded ${ranges.length} ranges`);

    // brute force approach:
    // loop through every value in the range and check if it contains a repeated value
    // logic for checking repeated value:
    // 1) check if length is even
    // 2) split number in half
    // 3) check first half is same as second half
    let invalidIds = 0;
    for (const {min, max} of ranges) {
        console.log(`Processing range: ${min}-${max} which has ${max - min + 1} values`);

        for (let value = min; value <= max; value++) {

            const valueStr = value.toString();

            // for range in 1 to length of string, if number divides length of string then check for patterns of that length
            for (let patternLen = 1; patternLen <= valueStr.length / 2; patternLen++) {
                if (valueStr.length % patternLen !== 0) {
                    continue;
                }

                const nRepeats = valueStr.length / patternLen;
                const pattern = valueStr.substring(0, patternLen);

                let isInvalid = true;
                for (let repeatIdx = 1; repeatIdx < nRepeats; repeatIdx++) {
                    const nextSubstr = valueStr.substring(repeatIdx * patternLen, (repeatIdx + 1) * patternLen);
                    if (nextSubstr !== pattern) {
                        isInvalid = false;
                        break;
                    }
                }

                if (isInvalid) {
                    invalidIds += value;
                    break;
                }

            }
        }
    }

    return invalidIds;
}