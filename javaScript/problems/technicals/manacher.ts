/**
 * Manacher's algorithm to find the longest palindromic substring.
 *
 * @returns The longest palindromic substring.
 *
 * [Topics]: String Manipulation, Dynamic Programming
 * [Optimal Approach]: Expand Around Center and Manacher's Algorithm
 */

function manacher(s: string): string {
  if (s.length === 0) return '';

  // Preprocess: insert '#' between characters to handle even-length palindromes
  const processed = '#' + s.split('').join('#') + '#';
  const n = processed.length;
  const P = new Array(n).fill(0); // P[i] = radius of palindrome centered at i
  let center = 0; // center of current palindrome
  let right = 0; // right boundary of current palindrome

  let maxLen = 0;
  let centerIndex = 0;

  for (let i = 0; i < n; i++) {
    // Mirror of i with respect to center
    const mirror = 2 * center - i;

    // If i is within the right boundary, we can use previously computed values
    if (i < right) {
      P[i] = Math.min(right - i, P[mirror]);
    }

    // Try to expand palindrome centered at i
    try {
      while (
        i + P[i] + 1 < n &&
        i - P[i] - 1 >= 0 &&
        processed[i + P[i] + 1] === processed[i - P[i] - 1]
      ) {
        P[i]++;
      }
    } catch (e) {
      // Handle boundary conditions
    }

    // If palindrome centered at i extends past right, adjust center and right
    if (i + P[i] > right) {
      center = i;
      right = i + P[i];
    }

    // Update maximum length palindrome found so far
    if (P[i] > maxLen) {
      maxLen = P[i];
      centerIndex = i;
    }
  }

  // Extract the longest palindrome from original string
  const start = (centerIndex - maxLen) / 2;
  return s.substring(start, start + maxLen);
}

// Example usage
console.log(manacher('babad')); // "bab" or "aba"
// console.log(manacher('cbbd')); // "bb"
// console.log(manacher('racecar')); // "racecar"
// console.log(manacher('abcdef')); // "a" (any single character)
