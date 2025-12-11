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

  let visited = new Set<string>();
  let pathCount = 0;

  function dfs(currentNode: string) {
    if (currentNode === "out") {
      pathCount++;
      return;
    }

    visited.add(currentNode);

    for (const neighbor of edges[currentNode]) {
      if (!visited.has(neighbor)) {
        dfs(neighbor);
      }
    }

    visited.delete(currentNode);
  }

  dfs("you");

  return pathCount;
  
}