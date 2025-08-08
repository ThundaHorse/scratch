/**
 * [Prompt]: Given a string s, split s into substrings where every substring is a palindrome. Return all possible lists of palindromic substrings
 *
 * [Topics]: Backtracking, String Manipulation
 * [Optimal Approach]: Backtracking and Dynamic Programming
 * [Optimal Space Complexity]: O(n) - The space complexity is mainly due to the recursion stack
 */

const isPalindrome = (s: string): boolean => {
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
};

const partition1 = (s: string): string[][] => {
  const result: string[][] = [];

  // Path to store current palindromic substrings
  const path: string[] = [];

  // Backtracking function
  const backtrack = (start: number): void => {
    // Base case: if we've reached the end of the string
    if (start === s.length) {
      // Add the current path to the result
      result.push([...path]);
      return;
    }

    // Explore all possible substrings
    for (let end = start; end < s.length; end++) {
      const substring = s.slice(start, end + 1);
      if (isPalindrome(substring)) {
        path.push(substring);

        // Continue exploring
        backtrack(end + 1);
        // Backtrack: remove the last added substring
        path.pop();
      }
    }
  };

  // Start backtracking from the first character
  backtrack(0);
  return result;
};

const partition = (s: string): string[][] => {
  const result: string[][] = [];
  const path: string[] = [];

  const backtrack = (start: number): void => {
    // Base case
    if (start === s.length) {
      result.push([...path]);
      return;
    }

    // Explore all possible substrings
    for (let end = start; end < s.length; end++) {
      const substr = s.slice(start, end - start + 1);

      if (isPalindrome(substr)) {
        // Dynamically add the current substring to the path
        path.push(substr);
        // Continue exploring
        backtrack(end + 1);
        // Remove the last added substring and backtrack
        path.pop();
      }
    }
  };

  // Start backtracking from the first character
  backtrack(0);
  return result;
};

console.log(partition('aab')); // [['a', 'a', 'b'], ['aa', 'b']]

// Test with a longer palindrome
console.log(partition('racecar')); // [['r', 'a', 'c', 'e', 'c', 'a', 'r'], ['r', 'aceca', 'r'], ['racecar']]
// Edge case with a single character
console.log(partition('x')); // [['x']]
