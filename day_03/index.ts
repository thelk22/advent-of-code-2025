import { readFileLines } from "../utils/readFile";

export function dayThreeTaskA() {
  // read input file
  const input = readFileLines("day_03/input.txt");

  console.log(`Loaded ${input.length} lines`);
  console.log("First line:", input[0]);

  // move along the line keeping track of the biggest and second biggest number (that has to have come after the biggest)
  // when you know them, add them together
  let voltage = 0;

  input.forEach((line, index) => {
    console.log(`Line ${index + 1}: ${line}`);

    const bank = [...line];

    let maxBatteryLevel = 0;
    let maxIndex = [0, 0];

    bank.forEach((left, leftIndex) => {
      for (let i = leftIndex + 1; i <= bank.length; i++) {
        const rightBatteryLevelToTest = bank[i];

        const batteryLevelToTest = Number(`${left}${rightBatteryLevelToTest}`);

        if (batteryLevelToTest > maxBatteryLevel) {
          maxBatteryLevel = batteryLevelToTest;
          maxIndex = [leftIndex, i];
        }
      }
    });

    console.log(
      `Max battery level for line ${index + 1}: ${maxBatteryLevel} (from indexes ${maxIndex[0]} (${bank[maxIndex[0]]}) and ${maxIndex[1]} (${bank[maxIndex[1]]}))`
    );

    voltage += maxBatteryLevel;
  });

  return voltage;
}

export function dayThreeTaskB() {
  // read input file
  const batteryBanks = readFileLines("day_03/input.txt").map((line) =>
    [...line].map((b) => Number(b))
  );

  // PSEUDOCODE:
  // loop through battery banks
  // for each battery bank, create array of objects:
  // {
  //     "batteryLevel": number,
  //     "batteryIndex": number,
  //     "batteriesLeft": number,
  //     "isSelected": boolean,
  //     "alreadyConsidered": boolean,
  // }
  // for i in 11 (inclusive) to 0 (inclusive)
  // find the biggest battery level where batteriesLeft >= i and alreadyConsidered = false
  // mark that battery as isSelected = true
  // mark all the batteries before it (inclusive of it) as alreadyConsidered = true

  let totalVoltage = 0;

  for (const batteryBank of batteryBanks) {
    console.log("Processing battery bank: ", batteryBank);

    let batteryObjects = batteryBank.map((batteryLevel, index) => ({
      batteryLevel,
      batteryIndex: index,
      batteriesLeft: batteryBank.length - index - 1,
      isSelected: false,
      alreadyConsidered: false,
    }));

    for (let i = 11; i >= 0; i--) {
      const selectedBattery = batteryObjects
        .filter((b) => !b.alreadyConsidered && b.batteriesLeft >= i)
        .sort((a, b) => b.batteryLevel - a.batteryLevel)[0];

      batteryObjects = batteryObjects.map((b) => {
        let newObj = { ...b };
        if (b.batteryIndex <= selectedBattery.batteryIndex) {
          newObj.alreadyConsidered = true;
        }
        if (b.batteryIndex === selectedBattery.batteryIndex) {
          newObj.isSelected = true;
        }
        return newObj;
      });
    }

    const selectedBatteries = batteryObjects
      .filter((b) => b.isSelected)
      .map((b) => b.batteryLevel)
      .join("");

    console.log(`Selected batteries: ${selectedBatteries}`);

    totalVoltage += Number(selectedBatteries);
  }

  return totalVoltage;
}
