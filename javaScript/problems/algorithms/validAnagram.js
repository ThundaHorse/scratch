/*
  An anagram is a string that contains the exact same characters as another string, but the order of the characters can be different.
*/

const letterHashBuilder = (str) => {
  const charMap = new Map();

  for (const char of str) {
    const lowerChar = char.toLowerCase();

    if (/[a-z]/.test(lowerChar)) {
      charMap.has(lowerChar)
        ? charMap.set(lowerChar, charMap.get(lowerChar) + 1)
        : charMap.set(lowerChar, 1);
    }
  }

  return charMap;
};

const isAnagram = (s, t) => {
  if (s.length !== t.length) return false;

  let sMap = letterHashBuilder(s);
  let tMap = letterHashBuilder(t);

  for (const [key, value] of sMap) {
    if (!tMap.has(key) || tMap.get(key) !== value) return false;
  }

  return true;
};

console.log(isAnagram('racecar', 'carrace')); // true
console.log(isAnagram('jar', 'jam')); // false
