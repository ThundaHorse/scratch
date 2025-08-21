type Graph = { [key: string]: string[] };

const graph: Graph = {
  A: ['B', 'C'],
  B: ['A', 'D', 'E'],
  C: ['A', 'F'],
  D: ['B'],
  E: ['B', 'F'],
  F: ['C', 'E']
};

/**
 *
 * BFS Example, implement BFS and log every node at each level
 */
const bfs = (graph: Graph, start: string): string[] => {
  if (!graph[start]) return [];

  let res: string[] = [];
  const queue: string[] = [start];
  const visited: Set<string> = new Set();

  while (queue.length) {
    const current: string = queue.shift()!;
    if (!visited.has(current)) {
      visited.add(current);
      res.push(current);
      queue.push(
        ...graph[current].filter((neighbor) => !visited.has(neighbor))
      );
    }
  }

  return res;
};

console.log(bfs(graph, 'A')); // [A, B, C, D, E, F]
