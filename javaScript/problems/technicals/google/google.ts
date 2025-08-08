import { heights } from './inputs.js';

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

// const minStrokes2 = (heights: number[]): number => {
//   //
// };

console.log(minStrokes(heights.get(1))); // 1 All planks can be painted with one horizontal stroke.
console.log(minStrokes(heights.get(2))); // 3 Best approach is to use vertical strokes on planks 0 and 2, and a horizontal stroke on plank 1.
console.log(minStrokes(heights.get(3))); // 4 Best approach is to mix horizontal and vertical strokes.
console.log(minStrokes(heights.get(4))); // 0 Edge case: all planks are of height 0
console.log(minStrokes(heights.get(5))); // 5 Edge case: alternating heights
console.log(minStrokes(heights.get(6))); // 4 Edge case: varying heights
