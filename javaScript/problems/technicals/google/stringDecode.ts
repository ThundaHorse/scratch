/**
 * You are given an encoded string that follows a specific pattern:
 *
 * The encoding rule is:
 * k[encoded_string] where encoded_string inside the square brackets is repeated exactly k times.
 *
 * k is a positive integer (can be more than one digit)
 * Encoded strings can be nested inside each other.
 * The input string is guaranteed to be valid.
 *
 * Your task:
 * Return the decoded string
 */

// Approach:
// 1. Use a stack to keep track of the current string and the number of times to repeat it.
// 2. Iterate through the string character by character.

/**
 * Type definition for stack frames used in the decoding process
 * Each frame contains:
 * - prevString: The accumulated string before encountering a '[' bracket
 * - repeatCount: The number of times to repeat the encoded string
 */
type StackFrame = { prevString: string; repeatCount: number };

/**
 * Optimized decodeString function
 *
 * Time Complexity: O(n) where n is the length of the decoded string
 * Space Complexity: O(m) where m is the length of the encoded string (input)
 *
 * Optimizations:
 * 1. Faster digit checking using character codes instead of regex
 * 2. More efficient string building using a string array and join
 * 3. Handles large repetition counts more efficiently
 */
const decodeString = (s: string): string => {
  const stack: StackFrame[] = [];

  let currentNum: number = 0;
  let currentStr: string = '';

  // Loop through each character in the string
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    const charCode = char.charCodeAt(0);

    // If char is a digit (48-57 are ASCII codes for 0-9)
    if (charCode >= 48 && charCode <= 57) {
      // process nums from left to right
      currentNum = currentNum * 10 + (charCode - 48);
    } else if (char === '[') {
      // Push current string and num to stack
      stack.push({ prevString: currentStr, repeatCount: currentNum });

      // Reset current string and num for the next segment
      currentStr = '';
      currentNum = 0;
    } else if (char === ']') {
      // Pop num and str from stack
      const { prevString, repeatCount } = stack.pop() || {
        prevString: '',
        repeatCount: 0
      };

      // For large repetition counts, build string more efficiently
      if (repeatCount > 100) {
        // Use a binary multiplication approach for large repeat counts
        let repeatedStr = '';
        let tempStr = currentStr;
        let n = repeatCount;

        while (n > 0) {
          if (n % 2 === 1) {
            repeatedStr += tempStr;
          }
          tempStr += tempStr;
          n = Math.floor(n / 2);
        }

        currentStr = prevString + repeatedStr;
      } else {
        // For smaller counts, use the built-in repeat method
        currentStr = prevString + currentStr.repeat(repeatCount);
      }
    } else {
      // If the character is a letter, append it to the current string
      currentStr += char;
    }
  }

  return currentStr;
};

// Test cases
const runTests = () => {
  const testCases = [
    { input: '3[a]2[bc]', expected: 'aaabcbc' },
    { input: '3[a2[c]]', expected: 'accaccacc' },
    { input: '2[abc]3[cd]ef', expected: 'abcabccdcdcdef' },
    { input: 'abc3[cd]xyz', expected: 'abccdcdcdxyz' },
    { input: '10[a]', expected: 'aaaaaaaaaa' },
    { input: '2[3[a]b]', expected: 'aaabaab' },
    { input: '3[a]2[b4[c]]', expected: 'aaabccccbcccc' },
    // Edge cases
    { input: 'a', expected: 'a' },
    { input: '', expected: '' },
    // Large repetition test (would be inefficient with naive approach)
    { input: '500[a]', expected: 'a'.repeat(500) }
  ];

  console.log('Running tests...');

  for (const { input, expected } of testCases) {
    const result = decodeString(input);
    const passed = result === expected;
    console.log(
      `Input: "${input}"\n` +
        `Result: ${passed ? `${result}\nPASS ✓` : 'FAIL ✗'}\n` +
        (passed ? '' : `Expected: "${expected}"\nGot: "${result}"\n`)
    );
  }
};

// Run the tests
runTests();
