/**
 * Given an array of strings strs, group all anagrams together into sublists.
 * An anagram is a string that contains the exact same characters as another string, but the order of the characters can be different.
 * You may return the output in any order.
 */

/**
 *
 * Make a letter count map of each word, take the first element, and then iterate over the rest and compare the maps
 * If there's a match, push those to an array and push to output, skip to where we left off, repeat
 */

// Sorting
const groupAnagrams1 = (strs) => {
  const res = {};
  for (let s of strs) {
    const sortedS = s.split('').sort().join('');
    if (!res[sortedS]) {
      res[sortedS] = [];
    }
    res[sortedS].push(s);
  }
  return Object.values(res);
};

// Hash table
const groupAnagrams = (strs) => {
  const res = {};

  // Iterate over strings
  for (let s of strs) {
    // Empty array O(1) alphabet
    const count = new Array(26).fill(0);

    // Characters
    for (let c of s) {
      // count the frequency of each character in a string
      count[c.charCodeAt(0) - 'a'.charCodeAt(0)] += 1;
    }

    const key = count.join(',');

    // Not included
    if (!res[key]) {
      res[key] = [];
    }

    // Push anagrams
    res[key].push(s);
  }

  return Object.values(res);
};

console.log(groupAnagrams(['act', 'pots', 'tops', 'cat', 'stop', 'hat'])); // [["hat"],["act", "cat"],["stop", "pots", "tops"]]

// console.log(groupAnagrams(['x']));

// console.log(groupAnagrams(['']));
