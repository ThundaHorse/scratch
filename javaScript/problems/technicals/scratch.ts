class TreeNode<T> {
  data: T;
  leftNode?: TreeNode<T>;
  rightNode?: TreeNode<T>;

  constructor(data: T) {
    this.data = data;
  }
}

class BinarySearchTree<T> {
  root?: TreeNode<T>;
  comparator: (a: T, b: T) => number;

  constructor(comparator: (a: T, b: T) => number) {
    this.comparator = comparator;
  }

  // Insert a new node into the BST
  insert(data: T): BinarySearchTree<T> | undefined {
    if (!this.root) {
      this.root = new TreeNode(data);
      return this;
    }

    let current: TreeNode<T> = this.root;

    // Traverse tree and insert new node
    while (current) {
      if (this.comparator(data, current.data) === 1) {
        if (current.rightNode) {
          current = current.rightNode;
        } else {
          current.rightNode = new TreeNode(data);
          return this;
        }
      } else {
        if (current.leftNode) {
          current = current.leftNode;
        } else {
          current.leftNode = new TreeNode(data);
          return this;
        }
      }
    }
  }

  search(data: T): TreeNode<T> | undefined {
    if (!this.root) return undefined;

    let current: TreeNode<T> = this.root;

    while (this.comparator(data, current.data) !== -1) {
      if (this.comparator(data, current.data) !== 0) {
        if (!current.rightNode) return;
        current = current.rightNode;
      } else {
        if (!current.leftNode) return;
        current = current.leftNode;
      }
    }

    return current;
  }

  remove(data: T): TreeNode<T> | undefined {
    if (!this.root) return undefined;

    let current: TreeNode<T> = this.root;

    while (current) {
      if (this.comparator(data, current.data) === 1) {
        if (!current.rightNode) return;
        current = current.rightNode;
      } else {
        if (!current.leftNode) return;
        current = current.leftNode;
      }
    }

    return current;
  }

  inOrderTraversal(node: TreeNode<T> | undefined): void {
    if (!node) return;

    this.inOrderTraversal(node.leftNode);
    console.log(node.data);
    this.inOrderTraversal(node.rightNode);
  }

  preOrderTraversal(node: TreeNode<T> | undefined): void {
    if (node) {
      console.log(node.data);
      this.preOrderTraversal(node.leftNode);
      this.preOrderTraversal(node.rightNode);
    }
  }

  postOrderTraversal(node: TreeNode<T> | undefined): void {
    if (node) {
      this.postOrderTraversal(node.leftNode);
      this.postOrderTraversal(node.rightNode);
      console.log(node.data);
    }
  }
}

const comparator = (a: number, b: number) => {
  if (a < b) return -1;

  if (a > b) return 1;

  return 0;
};

class Player {
  name: string;
  score: number;

  constructor(name: string, score: number) {
    this.name = name;
    this.score = score;
  }

  compareTo(other: Player): number {
    return comparator(this.score, other.score);
  }

  toString(): string {
    return `${this.name}: ${this.score}`;
  }
}

class Leaderboard {
  private bst: BinarySearchTree<Player>;

  constructor() {
    this.bst = new BinarySearchTree<Player>((a, b) =>
      comparator(a.score, b.score)
    );
  }

  addPlayer(player: Player): void {
    this.bst.insert(player);
  }

  removePlayer(player: Player): void {
    this.bst.remove(player);
  }

  getTopPlayers(): Player[] {
    const result: Player[] = [];
    const addPlayers = (node: TreeNode<Player> | undefined) => {
      if (!node) return;
      addPlayers(node.rightNode);
      result.push(node.data);
      addPlayers(node.leftNode);
    };
    addPlayers(this.bst.root);
    return result;
  }
}

const scores = new Leaderboard();
const player1 = new Player('John', 900);
const player2 = new Player('Doe', 1000);
const player3 = new Player('Alice', 850);
const player4 = new Player('Bob', 900);
const player5 = new Player('Charlie', 1400);

scores.addPlayer(player1);
scores.addPlayer(player2);
scores.addPlayer(player3);
scores.addPlayer(player4);
scores.addPlayer(player5);

for (const player of scores.getTopPlayers()) {
  console.log(player.toString()); // Outputs the top players in the leaderboard
}
