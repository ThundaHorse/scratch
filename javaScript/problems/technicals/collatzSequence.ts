/**
 * Find the number of steps in the colatz sequence.
 *
 * The Collatz conjecture is a sequence defined as follows:
 * 1. Start with any positive integer n.
 * 2. If n is even, divide it by 2.
 * 3. If n is odd, multiply it by 3 and add 1.
 * 4. Repeat the process for the new value of n until n becomes 1.
 */

// Write a function that returns the number of steps required to reach 1 for a given positive integer n.
// The function should return the number of steps taken to reach 1.
const collatzSequence = (n: number): number => {
  // Base case: if n is 1, return 0 steps
  if (n === 1) return 0;

  // Initialize step counter
  // Start with 1 step for the initial value of n
  let steps: number = 1;

  // Loop until n becomes 1
  while (n !== 1) {
    // If n is even, divide it by 2
    if (n % 2 === 0) {
      n = n / 2;
    }
    // If n is odd, multiply it by 3 and add 1
    else {
      n = n * 3 + 1;
    }

    steps++;
  }

  return steps;
};

console.log(collatzSequence(10)); // Output: 6
console.log(collatzSequence(15)); // Output: 18
console.log(collatzSequence(20)); // Output: 8
