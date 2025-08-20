/**
 * Lena is preparing for an important competition that is preceded by a number of sequential preliminary rounds.
 * Initially, her luck balance is 0
 * Each contest is described by L[i] and T[i]
 *
 * L[i] is the amount of luck associated with a contest. If Lena wins the contest, her luck balance will decrease by L[i]. if she loses it, her luck balance will increase by L[i]
 *
 * T[i] denotes the contest's importance rating. It's equal to 1 if the contest is important, and it's equal to 0 if it's unimportant.
 *
 * If Lena loses no more than k important contests, what is the maximum amount of luck she can have after competing in all the preliminary contests? This value may be negative.

 * The input consists of two arrays: L and T, where L[i] is the luck associated with the i-th contest and T[i] is the importance rating of the i-th contest.
 */

const luckBalance = (k, contests) => {
  let luck = 0;
  const importantContests = [];
  const contestMap = new Map();
  const unimportantMap = new Map();

  for (let i = 0; i < contests.length; i++) {
    const [L, T] = contests[i];
    if (T === 0) {
      // Always lose unimportant
      luck += L;
      unimportantMap.set(L, i);
    } else {
      importantContests.push(L);
      contestMap.set(L, i);
    }
  }

  importantContests.sort((a, b) => b - a); // descending
  for (let i = 0; i < importantContests.length; i++) {
    if (i < k) {
      luck += importantContests[i]; // Lose k important contests
      contestMap.delete(importantContests[i]);
    } else {
      luck -= importantContests[i]; // must win
      contestMap.delete(importantContests[i]);
    }
  }

  return luck;
};

console.log(
  luckBalance(2, [
    [5, 1, 4],
    [1, 1, 0]
  ])
); // 8
console.log(
  luckBalance(3, [
    [5, 1],
    [2, 1],
    [1, 1],
    [8, 1],
    [10, 0],
    [5, 0]
  ])
); // 29
