class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class Solution {
  maxdepth(root) {
    if (!root) return 0;

    const leftDepth = this.maxdepth(root.left);
    const rightDepth = this.maxdepth(root.right);

    console.log(leftDepth, rightDepth);
    return Math.max(leftDepth, rightDepth) + 1;
  }
}

const testTree = new TreeNode(
  0,
  new TreeNode(2, null),
  new TreeNode(3, new TreeNode(4), null)
);

const sol = new Solution();
console.log(sol.maxdepth(testTree)); // 3
console.log(sol.maxdepth(null)); // 0
console.log(sol.maxdepth(new TreeNode(1))); // 1
