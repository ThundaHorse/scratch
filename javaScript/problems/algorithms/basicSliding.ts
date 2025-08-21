/**
 *
 * Find the minimum length of a continuous subarray whose sum is greater than or equal to num
 */

const minSubArrayLength = (nums: number[], num: number): number => {
  let minLen: number = Infinity;
  let winSum: number = 0;
  let start: number = 0;

  for (let end: number = 0; end < nums.length; end++) {
    winSum += nums[end];

    while (winSum >= num) {
      // Expand the window
      minLen = Math.min(minLen, end - start + 1);

      winSum -= nums[start];
      start++;
    }
  }

  return minLen === Infinity ? 0 : minLen;
};

console.log(minSubArrayLength([1, 2, 3, 4, 5], 15)); // 1 [4]
