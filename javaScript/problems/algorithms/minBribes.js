function minimumBribes(q) {
  if (!q || q.length === 0) return;
  var totalBribes = 0;
  // Check each person in the queue
  for (var currentPos = 0; currentPos < q.length; currentPos++) {
    var personId = q[currentPos];
    var originalPos = personId - 1; // 0 based index
    // Check if moved forward more than 2
    var forwardMoves = originalPos - currentPos;
    if (forwardMoves > 2) {
      console.log('Too chaotic');
      return;
    }
    // Count how many people with larger IDs are in front of this person
    // These are the people who must have bribed to get past this person
    //
    // Key insight: Person X can only be bribed by people who:
    // 1. Started behind them (have larger ID)
    // 2. Are now in front of them
    var checkFrom = Math.max(0, originalPos - 1);
    for (var j = checkFrom; j < currentPos; j++) {
      if (q[j] > personId) totalBribes++;
    }
  }
  console.log(totalBribes.toString());
}
console.log(minimumBribes([2, 1, 5, 3, 4])); // 3
console.log(minimumBribes([2, 5, 1, 3, 4])); // Too chaotic
console.log(minimumBribes([1, 2, 5, 3, 7, 8, 6, 4])); // 7
