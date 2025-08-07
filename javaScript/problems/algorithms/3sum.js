/**
 * Given an integer array nums, return all the triplets
 * [nums[i], nums[j], nums[k]]
 *
 * where nums:
 * [i] + nums[j] + nums[k] == 0,
 *
 * and the indices i, j and k are all distinct.
 *
 * The output should not contain any duplicate triplets.
 * You may return the output and the triplets in any order.
 */

/**
 * Time complexity of O(n^2) after the array has been sorted.
 * The outer loop runs in O(n) time, and for each iteration of the outer loop, the inner while loop runs in O(n) time in the worst case, leading to an overall complexity of O(n^2).
 *
 *
 * quickSort function has a space complexity of O(n) due to the additional arrays created for the left and right subarrays.
 * The recursive calls also add to the space complexity, but since the depth of recursion is O(log n) on average, the overall space complexity remains O(n).
 *
 * space complexity of O(1) for the variables used, but it also requires O(n) space for storing the results in the worst case, leading to an overall space complexity of O(n).
 */

// const quickSort = (arr) => {
//   // Base case
//   if (arr.length <= 1) {
//     return arr;
//   }

//   // Choose first element as pivot
//   let pivot = arr[0];

//   // Split it up
//   let leftArr = [];
//   let rightArr = [];

//   for (let i = 1; i < arr.length; i++) {
//     // Compare each element to the pivot and pushing it into the appropriate subarray.

//     // Fill left
//     if (arr[i] < pivot) {
//       leftArr.push(arr[i]);
//     } else {
//       // Fill right
//       rightArr.push(arr[i]);
//     }
//   }

//   // Recursively sort
//   // Concat the sorted left subarray, pivot, and sorted right subarray
//   return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
// };

// const threeSum = (nums) => {
//   const res = [];
//   nums = quickSort(nums);

//   for (let i = 0; i < nums.length; i++) {
//     // Skip duplicate numbers in i
//     if (i > 0 && nums[i] === nums[i - 1]) continue;

//     let sum = 0;
//     let left = i + 1;
//     let right = nums.length - 1;

//     while (left < right) {
//       // Calculated sum
//       sum = nums[i] + nums[left] + nums[right];

//       // If the sum is less than 0, move left up
//       if (sum < 0) {
//         console.log('lesser: ', nums[i], nums[left], nums[right]);
//         left++;
//       }
//       // If sum is greater than 0, move right down
//       else if (sum > 0) {
//         console.log('Greater: ', nums[i], nums[left], nums[right]);
//         right--;
//       }
//       // Sum is 0 & k, j, i are distinct
//       else {
//         console.log('working: ', nums[i], nums[left], nums[right]);
//         res.push([nums[i], nums[left], nums[right]]);

//         // Slide the left side up
//         while (left < right && nums[left] === nums[left + 1]) left++;

//         // Move right down
//         while (left < right && nums[right] === nums[right - 1]) right--;

//         left++;
//         right--;
//       }
//     }
//   }
//   return res;
// };

function threeSum1(nums) {
  const res = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    // Skip duplicates
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    // Define pointers
    let sum = 0;
    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      sum = nums[i] + nums[left] + nums[right];

      // If sum is less than target
      if (sum < 0) {
        // Move left up
        left++;
      } else if (sum > 0) {
        // Move right down
        right--;
      } else {
        res.push([nums[i], nums[left], nums[right]]);

        // Move left pointer up to the end
        while (left < right && nums[left] === nums[left + 1]) left++;

        // Move right pointer down to the start
        while (left < right && nums[right] === nums[right - 1]) right--;

        // Move pointers
        left++;
        right--;
      }
    }
  }
  return res;
}

// Two Pointer
const threeSum2 = (nums) => {
  const res = [];
  nums.sort((a, b) => a - b);

  let sum = 0;
  let start = 0;
  let left = start + 1;
  let right = nums.length - 1;

  while (left < right) {
    sum = nums[start] + nums[left] + nums[right];
    if (sum < 0) left++;
    else if (sum > 0) right--;
    // Sum is 0 & k, j, i are distinct
    else {
      res.push([nums[start], nums[left], nums[right]]);

      // Skip duplicates
      if (nums[left] === nums[left + 1]) left++;
      if (nums[right] === nums[right - 1]) right--;

      // Move pointers
      left++;
      right--;
    }

    // Move start pointer
    start++;
  }

  return res;
};

const threeSum = (nums) => {
  const res = [];
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let sum = 0;
    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      sum = nums[i] + nums[left] + nums[right];

      if (sum < 0) left++;
      else if (sum > 0) right--;
      else {
        res.push([nums[i], nums[left], nums[right]]);

        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;

        left++;
        right--;
      }
    }
  }

  return res;
};

console.log(threeSum([-1, 0, 1, 2, -1, -4]));
// [[-1,-1,2],[-1,0,1]]

console.log(threeSum([0, 1, 1]));
// // []

console.log(threeSum([0, 0, 0]));
// // [[0, 0, 0]];
