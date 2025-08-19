function freqQuery(queries) {
  let output = [];
  const freqMap = new Map();
  const countMap = new Map();

  for (const [op, val] of queries) {
    switch (op) {
      case 1:
        const oldFreq = freqMap.get(val) || 0;
        const newFreq = oldFreq + 1;

        freqMap.set(val, newFreq);

        if (oldFreq > 0) {
          const oldCount = countMap.get(oldFreq);
          oldCount === 1
            ? countMap.delete(oldFreq)
            : countMap.set(oldFreq, oldCount - 1);
        }

        countMap.set(newFreq, (countMap.get(newFreq) || 0) + 1);
        break;
      case 2:
        const currentF = freqMap.get(val);

        if (currentF && currentF > 0) {
          const udpatedF = currentF - 1;

          udpatedF === 0 ? freqMap.delete(val) : freqMap.set(val, udpatedF);

          const currentCount = countMap.get(currentF);

          currentCount === 1
            ? countMap.delete(currentF)
            : countMap.set(currentF, currentCount - 1);
          if (udpatedF > 0)
            countMap.set(udpatedF, (countMap.get(udpatedF) || 0) + 1);
        }
        break;
      case 3:
        output.push(countMap.has(val) ? 1 : 0);
        break;
    }
  }

  return output;
}
