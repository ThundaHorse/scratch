/**
 * Jesse loves cookies and wants the sweetness of some cookies to be greater than the value k.
 * To do this, two cookies with the least sweetness are repeatedly mixed.
 * The process continues until the sweetness of the cookie with the least sweetness is greater than k.
 *
 * The formula for mixing two cookies with sweetness a and b is:
 * sweetness = (1 x least sweet + 2 x second least sweet)
 *
 * Given the sweetness of a number of cookies, determine the minimum number of operations required. If not possible return -1
 */

// Maintains heap by moving elements down (min-heap) with fewer swaps
const heapDown = (heap: number[], index: number): void => {
  const n = heap.length;
  const half = n >>> 1; // nodes with at least one child are < half
  const value = heap[index];

  while (index < half) {
    let left = (index << 1) + 1;
    const right = left + 1;

    // choose smaller child
    let smallest = right < n && heap[right] < heap[left] ? right : left;
    const childVal = heap[smallest];

    if (childVal >= value) break;

    // move child up
    heap[index] = childVal;
    index = smallest;
  }

  heap[index] = value;
};

// Maintains heap by moving elements up (min-heap) with fewer swaps
const heapUp = (heap: number[], index: number): void => {
  const value = heap[index];
  while (index > 0) {
    // Basically dividing index - 1 by 2
    const parentIdx = (index - 1) >>> 1;
    const parentVal = heap[parentIdx];
    if (parentVal <= value) break;
    // move parent down
    heap[index] = parentVal;
    index = parentIdx;
  }
  heap[index] = value;
};

const pushMin = (heap: number[], val: number): void => {
  heap.push(val);
  heapUp(heap, heap.length - 1);
};

const removeMin = (heap: number[]): number | undefined => {
  const n = heap.length;
  if (n === 0) return undefined;
  const min = heap[0];
  const last = heap.pop()!;
  if (n > 1) {
    heap[0] = last;
    heapDown(heap, 0);
  }
  return min;
};

/**
 * Build a min-heap in O(n)
 * Start from the last non-leaf and sift down. This is cheaper than pushing each element one by one.
 */
const buildMinHeap = (heap: number[]): void => {
  for (let i = (heap.length >>> 1) - 1; i >= 0; i--) heapDown(heap, i);
};

const cookies = (k: number, A: number[]): number => {
  if (A.length === 0) return -1;

  let operations: number = 0;
  const minHeap: number[] = A.slice();
  buildMinHeap(minHeap);

  while (minHeap.length >= 2 && minHeap[0] < k) {
    const leastSweet: number = removeMin(minHeap)!;
    const secondLeast: number = removeMin(minHeap)!;

    const newSweet = leastSweet + 2 * secondLeast;
    pushMin(minHeap, newSweet);
    operations++;
  }

  return minHeap.length > 0 && minHeap[0] >= k ? operations : -1;
};

console.log(cookies(9, [2, 7, 3, 6, 4, 6])); // 4
// Smallest values 2, 3
// Remove 2, 3 -> 2 + 2 x 3 = 8 -> [8, 7, 6, 4, 6]
// 4, 6 -> 4 + 6 x 2 = 16 -> [16, 8, 7, 6]
// Remove 6, 7 -> 6 + 2 x 7 = 20 -> [20, 16, 8]
// Remove 8, 6 -> 7 + 2 x 8 = 23 -> [23, 20, 16]

// console.log(cookies(7, [1, 2, 3, 9, 10, 12])); // 2
// Remove 1, 2 -> 1 x 1 + 2 x 2 = 5 -> [3, 5, 9, 10, 12]
// Remove 3, 5 -> 3 x 1 + 5 x 2 = 13 -> [9, 10, 12, 13]
