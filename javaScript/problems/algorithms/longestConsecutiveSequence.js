/**
 * Given an array of integers nums, return the length of the longest consecutive sequence of elements that can be formed.
 *
 * A consecutive sequence is a sequence of elements in which each element is exactly 1 greater than the previous element.
 * The elements do not have to be consecutive in the original array.
 *
 * You must write an algorithm that runs in O(n) time.
 */

// const qSort = (nums) => {
//   if (nums.length <= 1) return nums;

//   let pivot = nums[0];
//   let left = [];
//   let right = [];

//   for (let i = 1; i < nums.length; i++) {
//     if (nums[i] < pivot) left.push(nums[i]);
//     else right.push(nums[i]);
//   }

//   return [...qSort(left), pivot, ...qSort(right)];
// };

const longestConsecutive1 = (nums) => {
  nums.sort((a, b) => a - b);

  // base case
  if (!nums.length) return 0;
  if (nums.length === 1) return 1;

  let max = 0;
  let current = 1;

  for (let i = 0; i < nums.length - 1; i++) {
    // Skip duplicate
    if (i > 0 && nums[i] === nums[i + 1]) continue;

    let next = i + 1;
    let diff = nums[next] - nums[i];

    if (diff <= 1 && nums[i] !== nums[next]) current++;
    else current = 1;

    if (current > max) {
      max = current;
    }
  }

  return max;
};

const longestConsecutive = (nums) => {
  nums.sort((a, b) => a - b);

  if (!nums.length) return 0;
  if (nums.length === 1) return 1;

  let max = 0;
  let current = 1;

  for (let i = 0; i < nums.length - 1; i++) {
    let next = i + 1;
    let diff = nums[next] - nums[i];

    // Duplicate
    if (diff <= 1 && nums[i] === nums[next]) continue;

    // Next is greater by 1
    if (diff <= 1 && nums[i] !== nums[next]) {
      current++;
    } else {
      // Reset
      current = 1;
    }

    max = Math.max(max, current);
  }

  return max;
};

console.log(longestConsecutive([2, 20, 4, 10, 3, 4, 5])); // 4
// // [2, 3, 4, 4, 5, 10, 20]
// // The longest consecutive sequence is [2, 3, 4, 5]

// console.log(longestConsecutive([0, 3, 2, 5, 4, 6, 1, 1])); // 7
// // [0, 1, 2, 3, 4, 5, 6, 7]

// console.log(longestConsecutive([0, 0]));

// console.log(longestConsecutive([0]));

// console.log(longestConsecutive([]));

console.log(longestConsecutive([9, 1, 4, 7, 3, -1, 0, 5, 8, -1, 6])); // 7
