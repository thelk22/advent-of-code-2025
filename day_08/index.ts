import { readFileLines } from "../utils/readFile";

type Position = [number, number, number];

type JunctionBox = {
  index: number;
  position: Position;
};

const calculateDistance = (posA: Position, posB: Position): number => {
  return Math.sqrt(
    Math.pow(posA[0] - posB[0], 2) +
      Math.pow(posA[1] - posB[1], 2) +
      Math.pow(posA[2] - posB[2], 2)
  );
};

export function taskA(inputFilePath: string) {
  // Key understanding:
  // Circuits can only be connected at junction boxes

  // PSEUDO CODE:
  // Step 1:
  // -- Calculate Euclidean distance from every junction box to every other junction box and sort ascending
  // Step 2:
  // -- Iteratively create groups of connected junction boxes.
  // -- When considering a junction box, only add it to a group if it is not already in the circuit for that group (i.e. not on the path)
  // -- Each time you connect a box, restart this step. Repeat up to 1000 times
  // Step 3:
  // -- Sort the groups by their length and multiply the top three together to get the result

  let nodes = readFileLines(inputFilePath).map(
    (line, index) =>
      ({
        index,
        position: line.split(",").map(Number) as [number, number, number],
      }) as JunctionBox
  );
  let indexedNodes: Record<number, JunctionBox> = {};
  nodes.forEach((node) => {
    indexedNodes[node.index] = node;
  });

  let indexedEdges: Record<string, number> = {};
  nodes.forEach((nodeA) => {
    nodes.forEach((nodeB) => {
      if (nodeA.index === nodeB.index) return;

      const edgeId = `${nodeA.index}-${nodeB.index}`;
      const edgeIdReverse = `${nodeB.index}-${nodeA.index}`;

      if (indexedEdges[edgeId] || indexedEdges[edgeIdReverse]) {
        return;
      }

      const distance = calculateDistance(nodeA.position, nodeB.position);
      indexedEdges[edgeId] = distance;
    });
  });

  // console.log("Indexed nodes:", indexedNodes);
  // console.log("Indexed edges:", indexedEdges);

  const sortedEdges = Array.from(Object.entries(indexedEdges)).sort(
    (a, b) => a[1] - b[1]
  );

  // console.log("Sorted edges:", sortedEdges);

  // List of circuits, where each circuit is an indexed list of nodes (for quick lookup), e.g.
  // { 0: '0-2', 2: '0-2' }
  let circuits: { [number: number]: string }[] = [];
  // let index = 0;
  for (const [edgeId, distance] of sortedEdges.slice(
    0,
    inputFilePath.includes("test") ? 10 : 1000
  )) {
    // console.log("Considering edge:", edgeId, "with distance:", distance);
    // console.log("Current circuits:", circuits);

    const [nodeA, nodeB] = edgeId.split("-").map(Number);

    // Node should only be in one circuit
    const circuitNodeA = circuits.findIndex((circuit) => nodeA in circuit);
    const circuitNodeB = circuits.findIndex((circuit) => nodeB in circuit);

    // If no nodes are in a circuit, create a new circuit
    if (circuitNodeA === -1 && circuitNodeB === -1) {
      circuits.push({ [nodeA]: edgeId, [nodeB]: edgeId });
      continue;
    }

    // If exactly one node is in a circuit, add the other node to that circuit
    if (circuitNodeA !== -1 && circuitNodeB === -1) {
      circuits[circuitNodeA][nodeB] = edgeId;
      continue;
    }
    if (circuitNodeA === -1 && circuitNodeB !== -1) {
      circuits[circuitNodeB][nodeA] = edgeId;
      continue;
    }

    // If both nodes are in different circuits, merge the circuits
    if (
      circuitNodeA !== -1 &&
      circuitNodeB !== -1 &&
      circuitNodeA !== circuitNodeB
    ) {
      // console.log("Merging circuits:", circuitNodeA, "and", circuitNodeB);
      const circuitA = circuits[circuitNodeA];
      const circuitB = circuits[circuitNodeB];

      const newCircuit = { ...circuitA, ...circuitB };
      // console.log("New merged circuit:", newCircuit);

      // Remove circuitB
      // console.log("Previous circuits:", circuits);
      circuits[circuitNodeA] = newCircuit;
      circuits.splice(circuitNodeB, 1);
      // console.log("Updated circuits after merge:", circuits);
      continue;
    }
  }

  const result = circuits
    .sort((a, b) => Object.keys(b).length - Object.keys(a).length)
    .slice(0, 3)
    .reduce((acc, circuit) => acc * Object.keys(circuit).length, 1);

  console.log("Result:", result);

  return result;
}

