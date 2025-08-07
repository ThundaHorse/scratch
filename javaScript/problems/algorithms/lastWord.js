const lastWord = (s) => {
  s = s
    .trim()
    .replace(/[^a-zA-Z]+/gm, ',')
    .split(',');
  return s[s.length - 1].length;
};

console.log(lastWord('   fly me   to   the moon  '));
console.log(lastWord('Hello World'));
