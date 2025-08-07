class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}
const reverseLinkedList = (head) => {
  // Reversed, placeholder
  let prev = null;
  let curr = head;

  while (curr) {
    // Set temp to the next node
    let temp = curr.next;
    // Erase the current's next
    curr.next = prev;
    // Swap values with current
    prev = curr;
    // Set current to the next node that was stored earlier
    curr = temp;
  }
  // return prev;
};

let nodeList = [
  new ListNode(
    0,
    new ListNode(
      1,
      new ListNode(2, new ListNode(3, new ListNode(4, new ListNode(5))))
    )
  ),
];

// console.log(nodeList);
console.log(reverseLinkedList(nodeList[0]));
// [0,1,2,3]
// [3,2,1,0]
