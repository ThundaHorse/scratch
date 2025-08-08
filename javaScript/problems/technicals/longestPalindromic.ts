/**
 * Prompt:
 * Given a string s, find the longest palindromic substring in s.
 * Can contain letters and numbers
 */

/**
 * Finds the longest palindromic substring in a string using Manacher's algorithm.
 *
 * Time Complexity: O(n) - Linear time complexity where n is the length of the string.
 * Space Complexity: O(n) - Additional space needed for the P array and transformed string.
 *
 * Manacher's algorithm is chosen because it provides the optimal time complexity of O(n),
 * compared to other approaches:
 * - Brute Force: O(n³) time, O(1) space
 * - Dynamic Programming: O(n²) time, O(n²) space
 * - Expand Around Center: O(n²) time, O(1) space
 *
 * The algorithm works by using previously computed palindrome information to avoid
 * redundant comparisons, utilizing symmetry properties of palindromes.
 * Topics: Manacher's Algorithm, String Manipulation, Dynamic Programming
 */
const longestPalindrome = (s: string): string => {
  if (!s || s.length === 0) return '';
  if (s.length === 1) return s;

  // Step 1: Transform the string to handle both odd and even length palindromes
  // Insert special characters (e.g., '#') between each character and at boundaries
  // Example: "abc" -> "^#a#b#c#$"
  const T: string = '^' + s.split('').join('#') + '#$';
  const n: number = T.length;

  // Step 2: Create array P where P[i] represents the radius of the palindrome centered at i
  const P: number[] = new Array(n).fill(0);
  // Variables to track the center and right boundary of the current palindrome
  let center: number = 0;
  let rightBoundary: number = 0;

  // Step 3: Core algorithm - calculate palindrome radii for each position
  for (let i = 1; i < n - 1; i++) {
    // If i is within the right boundary, use the mirror property to set initial radius
    if (rightBoundary > i) {
      // The mirror position of i with respect to center
      const mirror: number = 2 * center - i;
      // Use the minimum of the mirror's radius and distance to boundary
      P[i] = Math.min(rightBoundary - i, P[mirror]);
    }

    // Step 4: Attempt to expand the palindrome centered at position i
    while (T[i + (1 + P[i])] === T[i - (1 + P[i])]) {
      P[i]++;
    }

    // Step 5: Update center and rightBoundary if the current palindrome extends beyond
    if (i + P[i] > rightBoundary) {
      center = i;
      rightBoundary = i + P[i];
    }
  }

  // Step 6: Find the position with the maximum radius
  let maxLength: number = 0;
  let centerIndex: number = 0;

  for (let i = 1; i < n - 1; i++) {
    if (P[i] > maxLength) {
      maxLength = P[i];
      centerIndex = i;
    }
  }

  // Step 7: Extract the longest palindromic substring
  // Calculate start position in the original string and return the substring
  const start: number = Math.floor((centerIndex - maxLength) / 2);
  return s.substring(start, start + maxLength);
};

console.log(longestPalindrome('babad')); // 'bab' or 'aba'
// console.log(longestPalindrome('cbbd')); //'bb'
// console.log(longestPalindrome('a')); // 'a'
// console.log(longestPalindrome('ac')); // 'a' or 'c'
// console.log(longestPalindrome('racecar')); // 'racecar'

// // Edge cases
// console.log(longestPalindrome('')); // ''
// console.log(longestPalindrome('a')); // 'a'
// console.log(longestPalindrome('ab')); // 'a' or 'b'
// console.log(longestPalindrome('abc')); // 'a' or 'b' or 'c'
// console.log(longestPalindrome('aaaa')); // 'aaaa'
// console.log(longestPalindrome('fdsaasdffdsaasdf')); // 'fdsaasdffdsa'
