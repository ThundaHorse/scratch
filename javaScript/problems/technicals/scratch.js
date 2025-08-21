/**
 * You are given an array of integers nums, where nums[i] represents the maximum length of a jump towards the right from index i. For example, if you are at nums[i], you can jump to any index i + j where:
 *
 * j <= nums[i]
 * i + j < nums.length
 * You are initially positioned at nums[0].
 *
 * Return the minimum number of jumps to reach the last position in the array (index nums.length - 1).
 * You may assume there is always a valid answer.
 *
 * Topics: Greedy, Array
 * Recommended: Try to solve it using a greedy approach first, then optimize it.
 */
var jumps = function (nums) {
    // Initialize variables to track the number of jumps, the current end of the jump, and the farthest point that can be reached.
    var totalJumps = 0;
    var currentEnd = 0;
    var farthest = 0;
    // Iterate through the array, stopping before the last element.
    for (var i = 0; i < nums.length - 1; i++) {
        // Update the farthest point that can be reached.
        farthest = Math.max(farthest, i + nums[i]); // Calculate the farthest point from the current index.
        // Constraints:
        // j <= nums[i]
        // i + j < nums.length
        if (i === currentEnd) {
            totalJumps++;
            currentEnd = farthest;
        }
    }
    return totalJumps;
};
console.log(jumps([2, 4, 1, 1, 1, 1])); // 2
console.log(jumps([2, 1, 2, 1, 0])); // 2
