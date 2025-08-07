/**
 * Given a string s, return true if it is a palindrome, otherwise return false.
 * A palindrome is a string that reads the same forward and backward.
 * It is also case-insensitive and ignores all non-alphanumeric characters.
 */

const isPalindrome1 = (s) => {
  // normalize
  s = s.toLowerCase().replace(/[^a-z0-9]+/gm, '');
  if (s.length <= 1) return true;

  let p1 = 0,
    p2 = s.length - 1;

  while (p1 < p2) {
    if (s[p1] !== s[p2]) {
      return false;
    }

    p1++;
    p2--;
  }

  return true;
};

const isPalindrome2 = (s) => {
  s = s.toLowerCase().replace(/[^a-z0-9]+/gm, '');

  if (s.length <= 1) return true;

  let start = 0,
    end = s.length - 1;

  while (start < end) {
    if (s[start] !== s[end]) return false;

    start++;
    end--;
  }

  return true;
};

const isPalindrome = (s) => {
  s = s.toLowerCase().replace(/[^a-z0-9]+/gm, '');

  if (s.length <= 1) return true;

  let start = 0;
  let end = s.length - 1;

  while (start < end) {
    if (s[start] !== s[end]) return false;
    start++;
    end--;
  }

  return true;
};

console.log(isPalindrome('Was it a car or a cat I saw?')); // true
console.log(isPalindrome('tab a cat')); // false
console.log(isPalindrome('.,')); // true
console.log(isPalindrome('0P')); // false
