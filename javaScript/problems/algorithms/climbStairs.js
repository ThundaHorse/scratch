/**
 * You are given an integer n representing the number of steps to reach the top of a staircase.
 * You can climb with either 1 or 2 steps at a time.
 *
 * Return the number of distinct ways to climb to the top of the staircase.
 */

// Recursion
const climbStairsRecusive = (n) => {
  const dfs = (i) => {
    if (i >= n) return i === n;
    return dfs(i + 1) + dfs(i + 2);
  };

  return dfs(0);
};

// Bottom Up
const climbStairs = (n) => {
  // Base case
  if (n <= 2) return n;

  let dp = new Array(n + 1).fill(0);
  dp[1] = 1;
  dp[2] = 2;

  for (let i = 3; i <= n; i++) {
    console.log(i);
    dp[i] = dp[i - 1] + dp[i - 2];
  }

  return dp[n];
};

console.log(climbStairs(2)); // 2
// 1 + 1
// 2 = 2

console.log(climbStairs(3)); // 3
// 1 + 1 + 1
// 1 + 2
// 2 + 1
