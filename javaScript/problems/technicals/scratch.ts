class ListNode<T> {
  value: T;
  next: ListNode<T> | undefined;

  constructor(value: T, next: ListNode<T> | undefined = undefined) {
    this.value = value;
    this.next = next;
  }
}

const reverseLinkedList = (
  head: ListNode<number> | undefined
): ListNode<number> | undefined => {
  if (!head) return undefined;

  let prev: ListNode<number> | undefined = undefined;
  let current: ListNode<number> | undefined = head;
  const reversedNodeVals: number[] = [];

  // NCPC = Next, current, previous, current
  while (current) {
    console.log(prev?.value);

    // Set next to head's next
    const next: ListNode<number> | undefined = current.next;
    // Set current next to previous
    current.next = prev;
    // Set previous node to current
    prev = current;
    // Advance current node
    current = next;

    console.log(prev.value);
    if (current?.value) reversedNodeVals.push(current?.value);
  }

  console.log(reversedNodeVals);
  return prev;
};

const listNodes = new ListNode<number>(
  0,
  new ListNode<number>(1, new ListNode<number>(2, new ListNode<number>(3)))
);

console.log(reverseLinkedList(listNodes)); // 3 -> 2 -> 1 -> 0
