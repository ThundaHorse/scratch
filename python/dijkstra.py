def dijkstra(graph, start):
    # Storing shortest distance from start to every node
    distances = {}
    # Visited nodes
    visited = set()
    # List of all nodes
    nodes = list(graph.keys())

    for node in nodes:
        # Set initial distance to infinity
        distances[node] = float("inf")

    # Current node
    distances[start] = 0

    while len(nodes) > 0:
        nodes.sort()
        closest_node = nodes.pop(0)

        # Shortest distance is still infinity
        if distances[closest_node] == float("inf"):
            break

        # Mark node as visited
        visited.add(closest_node)

        for neighbor in graph[closest_node]:
            # Neighbor hasn't been visited
            if neighbor not in visited:
                new_distance = distances[closest_node] + graph[closest_node][neighbor]

                # Set new min if valid
                if new_distance < distances[neighbor]:
                    distances[neighbor] = new_distance

    return distances


def main():
    GRAPH = {
        "A": {"B": 1, "C": 4},
        "B": {"A": 1, "C": 2, "D": 5},
        "C": {"A": 4, "B": 2, "D": 1},
        "D": {"B": 5, "C": 1},
    }
    print(dijkstra(GRAPH, "A"))


if __name__ == "__main__":
    main()
