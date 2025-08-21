/**
 *
 * Find the minimum length of a continuous subarray whose sum is greater than or equal to num
 */
var minSubArrayLength = function (nums, num) {
    var minLen = Infinity;
    var winSum = 0;
    var start = 0;
    for (var end = 0; end < nums.length; end++) {
        winSum += nums[end];
        console.log(start);
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
