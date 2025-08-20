/**
 * You are given a string s consisting of lowercase english characters, as well as opening and closing parentheses
 * Remove the minimum number of parentheses so that the resulting string is valid
 * A parentheses string is valid if all of the following conditions are met:
 * - It is the empty string, contains only lowercase characters, or
 * - It can be written as AB (A concatenated with B), where A and B are valid strings or
 * - It can be written as (A), where A is a valid string
 *
 * Topic: String Manipulation
 * Recommended Approach: Use a stack to keep track of the indices of opening parentheses and the positions of invalid closing parentheses
 */
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var minRemoveToMakeValid = function (s) {
    var arr = __spreadArray([], __read(s), false);
    var stack = [];
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === '(') {
            stack.push(i);
        }
        else if (arr[i] === ')') {
            if (stack.length > 0) {
                console.log(stack);
                stack.pop();
            }
            else {
                arr[i] = '';
            }
        }
    }
    while (stack.length)
        arr[stack.pop()] = '';
    return arr.join('');
};
console.log(minRemoveToMakeValid('nee(t(c)o)de)')); // 'nee(t(c)o)de'
console.log(minRemoveToMakeValid('x(y)z(')); // "x(y)z"
console.log(minRemoveToMakeValid('))()((')); // "()"
