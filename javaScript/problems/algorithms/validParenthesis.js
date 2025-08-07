// ()
// []
// {}
const isValid2 = (s) => {
  // Needs to be pair
  if (s.length % 2 !== 0) return false;
  const stack = [];

  for (let i = 0; i < s.length; i++) {
    let char = s[i];
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else {
      let top = stack.pop();

      switch (char) {
        case ')':
          if (top === '(' && char === ')') break;
        case '}':
          if (top === '{' && char === '}') break;
        case ']':
          if (top === '[' && char === ']') break;
        default:
          return false;
      }
    }
  }

  return stack.length === 0;
};

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
