/**
 * You are given two integer arrays nums1 and nums2, sorted in non-decreasing order, and two integers m and n, representing the number of elements in nums1 and nums2 respectively.
 * Merge nums1 and nums2 into a single array sorted in non-decreasing order.
 */

// nums1.length == m + n
// nums2.length == n

// Two Pointer
const mergeSort = (nums1, m, nums2, n) => {
  // Pointer 1 (nums1)
  let i = m - 1;

  // Pointer 2 (nums2)
  let j = n - 1;

  // Total length
  let k = m + n - 1;

  // While nums2 >= 0 || not empty
  while (j >= 0) {
    // i >= 0 & elem in nums1 > nums2
    if (i >= 0 && nums1[i] > nums2[j]) {
      // Replace previous last element in nums1 with previous element in nums1[0..m-1]
      nums1[k--] = nums1[i--];
    } else {
      // Replace it with nums2[0..j -1]
      nums1[k--] = nums2[j--];
    }
  }

  console.log(nums1);
};

console.log(mergeSort([1, 2, 3, 0, 0, 0], 3, [2, 5, 6], 3));
// [1,2,2,3,5,6]

/**
 * Original
 * [ 1, 2, 3, 0, 0, 0 ]
 *
 * n1, n1, n1,n1,n1, n2
 * [ 1, 2, 3, 0, 0, 6 ]
 *
 *               n2, n2
 * [ 1, 2, 3, 0, 5, 6 ]
 *
 *            n2, n2,n2
 * [ 1, 2, 3, 2, 5, 6 ]
 *
 *        n2, n1
 * [ 1, 2, 2, 3, 5, 6 ]
 */

console.log(mergeSort([1], 1, [], 0));
// // [1]

console.log(mergeSort([0], 0, [2], 1));
// [1]
