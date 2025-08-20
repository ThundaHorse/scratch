/**
 * Given a list of toy prices and an amount to spend, determine the maximum number of gifts you can buy.
 * Each item may only be purchased once
 *
 * Topics: Greedy Algorithms
 * Recommended Approach: Sort the prices in ascending order and iterate through the list, purchasing items until the budget is exhausted.
 */

const maximumToys = (prices: number[], k: number): number => {
  // Base case
  if (prices.length === 0 || k <= 0) return 0;

  prices.sort((a, b) => a - b);

  const affordableGifts: Set<number> = new Set<number>();

  // Find index where unaffordable
  for (let i: number = 0; i < prices.length; i++) {
    if (prices[i] > k) {
      break;
    } else {
      affordableGifts.add(prices[i]);
    }
  }

  const affordableGiftsArray = Array.from(affordableGifts.values());
  const totalSpent: Map<number, number[]> = new Map<number, number[]>();
  let max: number = affordableGifts.size;

  let left: number = 0;
  let right: number = affordableGiftsArray.length - 1;

  while (left < right) {
    let tempSum: number = 0;

    if (!max || tempSum > max) {
      max = tempSum;
      totalSpent.set(max, [...affordableGiftsArray.slice(left, right + 1)]);
    }

    if (tempSum + affordableGiftsArray[left] > k) {
      right--;
    } else {
      tempSum += affordableGiftsArray[left];
      left++;
    }
  }

  console.log(totalSpent);
  return 0;
};

console.log(maximumToys([1, 12, 5, 111, 200, 1000, 10], 50)); // 4 [1, 12, 5, 10]

console.log(maximumToys([1, 2, 20, 40, 200, 100, 40, 1000000], 10000)); // 6 [1, 2, 20, 40, 100, 200]
