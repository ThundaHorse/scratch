const encode = (strs) => {
  let res = '';
  for (let s of strs) {
    res += s.length + '#' + s;
  }

  return res;
};

const decode = (str) => {
  let res = [];
  let i = 0;

  while (i < str.length) {
    let j = i;

    while (str[j] !== '#') j++;

    let length = parseInt(str.slice(i, j));
    i = j + 1;
    j = i + length;
    res.push(str.slice(i, j));
    i = j;
  }

  return res;
};

const input = ['need', 'code', 'love', 'you'];
const encoded = encode(input);
// console.log(encoded); // "4#need4#code4#love3#you"

const decoded = decode(encoded);
console.log(decoded); // ['need', 'code', 'love', 'you']
