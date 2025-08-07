/**
 * Given an array of integers nums and an integer target
 * return the indices i and j such that
 * nums[i] + nums[j] == target and i != j
 */

// Two passes
// const twoSum = (nums, target) => {
//   let numHash = {};

//   nums.forEach((num, index) => {
//     numHash[num] = index;
//   });

//   for (let i = 0; i < nums.length; i++) {
//     let difference = target - nums[i];

//     if (numHash[difference] && i !== numHash[difference]) {
//       return [i, numHash[difference]];
//     }
//   }
// };

// One Pass
// const twoSum = (nums, target) => {
//   const map = new Map();

//   for (let i = 0; i < nums.length; i++) {
//     const diff = target - nums[i];

//     if (map.has(diff)) {
//       return [map.get(diff), i];
//     }

//     map.set(nums[i], i);
//   }

//   return [];
// };

const twoSum = (nums, target) => {
  // nums.sort((a, b) => a - b);

  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let sum = nums[left] + nums[right];
    if (sum > target) right--;
    else if (sum < target) left++;
    else return [left, right];
  }
};

// console.log(twoSum([3, 4, 5, 6], 7)); // [0, 1]
// console.log(twoSum([4, 5, 6], 10)); // [0, 2]
// console.log(twoSum([5, 5], 10)); // [0, 1]
console.log(twoSum([-1, -2, -3, -4, -5], -8)); // [2, 4]
console.log(twoSum([-10, -1, -18, -19], -19)); // [1, 2]
// console.log(twoSum([1, 3, 4, 2], 6)); // [2, 3]
