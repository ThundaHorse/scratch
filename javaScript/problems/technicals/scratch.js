/**
 * Given a list of toy prices and an amount to spend, determine the maximum number of gifts you can buy.
 * Each item may only be purchased once
 *
 * Topics: Greedy Algorithms
 * Recommended Approach: Sort the prices in ascending order and iterate through the list, purchasing items until the budget is exhausted.
 */
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var maximumToys = function (prices, k) {
    // Base case
    if (prices.length === 0 || k <= 0)
        return 0;
    prices.sort(function (a, b) { return a - b; });
    var affordableGifts = new Set();
    // Find index where unaffordable
    for (var i = 0; i < prices.length; i++) {
        if (prices[i] > k) {
            break;
        }
        else {
            affordableGifts.add(prices[i]);
        }
    }
    var affordableGiftsArray = Array.from(affordableGifts.values());
    var totalSpent = new Map();
    var max = affordableGifts.size;
    var left = 0;
    var right = affordableGiftsArray.length - 1;
    while (left < right) {
        var tempSum = 0;
        if (!max || tempSum > max) {
            max = tempSum;
            totalSpent.set(max, __spreadArray([], affordableGiftsArray.slice(left, right + 1), true));
        }
        if (tempSum + affordableGiftsArray[left] > k) {
            right--;
        }
        else {
            tempSum += affordableGiftsArray[left];
            left++;
        }
    }
    console.log(totalSpent);
    return 0;
};
console.log(maximumToys([1, 12, 5, 111, 200, 1000, 10], 50)); // 4 [1, 12, 5, 10]
console.log(maximumToys([1, 2, 20, 40, 200, 100, 40, 1000000], 10000)); // 6 [1, 2, 20, 40, 100, 200]
