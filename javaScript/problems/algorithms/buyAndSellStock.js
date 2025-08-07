/**
 * You are given an integer array prices where prices[i] is the price of NeetCoin on the ith day.
 * You may choose a single day to buy one NeetCoin and choose a different day in the future to sell it.
 * Return the maximum profit you can achieve.
 *
 * You may choose to not make any transactions, in which case the profit would be 0.
 */

// const maxProfit = (prices) => {
//   let max = 0;

//   for (let i = 0; i < prices.length; i++) {
//     if (i > 0 && prices[i] === prices[i - 1]) continue;

//     let profit = 0;
//     let p1 = i + 1;
//     let p2 = prices.length;

//     while (p1 < p2) {
//       profit = prices[p1] - prices[i];

//       if (profit > max) {
//         max = profit;
//       }

//       p1++;
//     }
//   }

//   return max;
// };

// Dynamic Programming
const maxProfit = (prices) => {
  let maxP = 0;
  let minBuy = prices[0];

  for (let sell of prices) {
    maxP = Math.max(maxP, sell - minBuy);
    minBuy = Math.min(minBuy, sell);
  }

  return maxP;
};

console.log(maxProfit([10, 1, 5, 6, 7, 1])); // 6
// Buy prices[1] and sell prices[4], profit = 7 - 1 = 6.

console.log(maxProfit([10, 8, 7, 5, 2])); // 0
// No profitable transactions can be made, thus the max profit is 0.

console.log(maxProfit([5, 1, 5, 6, 7, 1, 10])); // 9
// [1, 10]
