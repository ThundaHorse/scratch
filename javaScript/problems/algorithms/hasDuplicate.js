/*
  Given an integer array nums, return true if any value appears more than once in the array, otherwise return false.
*/

const hasDuplicate = (nums) => {
  let numSet = new Set();

  for (let i = 0; i < nums.length; i++) {
    if (numSet.has(nums[i])) {
      return true;
    } else {
      numSet.add(nums[i]);
    }
  }

  return false;
};

console.log(hasDuplicate([1, 2, 3, 3])); // true
console.log(hasDuplicate([1, 2, 3, 4])); // false
