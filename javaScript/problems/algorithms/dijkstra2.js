/**
 * How does it work?
 *
 * Visit Nodes: From the current node, examine its unvisited neighbors.
 * Calculate their tentative distances.
 * If a new path to a node is shorter than its previous path, update its distance
 *
 * Mark Current Node as Visited:
 * Once all neighbors of the current node are considered, mark the node as visited.
 * A visited node will not be checked again.
 *
 * Select Next Node: Out of the unvisited nodes, select the one with the smallest tentative distance and make it the current node.
 * Then, return to the second step.
 *
 * Completion: When every node has been visited, the algorithm has determined the shortest possible distance to each node from the starting point.
 */

const dijkstra = (graph, start) => {
  // Hash table to store shortest distance from start node to every other node
  let distances = {};

  // Keep track of all visited nodes
  let visited = new Set();

  // Get all nodes of graph
  let nodes = Object.keys(graph);

  // Initially set shortest distance to every node as infinity, because we don't know it yet
  for (let node of nodes) {
    distances[node] = Infinity;
  }

  // Distance from start node to itself is 0
  distances[start] = 0;

  // Traverse all nodes
  while (nodes.length) {
    // Sort nodes by distance and pick closest unvisited node
    nodes.sort((a, b) => {
      distances[a] - distances[b];
    });

    let closestNode = nodes.shift();

    // If shortest distance to closest is still infinity, cannot reach remaining nodes, break
    if (distances[closestNode] === Infinity) break;

    // Mark node as visited
    visited.add(closestNode);

    // For each neighboring node of current node
    for (let neighbor in graph[closestNode]) {
      // Not visited yet
      if (!visited.has(neighbor)) {
        // Calculate temp distance to neighboring node
        let newDistance = distances[closestNode] + graph[closestNode][neighbor];

        // If new distance is shorter than previously known distance, update shortest distance to this neighbor
        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
        }
      }
    }
  }

  // Return shortest distance from start to all nodes
  return distances;
};

const graph = {
  A: { B: 1, C: 4 }, // Node A is connected to Node B with a weight of 1 and Node C with a weight of 4
  B: { A: 1, C: 2, D: 5 }, // ... and so on for other nodes
  C: { A: 4, B: 2, D: 1 },
  D: { B: 5, C: 1 },
};

// Shortest distances from node A -> all other nodes
console.log(dijkstra(graph, 'A'));
