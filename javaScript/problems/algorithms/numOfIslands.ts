/**
 * Given a 2D grid where '1' represents land and '0' represents water,
 * implement a function to count the number of islands in the grid.
 *
 * An island is formed by connecting adjacent lands horizontally or vertically and is surrounded by water.
 *
 * Assume water is surrounding the grid (edges are water)
 */

const checkAdjacent = (
  grid: string[][],
  visited: boolean[][],
  i: number,
  j: number
): void => {
  // If out of bounds or already visited or water, return
  if (
    i < 0 ||
    i >= grid.length ||
    j < 0 ||
    j >= grid[0].length ||
    visited[i][j] ||
    grid[i][j] === '0'
  ) {
    return;
  }

  // Mark the current cell as visited
  visited[i][j] = true;

  // Check all 4 adjacent cells (up, down, left, right)
  checkAdjacent(grid, visited, i - 1, j);
  checkAdjacent(grid, visited, i + 1, j);
  checkAdjacent(grid, visited, i, j - 1);
  checkAdjacent(grid, visited, i, j + 1);
};

const numIslands = (grid: string[][]): number => {
  let count: number = 0;
  const visited: boolean[][] = Array.from({ length: grid.length }, () =>
    Array(grid[0].length).fill(false)
  );

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[0].length; j++) {
      if (grid[i][j] === '1' && !visited[i][j]) {
        checkAdjacent(grid, visited, i, j);
        count++;
      }
    }
  }

  return count;
};

console.log(
  numIslands([
    ['0', '1', '1', '1', '0'],
    ['0', '1', '0', '1', '0'],
    ['1', '1', '0', '0', '0'],
    ['0', '0', '0', '0', '0']
  ])
); // 1

console.log(
  numIslands([
    ['1', '1', '0', '0', '1'],
    ['1', '1', '0', '0', '1'],
    ['0', '0', '1', '0', '0'],
    ['0', '0', '0', '1', '1']
  ])
); // 4