export function taskB(inputFilePath: string) {
  // Very similar to task A, but don't limit to 1000 iterations
  // Instead, keep track of the number of circuits
  // As soon as there is only one circuit (and it contains all nodes), break the loop and calculate the result from the pair of edges

  let nodes = readFileLines(inputFilePath).map(
    (line, index) =>
      ({
        index,
        position: line.split(",").map(Number) as [number, number, number],
      }) as JunctionBox
  );
  let indexedNodes: Record<number, JunctionBox> = {};
  nodes.forEach((node) => {
    indexedNodes[node.index] = node;
  });

  let indexedEdges: Record<string, number> = {};
  nodes.forEach((nodeA) => {
    nodes.forEach((nodeB) => {
      if (nodeA.index === nodeB.index) return;

      const edgeId = `${nodeA.index}-${nodeB.index}`;
      const edgeIdReverse = `${nodeB.index}-${nodeA.index}`;

      if (indexedEdges[edgeId] || indexedEdges[edgeIdReverse]) {
        return;
      }

      const distance = calculateDistance(nodeA.position, nodeB.position);
      indexedEdges[edgeId] = distance;
    });
  });

  const sortedEdges = Array.from(Object.entries(indexedEdges)).sort(
    (a, b) => a[1] - b[1]
  );

  // console.log("Sorted edges:", sortedEdges);

  // List of circuits, where each circuit is an indexed list of nodes (for quick lookup), e.g.
  // { 0: '0-2', 2: '0-2' }
  let circuits: { [number: number]: string }[] = [];
  let solvingNodeA;
  let solvingNodeB;
  for (const [edgeId, distance] of sortedEdges) {
    const [nodeA, nodeB] = edgeId.split("-").map(Number);

    // Node should only be in one circuit
    const circuitNodeA = circuits.findIndex((circuit) => nodeA in circuit);
    const circuitNodeB = circuits.findIndex((circuit) => nodeB in circuit);

    // If no nodes are in a circuit, create a new circuit
    if (circuitNodeA === -1 && circuitNodeB === -1) {
      circuits.push({ [nodeA]: edgeId, [nodeB]: edgeId });
    }

    // If exactly one node is in a circuit, add the other node to that circuit
    else if (circuitNodeA !== -1 && circuitNodeB === -1) {
      circuits[circuitNodeA][nodeB] = edgeId;
    } else if (circuitNodeA === -1 && circuitNodeB !== -1) {
      circuits[circuitNodeB][nodeA] = edgeId;
    }

    // If both nodes are in different circuits, merge the circuits
    else if (
      circuitNodeA !== -1 &&
      circuitNodeB !== -1 &&
      circuitNodeA !== circuitNodeB
    ) {
      const circuitA = circuits[circuitNodeA];
      const circuitB = circuits[circuitNodeB];

      const newCircuit = { ...circuitA, ...circuitB };

      // Remove circuitB
      circuits[circuitNodeA] = newCircuit;
      circuits.splice(circuitNodeB, 1);
    }

    // If we're down to a single circuit...
    if (circuits.length === 1) {
      const numberOfNodes = Object.keys(circuits[0]).length;
      // AND the circuit contains the right number of nodes, then we have the result!
      if (numberOfNodes === nodes.length) {
        solvingNodeA = nodeA;
        solvingNodeB = nodeB;
        break;
      }
    }
  }

  if (!solvingNodeA || !solvingNodeB) {
    throw new Error("Could not find solving nodes");
  }

  const nodeAPosition = indexedNodes[solvingNodeA].position;
  const nodeBPosition = indexedNodes[solvingNodeB].position;
  const result = nodeAPosition[0] * nodeBPosition[0];

  console.log("Result:", result);

  return result;
}
