import { readFileLines } from "../utils/readFile";

// List of light states, 0 = off, 1 = on
type LightConfig = number[];

// List of indices of lights that change when the button is pressed
type Button = number[];

type Instruction = {
  desiredLightConfig: LightConfig;
  buttons: Button[];
  desiredJoltageConfig: number[];
};

type QueueNode = {
  lightConfig: LightConfig;
  nPresses: number;
  joltageConfig: number[];
};

const pressButton = (currentLightConfig: number[], button: Button) => {
  if (currentLightConfig.length !== button.length) {
    throw new Error("Button and light config length mismatch");
  }
  return currentLightConfig.map(
    (lightOn, index) => (lightOn + button[index]) % 2
  );
};

const applyVoltage = (currentLightConfig: number[], button: Button) => {
  if (currentLightConfig.length !== button.length) {
    throw new Error("Button and light config length mismatch");
  }
  return currentLightConfig.map((lightOn, index) => lightOn + button[index]);
};

export function taskA(inputFilePath: string) {
  // PSEUDO CODE:

  // Step 1: Parse the input into the light config and the buttons
  // Step 2: Implement a function for applying a button press optimally
  // Step 3: Initialise the light config to all off
  // Step 4: Implement a search algorithm to find the minimum button presses to reach the desired config

  // The main question is, what is the search algorithm? Let's try breadth first search since we
  // care about the minimum number of presses to reach the desired config

  const input = readFileLines(inputFilePath).map((line) => {
    const instructions = line.split(" ");

    const desiredLightConfig = instructions[0]
      .replace("[", "")
      .replace("]", "")
      .split("")
      .map((c) => (c === "." ? 0 : 1));

    const nLights = desiredLightConfig.length;

    const buttons = instructions
      .slice(1, -1)
      .map((b) => b.replace("(", "").replace(")", "").split(",").map(Number))
      .map((b) => {
        let button = new Array(nLights).fill(0);
        b.forEach((lightIndex) => {
          button[lightIndex] = 1;
        });
        return button;
      });
    // don't need joltage yet
    return {
      desiredLightConfig,
      buttons,
    } as Instruction;
  });

  // console.log("input", JSON.stringify(input));

  const minPressesPerInstruction = input.map(
    ({ desiredLightConfig, buttons }) => {
      // console.log("desiredLightConfig", desiredLightConfig);
      const desiredConfigId = desiredLightConfig.join("");
      const initialLightConfig = new Array(desiredLightConfig.length).fill(0);

      let minPresses = Infinity;

      // Use dictionary for fast lookups
      let visitedLightConfigs: { [id: string]: number } = {};
      let queue: QueueNode[] = [
        { lightConfig: initialLightConfig, nPresses: 0, joltageConfig: [] },
      ];

      while (queue.length > 0) {
        // console.log("queue", queue);
        // console.log("current queue length", queue.length);
        // console.log("nodes visited so far", visitedLightConfigs);

        if (desiredConfigId in visitedLightConfigs) {
          console.log(
            "Desired config reached with nPresses: ",
            visitedLightConfigs[desiredConfigId]
          );
          minPresses = visitedLightConfigs[desiredConfigId];
          break;
        }

        // Pop next node from queue
        const nodeToCheck = queue[0];
        queue = queue.slice(1);

        // console.log("Checking node", nodeToCheck.lightConfig);
        // console.log("Presses to reach node", nodeToCheck.nPresses);

        if (!nodeToCheck) {
          throw new Error("Queue empty unexpectedly");
        }

        // Check if node has been visited
        const nodeId = nodeToCheck.lightConfig.join("");
        if (nodeId in visitedLightConfigs) {
          // console.log("Node already visited", nodeId);
          continue;
        } else {
          visitedLightConfigs[nodeId] = nodeToCheck.nPresses;
        }

        // Generate next nodes by pressing each button
        // Only add them to the queue if they haven't been visited yet
        const nextLightConfigs = buttons
          .map((b) => ({
            lightConfig: pressButton(nodeToCheck.lightConfig, b),
            nPresses: nodeToCheck.nPresses + 1,
            joltageConfig: [],
          }))
          .filter(({ lightConfig }) => {
            const lcId = lightConfig.join("");
            return !(lcId in visitedLightConfigs);
          });
        // console.log("Adding next light configs to queue:", nextLightConfigs);
        queue.push(...nextLightConfigs);
        queue.sort((a, b) => a.nPresses - b.nPresses);
      }

      return minPresses;
    }
  );

  console.log("minPressesPerInstruction", minPressesPerInstruction);

  return minPressesPerInstruction.reduce((a, b) => a + b, 0);
}
export function taskB(inputFilePath: string) {
  // PSEUDO CODE:

  // BFS is now too slow for this problem because there are so many possible states
  // (even if you limit the number of states to those between 0 and the desired voltage)

  // So now we need to implement Dijkstra's algorithm

  // Step 1: Parse the input into the light config and the buttons
  // Step 2: Implement a function for applying a button press optimally
  // Step 3: Initialise the light config to all off
  // Step 4: Implement Dijkstra's algorithm to find the minimum button presses to reach the desired config

  const input = readFileLines(inputFilePath).map((line) => {
    const instructions = line.split(" ");

    const desiredLightConfig = instructions[0]
      .replace("[", "")
      .replace("]", "")
      .split("")
      .map((c) => (c === "." ? 0 : 1));

    const nLights = desiredLightConfig.length;

    const buttons = instructions
      .slice(1, -1)
      .map((b) => b.replace("(", "").replace(")", "").split(",").map(Number))
      .map((b) => {
        let button = new Array(nLights).fill(0);
        b.forEach((lightIndex) => {
          button[lightIndex] = 1;
        });
        return button;
      });

    const desiredJoltageConfig = instructions[instructions.length - 1]
      .replace("{", "")
      .replace("}", "")
      .split(",")
      .map(Number);

    return {
      desiredLightConfig,
      buttons,
      desiredJoltageConfig,
    } as Instruction;
  });

  // console.log("input", JSON.stringify(input));

  const minPressesPerInstruction = input.map(
    ({ buttons, desiredJoltageConfig }) => {
      // console.log(
      //   "Considering instruction with desired joltage config",
      //   desiredJoltageConfig
      // );
      // console.log("desiredLightConfig", desiredLightConfig);
      const desiredJoltageId = desiredJoltageConfig.join("");
      const initialJoltageConfig = new Array(desiredJoltageConfig.length).fill(
        0
      );

      let minPresses = Infinity;

      // Use dictionary for fast lookups where ID is the joltage config as a string
      // and value is the min presses (so far) to reach that config
      let minJoltages: { [id: string]: number } = {};
      let queue: QueueNode[] = [
        { lightConfig: [], nPresses: 0, joltageConfig: initialJoltageConfig },
      ];

      while (queue.length > 0) {
        // console.log("queue", queue);
        // console.log("current queue length", queue.length);
        // console.log("nodes visited so far", visitedLightConfigs);

        // Pop next node from queue (the one with the lowest number of presses)
        queue.sort((a, b) => a.nPresses - b.nPresses);
        const nodeToCheck = queue[0];
        queue = queue.slice(1);

        console.log("Current queue", queue);
        console.log(
          "Number of nodes aware of cost",
          Object.keys(minJoltages).length
        );

        // console.log("Checking node", nodeToCheck.lightConfig);
        // console.log("Presses to reach node", nodeToCheck.nPresses);

        if (!nodeToCheck) {
          throw new Error("Queue empty unexpectedly");
        }

        if (nodeToCheck.joltageConfig.join("") === desiredJoltageId) {
          minPresses = nodeToCheck.nPresses;
          console.log(
            "Desired joltage config reached with nPresses: ",
            minPresses
          );
          break;
        }

        // Check if node has been visited
        const nodeId = nodeToCheck.joltageConfig.join("");
        if (nodeId in minJoltages) {
          if (nodeToCheck.nPresses > minJoltages[nodeId]) {
            // Already found a better or equal way to this node
            console.log(
              "Node already visited with a better or equal path",
              nodeId
            );
            continue;
          }
        } else {
          minJoltages[nodeId] = nodeToCheck.nPresses;
        }

        // Generate next nodes by pressing each button
        // Only add them to the queue if they haven't been visited yet
        // Only add them to the queue if the voltage is less than or equal to the desired voltage
        const nextJoltageConfigs = buttons.map((b) => ({
          lightConfig: [],
          nPresses: nodeToCheck.nPresses + 1,
          joltageConfig: applyVoltage(nodeToCheck.joltageConfig, b),
        }));
        // console.log("Generated next joltage configs:", nextJoltageConfigs);
        nextJoltageConfigs.forEach(({ joltageConfig, nPresses }) => {
          const jcId = joltageConfig.join("");
          if (!minJoltages[jcId]) {
            minJoltages[jcId] = nPresses;
            queue.push({ lightConfig: [], nPresses, joltageConfig });
            return;
          }
          if (nPresses < minJoltages[jcId]) {
            minJoltages[jcId] = nPresses;
            queue.push({ lightConfig: [], nPresses, joltageConfig });
            return;
          }
        });
      }

      return minPresses;
    }
  );
  return minPressesPerInstruction.reduce((a, b) => a + b, 0);
}
