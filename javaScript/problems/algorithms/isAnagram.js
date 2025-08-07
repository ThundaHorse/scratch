class Solution {
  isAnagram(s, t) {
    if (s.length !== t.length) return false;

    const count = new Array(26).fill(0);

    for (let i = 0; i < s.length; i++) {
      count[s.charCodeAt(i) - 'a'.charCodeAt(0)]++;
      count[t.charCodeAt(i) - 'a'.charCodeAt(0)]--;
    }

    for (let i = 0; i < 26; i++) {
      if (count[i] !== 0) return false;
    }

    return true;
  }
}

const sol = new Solution();
console.log(sol.isAnagram('racecar', 'carrace')); // true
console.log(sol.isAnagram('hello', 'billion')); // false
console.log(sol.isAnagram('jar', 'jam')); // false
