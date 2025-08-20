const isAnagram = (a, b) => {
  // Object, not Map because order doesn't necessarily matter
  const mapA = {};
  const mapB = {};

  // Count occurrences of each character in string a
  for (const char of a) {
    mapA[char] = (mapA[char] || 0) + 1;
  }

  // Count occurrences of each character in string b
  for (const char of b) {
    mapB[char] = (mapB[char] || 0) + 1;
  }

  let deletions = 0;

  const allChars = new Set([...Object.keys(mapA), ...Object.keys(mapB)]);

  for (const char of allChars) {
    const countA = mapA[char] || 0;
    const countB = mapB[char] || 0;

    // Count the number of deletions for this character
    deletions += Math.abs(countA - countB);
  }

  return deletions;
};

console.log(isAnagram('cde', 'abc')); // 4
console.log(isAnagram('cde', 'cde')); // 0
console.log(isAnagram('cde', 'dec')); // 0
console.log(isAnagram('cde', 'edc')); // 0
console.log(isAnagram('cde', 'edcb')); // 1
console.log(isAnagram('cde', 'edcba')); // 2
console.log(isAnagram('cde', 'edcbac')); // 3
console.log(isAnagram('cde', 'edcbacd')); // 4
console.log(isAnagram('cde', 'edcbacde')); // 5
console.log(isAnagram('cde', 'edcbacdef')); // 6
