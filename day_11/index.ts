/*
TL:DR: Graph traversal problem to find all paths between nodes without constrants (part A)
and with constraints (part B).

Implemented depth first search which worked well for part A. 
The starting node for part B as well as the constraints made it more complex. The key was to 
cache intermediate results so that we didn't have to recalculate paths multiple times.

For part B I was getting OOM errors due to a bug in the code, where I was checking for falsey
values instead of explicitly checking for undfined. This was bad as 0 is a valid path count!
*/

import { readFileLines } from "../utils/readFile";

export function taskA(inputFilePath: string) {
  // PSEUDO CODE:
  // This is a graph problem
  // Create the nodes
  // Create the edges between nodes
  // Traverse the graph to find the solution
  // Use depth first search to avoid running out of memory to find all paths between "you" and "out"

  const lines = readFileLines(inputFilePath);
  console.log("Input lines: ", lines);

  const nodes = lines.map((line) => line.split(":")[0])
  const edges = lines.map((line) => {
    const [node, neighbors] = line.split(":");
    return {
      node,
      neighbors: neighbors.trim().split(" "),
    };
  }).reduce((acc, curr) => {
    acc[curr.node] = curr.neighbors;
    return acc;
  }, {} as Record<string, string[]>);

  console.log("Nodes: ", nodes);
  console.log("Edges: ", edges);

  let pathCounts: {[node: string]: number} = {};

  function findPathsDfs(currentNode: string, targetNode: string): number {
    console.log("Visiting node: ", currentNode);
    console.log("Current path counts: ", pathCounts);
    if (currentNode === targetNode) {
      pathCounts[targetNode] = 1;
      return 1;
    }

    let pathCount = 0;

    if (!edges[currentNode]) {
      console.log("No edges for node: ", currentNode);
      return 0;
    }

    for (const neighbor of edges[currentNode]) {
      if (pathCounts[neighbor]) {
        pathCount += pathCounts[neighbor];
        continue;
      }
      const neighborPathCount = findPathsDfs(neighbor, targetNode);
      pathCount += neighborPathCount;
      
    }
    pathCounts[currentNode] = pathCount;

    return pathCount;
  }

  return findPathsDfs("you", "out");
}

const cache = new Map<string, number>();

function depthFirstSearchWithConstraints(currentNode: string, targetNode: string, edges: Record<string, string[]>, hasSeenDac: boolean, hasSeenFft: boolean ) {
  if (currentNode === "dac") {
    hasSeenDac = true;
  }
  if (currentNode === "fft") {
    hasSeenFft = true;
  }

  if (currentNode === targetNode && hasSeenDac && hasSeenFft) {
    return 1;
  }

  let pathCount = 0;

  if (edges[currentNode]) {
    for (const neighbor of edges[currentNode]) {
      const cacheKey = `${neighbor}-${hasSeenDac}-${hasSeenFft}`;
      if (cache.has(cacheKey)) {
        pathCount += cache.get(cacheKey)!;
      } else {
        const neighborPathCount = depthFirstSearchWithConstraints(neighbor, targetNode, edges, hasSeenDac, hasSeenFft);
        pathCount += neighborPathCount;
        cache.set(cacheKey, neighborPathCount);
      }
    }
  }
  

  return pathCount;
}

export function taskB(inputFilePath: string) {
  // PSEUDO CODE:
  // Similar to A but with constraints on which paths are allowed
  // Find all paths between two nodes but only record those that meet the criteria
  // Then count the number of paths and return

  const lines = readFileLines(inputFilePath);
  // console.log("Input lines: ", lines);

  const nodes = lines.map((line) => line.split(":")[0])
  const edges = lines.map((line) => {
    const [node, neighbors] = line.split(":");
    return {
      node,
      neighbors: neighbors.trim().split(" "),
    };
  }).reduce((acc, curr) => {
    acc[curr.node] = curr.neighbors;
    return acc;
  }, {} as Record<string, string[]>);

  console.log("Nodes: ", nodes);
  console.log("Edges: ", edges);

  let pathCounts: {[node: string]: number} = {};

  function findPathsDfs(currentNode: string, targetNode: string, hasSeenDac: boolean, hasSeenFft: boolean): number {
    if (currentNode === targetNode && hasSeenDac && hasSeenFft) {
      pathCounts[targetNode] = 1;
      return 1;
    }

    let pathCount = 0;

    if (!edges[currentNode]) {
      console.log("No edges for node: ", currentNode);
      return 0;
    }

    if (currentNode === "dac") {
      hasSeenDac = true;
    }
    if (currentNode === "fft") {
      hasSeenFft = true;
    }

    for (const neighbor of edges[currentNode]) {
      const neighborCacheId = `${neighbor}-${hasSeenDac}-${hasSeenFft}`;
      // Checking for undefined is super important because 0 is a valid path count!
      if (pathCounts[neighborCacheId] !== undefined) {
        pathCount += pathCounts[neighborCacheId];
        continue;
      }
      const neighborPathCount = findPathsDfs(neighbor, targetNode, hasSeenDac, hasSeenFft);
      pathCounts[neighborCacheId] = neighborPathCount;
      pathCount += neighborPathCount;
    }

    console.log("Finished with node: ", currentNode);
    console.log("Current path counts: ", pathCounts);
    return pathCount;
  }

  console.log("Final path counts: ", pathCounts);
  return findPathsDfs("svr", "out", false, false);
  
}
