/**
 * You are given an m x n 2-D array matrix and an integer target
 * Each row in matrix is sorted in non-decreasing order
 * The first integer of every row is greater than the last integer of the previous row
 *
 * Return true if target exists within the matrix or false otherwise
 *
 * Recommended Solution Time: O(log(m * n))
 */
var searchMatrix = function (matrix, target) {
  console.time('Start: ');
  if (!matrix || matrix.length === 0 || matrix[0].length === 0) return false;
  var totalRows = matrix.length;
  var totalCols = matrix[0].length;
  var totalNums = totalRows * totalCols;
  var left = 0;
  var right = totalNums - 1;
  while (left <= right) {
    var mid = Math.floor((left + right) / 2);
    var currentRow = Math.floor(mid / totalCols);
    var currentCol = mid % totalCols;
    var midVal = matrix[currentRow][currentCol];
    if (midVal === target) return true;
    if (midVal < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  console.timeEnd('End: ');
  return false;
};
console.log(
  searchMatrix(
    [
      [1, 2, 4, 8],
      [10, 11, 12, 13],
      [14, 20, 30, 40]
    ],
    10
  )
); // true
console.log(
  searchMatrix(
    [
      [1, 2, 4, 8],
      [10, 11, 12, 13],
      [14, 20, 30, 40]
    ],
    15
  )
); // false
