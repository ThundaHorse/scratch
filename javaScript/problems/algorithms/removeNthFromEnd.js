class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

class Solution {
  removeNthFromEnd1(head, n) {
    // A dummy node helps handle edge cases, like removing the head of the list.
    const dummy = new ListNode(0, head);
    let left = dummy;
    let right = head;

    // Move the 'right' pointer n steps ahead to create a gap.
    while (n > 0) {
      right = right.next;
      n--;
    }

    // Move both pointers until 'right' reaches the end.
    // 'left' will then be at the node just before the target node.
    while (right) {
      left = left.next;
      right = right.next;
    }

    // Bypass the target node to remove it from the list.
    left.next = left.next.next;

    return dummy.next;
  }

  removeNthFromEnd(head, n) {
    const dummy = new ListNode(0, head);

    let left = dummy;
    let right = head;

    // Advance right past target
    while (n > 0) {
      right = right.next;
      n--;
    }

    // Advance left to right before target
    while (right) {
      left = left.next;
      right = right.next;
    }

    // Bypass left.next as it's the target
    left.next = left.next.next;

    let temp = dummy.next;
    const vals = [];

    while (temp) {
      vals.push(temp.val);
      temp = temp.next;
    }

    console.log(vals);
    return dummy.next;
  }
}

const sol = new Solution();
console.log(
  sol.removeNthFromEnd(
    new ListNode(
      1,
      new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
    ),
    2
  )
); // [1,2,3,4,5] => [1,2,3,5]

console.log(
  sol.removeNthFromEnd(
    new ListNode(
      1,
      new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
    ),
    4
  )
); // [1,2,3,4,5] => [1,3,4,5]
