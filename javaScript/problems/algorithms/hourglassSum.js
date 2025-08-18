/**
 * Given a 6x6 2D array, an hourglass is a subset of values with indices falling
 * in the following pattern:
 * a b c
 *   d
 * e f g
 *
 * Write a function to find the maximum hourglass sum in the array.
 *
 * Topics: Array Manipulation, 2D Arrays
 * Recommended Approach: Use a sliding window technique to find the maximum hourglass sum.
 */
var hourglassSum = function (arr) {
  // Set initial maxSum to -Infinity to account for all-negative hourglasses
  var maxSum = -Infinity;
  for (var i = 0; i < arr.length; i++) {
    var row = arr[i];
    for (var j = 0; j < row.length; j++) {
      // Check if we can form an hourglass starting at (i, j)
      if (i + 2 < arr.length && j + 2 < row.length) {
        // Calculate the hourglass sum
        var top_1 = row[j] + row[j + 1] + row[j + 2];
        var mid = arr[i + 1][j + 1];
        var bottom = arr[i + 2][j] + arr[i + 2][j + 1] + arr[i + 2][j + 2];
        var hourglassSum_1 = top_1 + mid + bottom;
        console.log(row[j], row[j + 1], row[j + 2]);
        console.log(' ', arr[i + 1][j + 1], ' ');
        console.log(arr[i + 2][j], arr[i + 2][j + 1], arr[i + 2][j + 2]);
        maxSum = Math.max(maxSum, hourglassSum_1);
      }
    }
  }
  return maxSum;
};
console.log(
  hourglassSum([
    [1, 2, 3, 0, 0, 0],
    [0, 0, 0, 4, 5, 6],
    [0, 0, 0, 0, 0, 0],
    [7, 8, 9, 0, 0, 0],
    [0, 0, 0, 10, 11, 12],
    [0, 0, 0, 0, 0, 0]
  ])
); // Expected output: 35
// console.log(
//   hourglassSum([
//     [-9, -9, -9, 1, 1, 1],
//     [0, -9, 0, 4, 3, 2],
//     [-9, -9, -9, 1, 2, 3],
//     [0, 0, 8, 6, 6, 0],
//     [0, 0, 0, -2, 0, 0],
//     [0, 0, 1, 2, 4, 0]
//   ])
// ); // Expected output: 28
