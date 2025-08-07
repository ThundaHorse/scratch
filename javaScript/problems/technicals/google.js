/**
 * You have a fence consisting of n vertical planks, each with a certain height (given as an array of integers). You need to paint the entire fence.
 *
 * You have two ways to paint:
 *
 * Horizontal Stroke: In one stroke, you can choose a continuous segment of planks (from index l to r) and paint 1 unit of height across all those planks in that segment.
 *
 * Vertical Stroke: In one stroke, you can paint the entire height of a single plank (from bottom to top) regardless of how tall it is.
 *
 * Task: Find the minimum number of strokes needed to paint the entire fence.
 */
// First pass
// const minStrokes1 = (heights: number[]): number => {
//   // Start with the assumption that we will need at least one vertical stroke for each plank
//   let minVertStrokes = heights.length;
//   // Initialize the minimum strokes to the number of vertical strokes
//   let minStrokes: number = minVertStrokes;
//   let maxHorizStrokes: number = 0;
//   let start: number = 0;
//   // Find the maximum number of horizontal strokes needed
//   while (start < heights.length) {
//     maxHorizStrokes = Math.max(maxHorizStrokes, heights[start]);
//     start++;
//   }
//   // If the maximum horizontal strokes needed is less than the minimum vertical strokes,
//   // then we can use horizontal strokes to paint the fence more efficiently
//   if (maxHorizStrokes < minVertStrokes) {
//     return maxHorizStrokes;
//   }
//   // If the minimum vertical strokes is less than the maximum horizontal strokes,
//   // then we can use vertical strokes to paint the fence more efficiently
//   if (minVertStrokes < maxHorizStrokes) {
//     return minVertStrokes;
//   }
//   // The minimum strokes needed is the minimum of vertical and horizontal strokes
//   minStrokes = Math.min(minVertStrokes, maxHorizStrokes);
//   return minStrokes;
// };
// Optimal Approach: Dynamic Programming
// For each height level, decide whether to paint horizontally or vertically
// Count the number of segments at each height level
// Sum up the min strokes needed at each height level
// High-level plan:
// 1. Process the fence level by level, starting from the bottom
// 2. At each level, determine if h or v strokes are more efficient
// 3. Accumulate the min strokes needed
var minStrokes = function (heights) {
    // Edge case: If all heights are 0, no strokes are needed
    if (heights.every(function (height) { return height === 0; }))
        return 0;
    var maxHeight = Math.max.apply(Math, heights);
    // Create 2D grid representing fence (rows = height, columns = plank positions)
    var fence = Array(maxHeight)
        .fill(0)
        .map(function () { return Array(heights.length).fill(false); });
    for (var col = 0; col < heights.length; col++) {
        for (var row = 0; row < heights[col]; row++) {
            fence[row][col] = true;
        }
    }
    console.log(fence);
    return 0;
};
var heights1 = [1, 1, 1];
var heights2 = [3, 1, 3];
var heights3 = [4, 1, 3, 2];
var heights4 = [0, 0, 0, 0]; // Edge case: all planks are of height 0
var heights5 = [5, 0, 5, 0, 5]; // Edge case: alternating heights
var heights6 = [2, 3, 1, 4]; // Edge case: varying heights
// console.log(minStrokes(heights1)); // Output: 1. All planks can be painted with one horizontal stroke.
console.log(minStrokes(heights2)); // Output: 3. Best approach is to use vertical strokes on planks 0 and 2, and a horizontal stroke on plank 1.
// // Vertical stroke on plank 0 -> [3, 0, 3]
// console.log(minStrokes(heights3)); // Output: 4. Best approach is to mix horizontal and vertical strokes.
// // // Horizontal stroke across all planks at height 1 -> [3, 0, 2, 1]
// // // Vertical stroke on plank 2 -> [3, 0, 0, 1]
// // // Horizontal stroke on planks 0 and 3 -> [2, 0, 0, 0]
// // // Vertical stroke on plank 0 -> [0, 0, 0, 0]
// console.log(minStrokes(heights4)); // Output: 0. No strokes needed since all planks are of height 0.
// console.log(minStrokes(heights5)); // Output: 3. Best approach is to use vertical strokes on planks 0, 2, and 4, and a horizontal stroke on plank 1.
// console.log(minStrokes(heights6)); // Output: 4. Best approach is to mix horizontal and vertical strokes.
// // Horizontal stroke across all planks at height 1 -> [2, 2, 1, 2]
// // Vertical stroke on plank 2 -> [2, 2, 0, 2]
// // Horizontal stroke on planks 0 and 3 -> [1, 1, 0, 1]
// // Vertical stroke on plank 0 -> [0, 1, 0, 0]
