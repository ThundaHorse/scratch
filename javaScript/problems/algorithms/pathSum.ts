/**
 * Given the root of a binary tree and an integer targetSum, return true if the tree has a root-to-leaf path such that adding up all the values along the path equals targetSum.
 */

class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

const createTree = (values: (number | null)[]): TreeNode | null => {
  if (!values || values.length === 0) return null;

  const root = new TreeNode(values[0]!);
  const queue: TreeNode[] = [root];
  let i = 1;

  while (i < values.length && queue.length) {
    const current = queue.shift()!;
    if (values[i] !== null) {
      current.left = new TreeNode(values[i]!);
      queue.push(current.left);
    }
    i++;
    if (i < values.length && values[i] !== null) {
      current.right = new TreeNode(values[i]!);
      queue.push(current.right);
    }
    i++;
  }

  return root;
};

const hasPathSum = (root: TreeNode | null, targetSum: number): boolean => {
  if (!root) return false;
  if (!root.left && !root.right && root.val === targetSum) return true;

  return (
    hasPathSum(root.left, targetSum - root.val) ||
    hasPathSum(root.right, targetSum - root.val)
  );
};

const nodes = [5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1];
const root = createTree(nodes);

console.log(hasPathSum(root, 22)); // Output: true
