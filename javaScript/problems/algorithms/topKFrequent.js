/**
 * Given an integer array nums and an integer k, return the k most frequent elements within the array.
 * The test cases are generated such that the answer is always unique.
 * You may return the output in any order.
 *
 * You should aim for a solution with O(n) time and O(n) space,
 * where n is the size of the input array.
 */

const topKFrequent1 = (nums, k) => {
  // base case
  if (nums.length === k) return [nums[0]];

  let numHash = {};
  let output = [];

  for (let i = 0; i < nums.length; i++) {
    if (numHash[nums[i]]) {
      numHash[nums[i]] += 1;
    } else {
      numHash[nums[i]] = 1;
    }

    if (numHash[nums[i]] === k && output.length < k) {
      output.push(nums[i]);
    } else if (output.length === k) {
      return output;
    }
  }

  return [];
};

const topKFrequent = (nums, k) => {
  const count = {};
  const freq = Array.from({ length: nums.length + 1 }, () => []);

  for (const n of nums) {
    count[n] = (count[n] || 0) + 1;
  }

  for (const n in count) {
    freq[count[n]].push(Number(n));
  }

  const res = [];
  for (let i = freq.length - 1; i > 0; i--) {
    for (const n of freq[i]) {
      res.push(n);
      if (res.length === k) return res;
    }
  }
};

console.log(topKFrequent([1, 2, 2, 3, 3, 3], 2)); // [2, 3]
console.log(topKFrequent([7, 7], 1)); // [7]
console.log(topKFrequent([1], 1)); // [1]
