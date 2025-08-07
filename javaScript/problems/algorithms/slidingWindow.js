const maxSubarraySum = (nums, k) => {
  let max = 0;
  let windowSum = 0;
  let windowStart = 0;
  let sumNums = [];

  for (let windowEnd = 0; windowEnd < nums.length; windowEnd++) {
    // Add the next element to the window
    windowSum += nums[windowEnd];

    // Slide the window if it has reached size k
    if (windowEnd >= k - 1) {
      // Update max sum
      max = Math.max(max, windowSum);

      // Subtract the element leaving the window
      windowSum -= nums[windowStart];

      // Slide the window forward
      windowStart++;
    }
  }

  return max;
};

const input = [2, 1, 5, 1, 3, 2];
console.log(maxSubarraySum(input, 3)); // 9 [5, 1,3]
