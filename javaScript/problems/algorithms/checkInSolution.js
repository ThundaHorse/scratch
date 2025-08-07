/**
 * You are given two strings s1 and s2.
 *
 * Return true if s2 contains a permutation of s1, or false otherwise
 * That means if a permutation of s1 exists as a substring of s2, then return true.
 *
 * Both strings only contain lowercase letters.
 */

const checkInclusion = (s1, s2) => {
  // s1 Char count
  let count1 = {};
  for (let c of s1) {
    count1[c] = (count1[c] || 0) + 1;
  }

  // Constraint
  let need = Object.keys(count1).length;

  // Loop through s2
  for (let i = 0; i < s2.length; i++) {
    // Temp s2 letter count
    let count2 = {};
    let cur = 0;
    for (let j = i; j < s2.length; j++) {
      let c = s2[j];
      count2[c] = (count2[c] || 0) + 1;

      if ((count1[c] || 0) < count2[c]) {
        break;
      }

      if ((count1[c] || 0) === count2[c]) {
        cur++;
      }

      // Satisfies
      if (cur === need) {
        return true;
      }
    }
  }
  return false;
};

console.log(checkInclusion('abc', 'lecabee')); // true
// console.log(checkInclusion('abc', 'lecaabee'));
