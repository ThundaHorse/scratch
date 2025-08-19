var triplets = function (a, b, c) {
  var e_1, _a;
  if (a.length === 0 || b.length === 0 || c.length === 0) return 0;
  // Sorted copies
  var sortedA = __spreadArray([], __read(new Set(a)), false).sort(function (
    x,
    y
  ) {
    return x - y;
  });
  var sortedC = __spreadArray([], __read(new Set(c)), false).sort(function (
    x,
    y
  ) {
    return x - y;
  });
  var uniqueB = __spreadArray([], __read(new Set(b)), false);
  var countElementsLessOrEqual = function (arr, target) {
    var left = 0;
    var right = arr.length - 1;
    var res = -1;
    while (left <= right) {
      var mid = Math.floor((left + right) / 2);
      console.log(arr);
      if (arr[mid] <= target) {
        res = mid;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return res + 1;
  };
  var totalValid = 0;
  try {
    // For each element in B, count valid
    for (
      var uniqueB_1 = __values(uniqueB), uniqueB_1_1 = uniqueB_1.next();
      !uniqueB_1_1.done;
      uniqueB_1_1 = uniqueB_1.next()
    ) {
      var pivot = uniqueB_1_1.value;
      // Elems in A where p <= q
      var validA = countElementsLessOrEqual(sortedA, pivot);
      // Elems in C where q >= r
      var validC = countElementsLessOrEqual(sortedC, pivot);
      // Multiply counts since valid p can pair with each valid r
      totalValid += validA * validC;
    }
  } catch (e_1_1) {
    e_1 = { error: e_1_1 };
  } finally {
    try {
      if (uniqueB_1_1 && !uniqueB_1_1.done && (_a = uniqueB_1.return))
        _a.call(uniqueB_1);
    } finally {
      if (e_1) throw e_1.error;
    }
  }
  return totalValid;
};
console.log(triplets([1, 3, 5], [2, 3], [1, 2, 3])); // 8 [1, 2, 1], [1, 2, 2], [1, 3, 1], [1, 3, 2], [1, 3, 3], [3, 3, 1], [3, 3, 2], [3, 3, 3]
console.log(triplets([1, 4, 5], [2, 3, 3], [1, 2, 3])); // 5 [1, 2, 1], [1, 2, 2], [1, 3, 1], [1, 3, 2], [1, 3, 3]
