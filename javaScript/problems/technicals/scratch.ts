/**
 * Implement SetOfStacks, should be composed of several stacks and should create a new stack once the previous one exceedsd capacity
 *
 * push() and pop() should behave identically to a single stack (should return the same values as it would if it were a single stack)
 *
 * Follow-Up: Implement popAt(num: number) -> performs a pop() on a specific sub-stack
 *
 * Stacks use LIFO, uses the following operations:
 *
 * pop(): Remove top item from the stack
 * push(item): Add item to top of stack
 * peek(): Return the top of the stack
 * isEmpty(): Return true only if stack is empty
 *
 */

class Stack {
  private data: number[] = [];
  private type: string = '';
  private atCapacity: boolean;

  constructor(nums: number[], type: string, atCapacity: boolean) {
    this.data = nums;
    this.type = type;
    this.atCapacity = atCapacity;
    this.type === 'min' ? this.buildMinHeap() : this.buildMaxHeap();
  }

  show(): void {
    console.log(this.data);
  }

  getSize(): number {
    return this.data.length;
  }

  private heapDown(index: number): void {
    const n: number = this.data.length;
    const val: number = this.data[index];

    while (index < n >>> 1) {
      let left: number = (index << 1) + 1;
      const right: number = left + 1;

      let smallest: number =
        right < n && this.data[right] < this.data[left] ? right : left;
      const childVal: number = this.data[smallest];

      if (childVal >= val) break;

      // Move up
      this.data[index] = childVal;
      index = smallest;
    }

    this.data[index] = val;
  }

  private heapUp(index: number): void {
    const val: number = this.data[index];

    while (val > 0) {
      const parentIdx: number = (index - 1) >>> 1;
      const parentVal: number = this.data[parentIdx];

      if (parentVal <= val) break;

      // Move parent down
      this.data[index] = parentVal;
      index = parentIdx;
    }
    this.data[index] = val;
  }

  private buildMinHeap(): void {
    for (let i: number = (this.data.length >>> 1) - 1; i >= 0; i--) {
      this.heapDown(i);
    }
  }

  private buildMaxHeap(): void {
    for (let i: number = 0; i <= (this.data.length >>> 1) - 1; i++) {
      this.heapUp(i);
    }
  }
}

class SetOfStacks {
  private stacks: Stack[] = [];
  private stackSets: number[][] = [];
  private data: number[] = [];
  totalStacks: number | undefined;
  height: number = 0;

  constructor(plates: number[], height: number) {
    this.data = plates;
    this.totalStacks = Math.floor(plates.length / height);
    this.height = height;
    this.breakUpStacks();
  }

  breakUpStacks(): void {
    let start: number = 0;

    while (start < this.data.length) {
      let end: number = start + this.totalStacks!;

      let subStack: number[] = this.data.slice(start, end);
      this.stackSets.push(subStack);
      start += this.height;
    }
  }

  buildSubStacks(type: string = 'min'): void {
    if (!this.stackSets) throw new Error("Ain't no plates");

    this.stackSets.forEach((range: number[]) => {
      this.stacks.push(new Stack(range, type, range.length === this.height));
    });

    console.log(this.stacks);
  }

  showAt(num: number): number[] {
    return this.stackSets[num];
  }

  showAll(): number[][] {
    return this.stackSets;
  }

  popAt(num: number): void {}
}

const plates = [2, 7, 2, 3, 5, 6, 4, 42, 2, 69];
const stackSet = new SetOfStacks(plates, 3); // [[2, 7, 2], [3, 5, 6], [4, 42, 2], [69]]
console.log(stackSet.showAt(1));
console.log(stackSet.showAll());
stackSet.buildSubStacks();
