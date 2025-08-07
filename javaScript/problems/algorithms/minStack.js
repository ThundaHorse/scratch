/**
 * Design a stack class that supports the push, pop, top, and getMin operations.

MinStack() initializes the stack object.
void push(int val) pushes the element val onto the stack.
void pop() removes the element on the top of the stack.
int top() gets the top element of the stack.
int getMin() retrieves the minimum element in the stack.
Each function should run in O(1) time.
 */

class MinStack {
  constructor() {
    this.stack = [];
    this.min = Infinity;
  }

  /**
   * @param {number} val
   * @return {void}
   */
  push(val) {
    if (this.stack.length === 0) {
      this.stack.push(0);
      this.min = val;
    } else {
      this.stack.push(val - this.min);
      if (val < this.min) this.min = val;
    }
  }

  /**
   * @return {void}
   */
  pop() {
    if (this.stack.length === 0) return;
    const pop = this.stack.pop();
    if (pop < 0) this.min -= pop;
  }

  /**
   * @return {number}
   */
  top() {
    const top = this.stack[this.stack.length - 1];
    return top > 0 ? top + this.min : this.min;
  }

  /**
   * @return {number}
   */
  getMin() {
    return this.min;
  }
}

let test = new MinStack();
let input = [
  'MinStack',
  'push',
  1,
  'push',
  2,
  'push',
  0,
  'getMin',
  'pop',
  'top',
  'getMin',
];

let blah;
let output = [];

for (let i = 0; i < input.length; i++) {
  let cmd = input[i];

  if (cmd === 'MinStack') {
    blah = new MinStack();
    output.push(null);
  }

  if (cmd === 'push') {
    blah.push(input[i + 1]);
    output.push(null);
  }

  if (cmd === 'getMin') {
    output.push(blah.getMin());
  }

  if (cmd === 'pop') {
    blah.pop();
    output.push(null);
  }

  if (cmd === 'top') {
    output.push(blah.top());
  }
}

console.log(output);
