/**
 * The absolute difference is the positive difference between two values a and b. Given an array of integers, find the minimum absolute difference between any two elements in the array.
 */

const minimumAbsoluteDifference = (arr) => {
  if (arr.length < 2) return 0;

  const sorted = [...arr].sort((a, b) => a - b);

  let minDiff = sorted[1] - sorted[0];

  for (let i = 1; i < sorted.length - 1; i++) {
    const diff = sorted[i + 1] - sorted[i];

    if (diff < minDiff) minDiff = diff;
  }

  return minDiff;
};

console.log(minimumAbsoluteDifference([3, -7, 0])); // 3
console.log(
  minimumAbsoluteDifference([-59, -36, -13, 1, -53, -92, -2, -96, -54, 75])
); // 1
console.log(minimumAbsoluteDifference([1, -3, 71, 68, 17])); // 3
