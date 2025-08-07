/**
 * Given a string s, split s into substrings where every substring is a palindrome.
 * Return all possible lists of palindromic substrings.
 *
 * You may return the solution in any order.
 */

const partition = (s) => {
  const n = s.length;
  const res = [];
  const path = [];
  // dp[i][j] will be true if the substring from index i to j is a palindrome.
  const dp = Array(n)
    .fill(null)
    .map(() => Array(n).fill(false));

  // Build the DP table to pre-calculate all palindromic substrings
  for (let i = n - 1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      // isPalindrome check
      // The `j - i < 2` condition handles base cases (single and two-character strings).
      if (s[i] === s[j] && (j - i < 2 || dp[i + 1][j - 1])) {
        dp[i][j] = true;
      }
    }
  }

  const backtrack = (i) => {
    if (i >= n) {
      res.push([...path]);
      return;
    }

    for (let j = i; j < n; j++) {
      // This is now an O(1) lookup, which is the core optimization.
      if (dp[i][j]) {
        path.push(s.slice(i, j + 1));
        backtrack(j + 1);
        path.pop();
      }
    }
  };

  backtrack(0);
  return res;
};

console.log(partition('aab')); // [['a', 'a', 'b'], ['aa', 'b']]
// console.log(partition('a')); // [a]
// console.log(partition('aaa'));
// [
//   ["a","a","a"],
//   ["aa","a"],
//   ["a","aa"],
//   ["aaa"]
// ]
