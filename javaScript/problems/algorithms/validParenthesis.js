const isValid = (s) => {
  if (s.length % 2 !== 0) return false;

  const stack = [];

  for (let i = 0; i < s.length; i++) {
    let char = s[i];
    if (char === '(' || char === '[' || char === '{') {
      stack.push(char);
    } else {
      let current = stack.pop();

      switch (char) {
        case ')':
          if (current === '(' && char === ')') break;
        case '}':
          if (current === '{' && char === '}') break;
        case ']':
          if (current === '[' && char === ']') break;
        default:
          return false;
      }
    }
  }

  return stack.length === 0;
};

console.log(isValid('()')); // true
console.log(isValid('()[]{}')); // true
console.log(isValid('(]')); // false
console.log(isValid('([{[]}])')); // true
console.log(isValid('((')); // false
console.log(isValid('({{{{}}}))')); // false

/**
 * You are given a string s consisting of lowercase english characters, as well as opening and closing parentheses
 * Remove the minimum number of parentheses so that the resulting string is valid
 * A parentheses string is valid if all of the following conditions are met:
 * - It is the empty string, contains only lowercase characters, or
 * - It can be written as AB (A concatenated with B), where A and B are valid strings or
 * - It can be written as (A), where A is a valid string
 *
 * Topic: String Manipulation
 * Recommended Approach: Use a stack to keep track of the indices of opening parentheses and the positions of invalid closing parentheses
 */

const minRemoveToMakeValid = (s) => {
  const arr = [...s];
  const stack = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === '(') {
      stack.push(i);
    } else if (arr[i] === ')') {
      if (stack.length > 0) {
        // Found a matching opening parenthesis
        stack.pop();
      } else {
        // Found an invalid closing parenthesis
        arr[i] = '';
      }
    }
  }

  // Remove any unmatched opening parentheses
  while (stack.length) arr[stack.pop()] = '';
  return arr.join('');
};

console.log(minRemoveToMakeValid('nee(t(c)o)de)')); // 'nee(t(c)o)de'
console.log(minRemoveToMakeValid('x(y)z(')); // "x(y)z"
console.log(minRemoveToMakeValid('))()((')); // "()"
