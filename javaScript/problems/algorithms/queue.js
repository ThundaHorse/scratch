/**
 * Implementing Queue with Deques (FIFO)
 */

class Queue {
  map;
  first;
  last;

  constructor() {
    this.map = new Map();
    this.first = undefined;
    this.last = undefined;
  }

  enqueue(item) {
    this.map.set(item, this.map.size ? this.map.size - 1 : 0);

    // No first
    if (!this.first) {
      this.first = item;
    } else {
      // First already set
      this.last = item;
    }
  }

  dequeue() {
    if (this.isEmpty()) {
      return undefined;
    }

    const item = this.first;

    if (this.first) {
      this.map.delete(this.first);
    }

    if (this.last) {
      this.first = this.last;
      this.last = undefined;
    }

    return item;
  }

  isEmpty() {
    return this.map.size === 0;
  }

  size() {
    return this.map.size;
  }
}

const queue = new Queue();
queue.enqueue('order1');
queue.enqueue('order2');
console.log(queue.dequeue()); // Outputs 'order1'
console.log(queue.isEmpty()); // Outputs false
console.log(queue.size()); // Outputs 1
queue.enqueue('order3');
console.log(queue.size()); // Outputs 2
queue.enqueue('order4');
queue.enqueue('order5');
queue.enqueue('order6');
console.log(queue.size()); // Outputs 5
console.log(queue.dequeue()); // Outputs 'order2'
