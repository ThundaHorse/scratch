/**
 * [Prompt]: Design a class to find the kth largest integer in a stream of values, including duplicates.
 *  E.g. the 2nd largest from [1, 2, 3, 3] is 3. The stream is not necessarily sorted.
 *
 * It should implement:
 * constructor(int k, int[] nums) Initializes the object given an integer k and the stream of integers nums.
 * int add(int val) Adds the integer val to the stream and returns the kth largest integer in the stream.
 *
 * [Topics]: Design, Data Stream, Priority Queue
 * [Optimal Space Complexity]: O(k)
 * [Optimal Time Complexity]: O(log k)
 */

class KthLargest {
  k: number;
  nums: number[];
  private compare: (a: number, b: number) => number;

  constructor(k: number, nums: number[]) {
    this.k = k;
    this.nums = nums;
    this.compare = (a, b) => a - b;
    this.buildHeap(this.nums);
  }

  extractMin(): number | undefined {
    if (this.nums.length === 0) return undefined;
    if (this.nums.length === 1) return this.nums.pop();

    const min = this.nums[0];
    this.nums[0] = this.nums.pop()!;
    this.heapifyDown(0);

    return min;
  }

  getSorted(): number[] {
    const originalNums = [...this.nums];
    const sorted: number[] = [];

    while (this.nums.length > 0) {
      let extracted = this.extractMin()!;

      sorted.push(extracted);
    }

    this.nums = originalNums;
    return sorted;
  }

  add(val: number): number {
    this.nums.push(val);
    this.heapifyUp(this.nums.length - 1);

    let sorted = this.getSorted();
    for (let i = 0; i < this.k - 1; i++) {
      sorted.pop();
    }

    return sorted.pop()!;
  }

  // Helper function to maintain the heap property
  private heapifyDown(index: number): void {
    while (true) {
      let smallest = index;
      const left = 2 * index + 1;
      const right = 2 * index + 2;

      if (
        left < this.nums.length &&
        this.compare(this.nums[left], this.nums[smallest]) < 0
      ) {
        smallest = left;
      }

      if (
        right < this.nums.length &&
        this.compare(this.nums[right], this.nums[smallest]) < 0
      ) {
        smallest = right;
      }

      if (smallest === index) break;

      [this.nums[index], this.nums[smallest]] = [
        this.nums[smallest],
        this.nums[index]
      ];
      index = smallest;
    }
  }

  // Helper function to maintain the heap property
  private heapifyUp(index: number): void {
    // Compare with parent and swap if necessary
    while (index > 0) {
      const parentIdx = Math.floor((index - 1) / 2);

      // Compare with parent and swap if necessary
      if (this.compare(this.nums[index], this.nums[parentIdx]) >= 0) break;

      // Swap with parent
      [this.nums[index], this.nums[parentIdx]] = [
        this.nums[parentIdx],
        this.nums[index]
      ];
      index = parentIdx;
    }
  }

  private buildHeap(nums: number[]): void {
    this.nums = [...nums];

    // Start from last non-leaf node
    for (let i = Math.floor(this.nums.length / 2) - 1; i >= 0; i--) {
      this.heapifyDown(i);
    }
  }
}

const kthLargest = new KthLargest(3, [1, 2, 3, 3]);
console.log(kthLargest.add(3)); // 3
console.log(kthLargest.add(5)); // 3
console.log(kthLargest.add(6)); // 3
console.log(kthLargest.add(7)); // 5
console.log(kthLargest.add(8)); // 6
console.log(kthLargest.add(4)); // 6
