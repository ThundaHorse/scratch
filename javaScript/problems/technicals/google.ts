import { heights } from './inputs';

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
const minStrokes1 = (heights: number[]): number => {
  // Edge case: If all heights are 0, no strokes are needed
  if (heights.every((height) => height === 0)) return 0;

  const minPlanks: number = heights.length;
  const minHeight: number = Math.max(...heights);

  // Create 2D grid representing fence (rows = height, columns = plank positions)
  const fence: boolean[][] = Array.from({ length: heights.length }, () =>
    Array(minPlanks).fill(false)
  );

  for (let col = 0; col < heights.length; col++) {
    for (let row = 0; row < heights[col]; row++) {
      fence[row][col] = true;
    }
  }

  let total = 0;

  // Process each height level from bottom to top
  for (let row = 0; row < minHeight; row++) {
    let horSegs = 0;
    let isPrevPainted = false;

    // Count horizontal segments at this height level
    for (let col = 0; col < heights.length; col++) {
      if (fence[row][col]) {
        // If previous plank wasn't pained, new segment
        if (!isPrevPainted) {
          horSegs++;
        }

        isPrevPainted = true;
      } else {
        // If current plank isn't painted, reset previous painted state
        isPrevPainted = false;
      }
    }

    // Add the number of horizontal segments to min strokes
    total += horSegs;
  }

  return total;
};

// Recursive Approach
const minStrokes = (
  heights: number[],
  l: number = 0,
  r: number = heights.length - 1,
  base: number = 0,
  output: number[] = []
): number => {
  // Base case: empty segment
  if (l > r) return 0;

  // All vertical strokes
  let minVerticalStrokes: number = r - l + 1;

  // Find the minimum height in the current segment
  // Set to Infinity to ensure we find the minimum
  let minH: number = Infinity;
  for (let i: number = l; i <= r; i++) {
    minH = Math.min(minH, heights[i]);
  }

  // Horizontal stroke across the entire segment, then recursively solve for subsegments
  let strokes: number = minH - base;
  let i: number = l;
  output.push(i);

  // Count horizontal strokes
  while (i <= r) {
    // Skip painted planks
    if (heights[i] === minH) {
      i++;
      continue;
    }

    // Find the next segment above minH
    let j: number = i;
    // Find the end of the segment where heights are greater than minH
    while (j <= r && heights[j] > minH) j++;
    strokes += minStrokes(heights, i, j - 1, minH, output);

    // Set the next starting point
    i = j;
  }

  return Math.min(minVerticalStrokes, strokes);
};

console.log(minStrokes(heights.get(1))); // 1 All planks can be painted with one horizontal stroke.
console.log(minStrokes(heights.get(2))); // 3 Best approach is to use vertical strokes on planks 0 and 2, and a horizontal stroke on plank 1.
console.log(minStrokes(heights.get(3))); // 4 Best approach is to mix horizontal and vertical strokes.
console.log(minStrokes(heights.get(4))); // 0 Edge case: all planks are of height 0
console.log(minStrokes(heights.get(5))); // 5 Edge case: alternating heights
console.log(minStrokes(heights.get(6))); // 4 Edge case: varying heights
