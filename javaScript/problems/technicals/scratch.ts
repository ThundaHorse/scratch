/**
 * Given 3 arrays, a, b, and c of different sizes, find the number of distinct triplets (p, q, r) where p is an element of a, written as (p, q, r), satisfying the criteria: p <= q and q >= r.
 *
 * Function should return the number of distinct triplets that can be formd from the given arrays
 */

const triplets2 = (a: number[], b: number[], c: number[]): number => {
  let count: number = 0;

  // Base case
  if (a.length === 0 || b.length === 0 || c.length === 0) return count;

  let uniques: Set<string> = new Set();

  for (const numA of a) {
    for (const numB of b) {
      for (const numC of c) {
        if (numA <= numB && numB >= numC) {
          const triplet = `${numA},${numB},${numC}`;
          if (!uniques.has(triplet)) {
            uniques.add(triplet);
            count++;
          }
        }
      }
    }
  }

  return count;
};

const triplets = (a: number[], b: number[], c: number[]): number => {
  if (a.length === 0 || b.length === 0 || c.length === 0) return 0;

  // Sorted copies
  const sortedA: number[] = [...new Set(a)].sort((x, y) => x - y);
  const sortedC: number[] = [...new Set(c)].sort((x, y) => x - y);
  const uniqueB: number[] = [...new Set(b)];

  const countElementsLessOrEqual = (arr: number[], target: number): number => {
    let left: number = 0;
    let right: number = arr.length - 1;
    let res: number = -1;

    while (left <= right) {
      const mid: number = Math.floor((left + right) / 2);

      if (arr[mid] <= target) {
        res = mid;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }

    return res + 1;
  };

  let totalValid: number = 0;

  // For each element in B, count valid
  for (const pivot of uniqueB) {
    // Elems in A where p <= q
    const validA = countElementsLessOrEqual(sortedA, pivot);
    // Elems in C where q >= r
    const validC = countElementsLessOrEqual(sortedC, pivot);

    // Multiply counts since valid p can pair with each valid r
    totalValid += validA * validC;
  }

  return totalValid;
};

console.log(triplets([1, 3, 5], [2, 3], [1, 2, 3])); // 8 [1, 2, 1], [1, 2, 2], [1, 3, 1], [1, 3, 2], [1, 3, 3], [3, 3, 1], [3, 3, 2], [3, 3, 3]

console.log(triplets([1, 4, 5], [2, 3, 3], [1, 2, 3])); // 5 [1, 2, 1], [1, 2, 2], [1, 3, 1], [1, 3, 2], [1, 3, 3]
