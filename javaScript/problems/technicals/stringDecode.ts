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

type StackFrame = { prevString: string; repeatCount: number };

const decodeString = (s: string): string => {
  const stack: StackFrame[] = [];

  let currentNum = 0;
  let currentString = '';

  // Iterate through each character in the string
  for (const char of s) {
    // If the character is a digit, add it to the current number
    if (/\d/.test(char)) {
      // If we encounter a digit, we need to build the full number
      currentNum = currentNum * 10 + parseInt(char, 10);
    } else if (char === '[') {
      // If the character is an opening bracket, push the current string and number onto the stack

      stack.push({ prevString: currentString, repeatCount: currentNum });

      // Reset current string and number for the next segment
      currentString = '';
      currentNum = 0;
    } else if (char === ']') {
      // If the character is a closing bracket, pop the number and string from the stack
      const { prevString, repeatCount } = stack.pop() || {
        prevString: '',
        repeatCount: 0
      };

      // Repeat the current string repeatCount times and concatenate it with the previous string
      currentString = prevString + currentString.repeat(repeatCount);
    } else {
      // If the character is a letter, append it to the current string
      currentString += char;
    }
  }

  return currentString;
};

// console.log(decodeString('3[a]2[bc]')); // Output: "aaabcbc"
// console.log(decodeString('3[a2[c]]')); // Output: "accaccacc"
// console.log(decodeString('2[abc]3[cd]ef')); // Output: "abcabccdcdcdef"
console.log(decodeString('abc3[cd]xyz')); // Output: "abccdcdcdxyz"
