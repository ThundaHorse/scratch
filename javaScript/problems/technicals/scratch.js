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
var Stack = /** @class */ (function () {
    function Stack(nums, type, atCapacity) {
        this.data = [];
        this.type = '';
        this.data = nums;
        this.type = type;
        this.atCapacity = atCapacity;
        this.type === 'min' ? this.buildMinHeap() : this.buildMaxHeap();
    }
    Stack.prototype.show = function () {
        console.log(this.data);
    };
    Stack.prototype.getSize = function () {
        return this.data.length;
    };
    Stack.prototype.pop = function () {
        if (!this.data)
            return undefined;
        var last = this.data.pop();
        this.heapDown(0);
        return last;
    };
    Stack.prototype.heapDown = function (index) {
        var n = this.data.length;
        var val = this.data[index];
        while (index < n >>> 1) {
            var left = (index << 1) + 1;
            var right = left + 1;
            var smallest = right < n && this.data[right] < this.data[left] ? right : left;
            var childVal = this.data[smallest];
            if (childVal >= val)
                break;
            // Move up
            this.data[index] = childVal;
            index = smallest;
        }
        this.data[index] = val;
    };
    Stack.prototype.heapUp = function (index) {
        var val = this.data[index];
        while (val > 0) {
            var parentIdx = (index - 1) >>> 1;
            var parentVal = this.data[parentIdx];
            if (parentVal <= val)
                break;
            // Move parent down
            this.data[index] = parentVal;
            index = parentIdx;
        }
        this.data[index] = val;
    };
    Stack.prototype.buildMinHeap = function () {
        for (var i = (this.data.length >>> 1) - 1; i >= 0; i--) {
            this.heapDown(i);
        }
    };
    Stack.prototype.buildMaxHeap = function () {
        for (var i = 0; i <= (this.data.length >>> 1) - 1; i++) {
            this.heapUp(i);
        }
    };
    return Stack;
}());
var SetOfStacks = /** @class */ (function () {
    function SetOfStacks(plates, height) {
        this.stacks = [];
        this.stackSets = [];
        this.data = [];
        this.height = 0;
        this.data = plates;
        this.totalStacks = Math.floor(plates.length / height);
        this.height = height;
        this.breakUpStacks();
    }
    SetOfStacks.prototype.breakUpStacks = function () {
        var start = 0;
        while (start < this.data.length) {
            var end = start + this.totalStacks;
            var subStack = this.data.slice(start, end);
            this.stackSets.push(subStack);
            start += this.height;
        }
    };
    SetOfStacks.prototype.buildSubStacks = function (type) {
        var _this = this;
        if (type === void 0) { type = 'min'; }
        if (!this.stackSets)
            throw new Error("Ain't no plates");
        this.stackSets.forEach(function (range) {
            _this.stacks.push(new Stack(range, type, range.length === _this.height));
        });
        console.log(this.stacks);
    };
    SetOfStacks.prototype.showAt = function (num) {
        return this.stackSets[num];
    };
    SetOfStacks.prototype.showAll = function () {
        return this.stackSets;
    };
    SetOfStacks.prototype.popAt = function (num) {
        if (!this.stacks[num])
            return undefined;
        console.log(this.stacks[num]);
        return this.stacks[num].pop();
    };
    return SetOfStacks;
}());
var plates = [2, 7, 2, 3, 5, 6, 4, 42, 2, 69];
var stackSet = new SetOfStacks(plates, 3); // [[2, 7, 2], [3, 5, 6], [4, 42, 2], [69]]
stackSet.buildSubStacks();
console.log(stackSet.popAt(2));
console.log(stackSet.showAt(2));
