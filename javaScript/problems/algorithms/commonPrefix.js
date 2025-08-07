/**
 * Write a function to find the longest common prefix string amongst an array of strings.
 * If there is no common prefix, return an empty string "".
 */

const longestCommonPrefix = (strs) => {
  if (!strs.length) return '';

  // Sort alphabetically
  strs.sort();

  // Grab first
  let first = strs[0];

  // Grab last
  let last = strs[strs.length - 1];
  let res = '';

  for (let i = 0; i < first.length; i++) {
    // After sorting, check each char, if present in both, common
    if (first[i] === last[i]) res += first[i];
    else break;
  }

  return res;
};

console.log(longestCommonPrefix(['flower', 'flow', 'flight', 'flawerpower'])); // fl
console.log(longestCommonPrefix(['dog', 'racecar', 'car'])); // ''
