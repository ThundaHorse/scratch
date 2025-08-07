/**
 * Given an array of integers numbers that is sorted in non-decreasing order.
 * Return the indices (1-indexed) of two numbers, [index1, index2], such that they add up to a given target number target and index1 < index2. Note that index1 and
 * index2 cannot be equal, therefore you may not use the same element twice.
 *
 * There will always be exactly one valid solution.
 * Your solution must use O(1) additional space.
 */

const twoSum2 = (numbers, target) => {
  // Two pointers
  let start = 0,
    end = numbers.length - 1;

  // Iterate once to achieve O(n)
  for (let i = 0; i < numbers.length; i++) {
    // Happy Path, return the two
    if (numbers[start] + numbers[end] === target) return [start + 1, end + 1];
    // If the sum of the two is less, increase start
    else if (numbers[start] + numbers[end] < target) start++;
    // Else sum is higher than target, end is the max element, decrease
    else end--;
  }

  return [];
};

const twoSum = (numbers, target) => {
  let start = 0;
  let end = numbers.length - 1;

  for (let i = 0; i < numbers.length; i++) {
    if (numbers[start] + numbers[end] === target) return [start + 1, end + 1];
    else if (numbers[start] + numbers[end] < target) start++;
    else end--;
  }

  return [];
};

console.log(twoSum([1, 2, 3, 4], 3)); // [1, 2]
