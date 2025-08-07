/**
 * You are given an m x n 2-D integer array matrix and an integer target.
 * Each row in matrix is sorted in non-decreasing order.
 * The first integer of every row is greater than the last integer of the previous row.
 *
 * Return true if target exists within matrix or false otherwise.
 * Can you write a solution that runs in O(log(m * n)) time?
 */

// Each row in matrix is sorted in non-decreasing order.
// The first integer of every row is greater than the last integer of the previous row.

// Check first row val, go down rows until we find row with first element larger, search in between the rows
// const searchMatrix = (matrix, target) => {
//   let targetRow = undefined;
//   for (let i = 0; i < matrix.length; i++) {
//     let currentRow = matrix[i];
//     let lastNumber = currentRow[currentRow.length - 1];

//     if (currentRow[0] <= target && lastNumber > target) {
//       targetRow = currentRow;
//     }
//   }

//   if (!targetRow) return false;

//   for (let num = 0; num < targetRow.length; num++) {
//     if (targetRow[num] === target) return true;
//   }

//   return false;
// };

// Binary Search (One Pass)
/**
 * Time complexity: O(log(m∗n))
 * O(log(m∗n))
 * Space complexity:
 * O(1)O(1)
 */
const searchMatrix = (matrix, target) => {
  let ROWS = matrix.length,
    COLS = matrix[0].length;

  let l = 0,
    r = ROWS * COLS - 1;
  while (l <= r) {
    let m = l + Math.floor((r - l) / 2);
    let row = Math.floor(m / COLS),
      col = m % COLS;
    if (target > matrix[row][col]) {
      l = m + 1;
    } else if (target < matrix[row][col]) {
      r = m - 1;
    } else {
      return true;
    }
  }
  return false;
};

console.log(
  searchMatrix(
    [
      [1, 2, 4, 8],
      [10, 11, 12, 13],
      [14, 20, 30, 40],
    ],
    10
  )
); // true

console.log(
  searchMatrix(
    [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
    ],
    7
  )
); // true
console.log(searchMatrix([[1]], 0)); // false
console.log(
  searchMatrix(
    [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60],
    ],
    3
  )
); // true

console.log(
  searchMatrix(
    [
      [1, 2, 4, 8],
      [9, 10, 12, 13],
      [14, 20, 30, 40],
    ],
    10
  )
); // true

console.log(
  searchMatrix(
    [
      [-3, -2, -1, 0],
      [1, 2, 4, 8],
      [10, 11, 12, 13],
      [14, 20, 30, 40],
      [50, 60, 65, 43],
      [90, 91, 92, 93],
      [94, 95, 96, 97],
      [98, 98, 99, 101],
    ],
    102
  )
); // false
