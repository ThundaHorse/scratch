/**
 * Given a root of a binary tree, return the zigzag level order traversal of its nodes' values (L to R, R to L alternately).
 */

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

function generateTree(arr: (number | null)[]): TreeNode | null {
  if (!arr.length || arr[0] === null) return null;
  const root = new TreeNode(arr[0]);
  const queue: TreeNode[] = [root];
  let i = 1;
  while (i < arr.length) {
    const node = queue.shift();
    if (node) {
      if (i < arr.length && arr[i] !== null) {
        node.left = new TreeNode(arr[i]!);
        queue.push(node.left);
      }
      i++;
      if (i < arr.length && arr[i] !== null) {
        node.right = new TreeNode(arr[i]!);
        queue.push(node.right);
      }
      i++;
    }
  }
  return root;
}

const zigzagLevelOrder = (root: TreeNode | null): number[][] => {
  let output: number[][] = [];

  if (!root) return output;

  let currentLevel: TreeNode[] = [root];
  let isLtoR: boolean = true;

  while (currentLevel.length > 0) {
    const levelVals: number[] = [];
    const nextLevel: TreeNode[] = [];

    currentLevel.forEach((node: TreeNode) => {
      levelVals.push(node.val);
      if (node.left) nextLevel.push(node.left);
      if (node.right) nextLevel.push(node.right);
    });

    if (!isLtoR) levelVals.reverse();
    output.push(levelVals);
    currentLevel = nextLevel;
    isLtoR = !isLtoR;
  }

  return output;
};

const maxDepth = (root: TreeNode | null): number => {
  if (!root) return 0;

  const leftDepth = maxDepth(root.left);
  const rightDepth = maxDepth(root.right);

  return Math.max(leftDepth, rightDepth) + 1;
};

const levelOrderbottom = (root: TreeNode | null): number[][] => {
  let output: number[][] = [];
  if (!root) return output;

  let current: TreeNode[] = [root];

  while (current.length > 0) {
    let level: number[] = [];
    let next: TreeNode[] = [];

    current.forEach((node: TreeNode) => {
      level.push(node.val);

      if (node.left) next.push(node.left);
      if (node.right) next.push(node.right);
    });

    output.unshift(level);
    current = next;
  }

  return output;
};

const nodes = [3, 9, 20, null, null, 15, 7];
const root = generateTree(nodes);

console.log(levelOrderbottom(root));
// console.log(maxDepth(root)); // 3
// console.log(zigzagLevelOrder(root)); // [[3], [20, 9], [15, 7]]
