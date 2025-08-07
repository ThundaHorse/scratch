/**
 * Find the number of steps in the colatz sequence.
 *
 * The Collatz conjecture is a sequence defined as follows:
 * 1. Start with any positive integer n.
 * 2. If n is even, divide it by 2.
 * 3. If n is odd, multiply it by 3 and add 1.
 * 4. Repeat the process for the new value of n until n becomes 1.
 */

// A cache to store the results of previous computations (memoization)
const memo = new Map<number, number>();

/**
 * Recursively calculates the number of steps for a number to reach 1.
 * This is the core logic, optimized with memoization.
 */
const calculateSteps = (n: number): number => {
  // Base case: The sequence ends when n is 1.
  if (n === 1) return 0;

  // Check if the result for the current number is already in the cache.
  if (memo.has(n)) return memo.get(n)!;

  // Apply the Collatz rule and make a recursive call.
  const nextN = n % 2 === 0 ? n / 2 : 3 * n + 1;
  const steps = 1 + calculateSteps(nextN);

  // Cache the result for the current number `n` before returning.
  // This ensures that we never calculate the steps for the same number twice.
  memo.set(n, steps);

  return steps;
};

/**
 * Calculates the number of steps required for a number to reach 1 using the Collatz sequence.
 * This implementation uses a recursive approach with memoization for optimal performance.
 */
const collatzSequence = (n: number): number => {
  // 1. Input Validation: The Collatz conjecture is defined for positive integers.
  if (n <= 0) {
    throw new Error('Input must be a positive integer.');
  }

  // Recurse
  return calculateSteps(n);
};

// Example Usage:
try {
  console.log(`Steps for 10: ${collatzSequence(10)}`); // Expected: 6
  console.log(`Steps for 1: ${collatzSequence(1)}`); // Expected: 0
  console.log(`Steps for 15: ${collatzSequence(15)}`); // Expected: 17
  console.log(`Steps for 20: ${collatzSequence(20)}`); // Expected: 7
  // This second call for 10 will be much faster as it's now cached.
  console.log(`Steps for 10 (cached): ${collatzSequence(10)}`);
  // This call for 20 will also be faster because its subproblem (10) is now fully cached.
  console.log(`Steps for 20 (cached): ${collatzSequence(20)}`);
} catch (error) {
  if (error instanceof Error) {
    console.error(error.message);
  }
}
