/**
 *
 * Approach: Iterates through array and for each number, considers it as a potential end of atriplet
 *
 * Uses 2 maps:
 * 1. Map to count potential pairs (x, y)
 * 2. Map to count potential triplets (x, y, z)
 */

const countTriplets = (arr, r) => {
  if (arr.length < 3) return 0;

  const pairMap = new Map();
  const tripMap = new Map();

  let count = 0;

  for (const num of arr) {
    // If num exists in tripMap, we found tripMap.get(num) # of triplets
    // These triplets are awaiting num to be complete
    if (tripMap.has(num)) count += tripMap.get(num);

    // If num exists in pairMap, # of pairs found
    // Pairs are of the form (a, num), awaiting 3rd element num/r
    // Update tripMap with count of newly formed potential triplets
    if (pairMap.has(num))
      tripMap.set(num * r, (tripMap.get(num * r) || 0) + pairMap.get(num));

    // Update pairMap with count of newly formed potential pairs
    pairMap.set(num, (pairMap.get(num) || 0) + 1);
  }

  return count;
};

console.log(countTriplets([1, 2, 2, 3, 4], 2)); // 2 [0, 1, 3], [0, 2, 3]
console.log(countTriplets([1, 3, 9, 9, 27, 81], 3)); // 6 [0, 1, 2], [0, 1, 3], [1, 2, 4], [1, 3, 4], [2, 4, 5], [3, 4, 5]
