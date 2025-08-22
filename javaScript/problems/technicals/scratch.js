var ListNode = /** @class */ (function () {
    function ListNode(value, next) {
        if (next === void 0) { next = undefined; }
        this.value = value;
        this.next = next;
    }
    return ListNode;
}());
var reverseLinkedList = function (head) {
    if (!head)
        return undefined;
    var prev = undefined;
    var current = head;
    var reversedNodeVals = [];
    // NCPC = Next, current, previous, current
    while (current) {
        console.log(prev === null || prev === void 0 ? void 0 : prev.value);
        // Set next to head's next
        var next = current.next;
        // Set current next to previous
        current.next = prev;
        // Set previous node to current
        prev = current;
        // Advance current node
        current = next;
        console.log(prev.value);
        if (current === null || current === void 0 ? void 0 : current.value)
            reversedNodeVals.push(current === null || current === void 0 ? void 0 : current.value);
    }
    console.log(reversedNodeVals);
    return prev;
};
var listNodes = new ListNode(0, new ListNode(1, new ListNode(2, new ListNode(3))));
console.log(reverseLinkedList(listNodes)); // 3 -> 2 -> 1 -> 0
