"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.heights = exports.Inputs = void 0;
var Inputs = /** @class */ (function () {
    function Inputs() {
        this.nums = [];
        this.heights = new Map();
    }
    Inputs.prototype.add = function (nums) {
        this.heights.set(this.heights.size + 1, nums);
    };
    Inputs.prototype.get = function (index) {
        var _a;
        if (index < 1 || index > this.heights.size) {
            throw new Error("Index ".concat(index, " is out of bounds. Valid range is 1 to ").concat(this.heights.size, "."));
        }
        return (_a = this.heights.get(index)) !== null && _a !== void 0 ? _a : [];
    };
    return Inputs;
}());
exports.Inputs = Inputs;
var heights = new Inputs();
exports.heights = heights;
heights.add([1, 1, 1]);
heights.add([3, 1, 3]);
heights.add([4, 1, 3, 2]);
heights.add([0, 0, 0, 0]);
heights.add([5, 0, 5, 0, 5]);
heights.add([2, 3, 1, 4]);
