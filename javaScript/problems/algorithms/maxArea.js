/**
 * TWO-POINTER
 */

function maxArea(heights) {
  let left = 0;
  let right = heights.length - 1;
  let res = 0;

  while (left < right) {
    // Formula given
    const area = Math.min(heights[left], heights[right]) * (right - left);

    res = Math.max(res, area);

    if (heights[left] <= heights[right]) left++;
    else right--;
  }

  return res;
}

console.log(maxArea([1, 7, 2, 5, 4, 7, 3, 6])); // 36
// 7-----6
// 6-----6
// 6 * 6 = 36
