/**
 * You are given the root of a binary tree root. Invert the binary tree and return its root.
 */

class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

const invertTree = (root) => {
  // base case
  if (!root) return null;

  const stack = [root];
  while (stack.length) {
    // Get last element in stack
    const node = stack.pop();

    // Reverse positions
    [node.left, node.right] = [node.right, node.left];

    // Continue down the tree
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }

  return root;
};

let tree = new TreeNode(
  1,
  new TreeNode(2, new TreeNode(4, null, null), new TreeNode(5, null, null)),
  new TreeNode(3, new TreeNode(6, null, null), new TreeNode(7, null, null))
);
console.log(invertTree(tree)); // [1, 3, 2, 7, 6, 5, 4]
