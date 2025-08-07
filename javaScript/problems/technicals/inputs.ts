export class Inputs {
  nums: number[];
  heights: Map<number, number[]>;

  constructor() {
    this.nums = [];
    this.heights = new Map<number, number[]>();
  }

  add(nums: number[]) {
    this.heights.set(this.heights.size + 1, nums);
  }

  get(index: number): number[] {
    if (index < 1 || index > this.heights.size) {
      throw new Error(
        `Index ${index} is out of bounds. Valid range is 1 to ${this.heights.size}.`
      );
    }

    return this.heights.get(index) ?? [];
  }
}

const heights: Inputs = new Inputs();

heights.add([1, 1, 1]);
heights.add([3, 1, 3]);
heights.add([4, 1, 3, 2]);
heights.add([0, 0, 0, 0]);
heights.add([5, 0, 5, 0, 5]);
heights.add([2, 3, 1, 4]);

export { heights };
