var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var e_1, _a;
var TreeNode = /** @class */ (function () {
    function TreeNode(data) {
        this.data = data;
    }
    return TreeNode;
}());
var BinarySearchTree = /** @class */ (function () {
    function BinarySearchTree(comparator) {
        this.comparator = comparator;
    }
    // Insert a new node into the BST
    BinarySearchTree.prototype.insert = function (data) {
        if (!this.root) {
            this.root = new TreeNode(data);
            return this;
        }
        var current = this.root;
        // Traverse tree and insert new node
        while (current) {
            if (this.comparator(data, current.data) === 1) {
                if (current.rightNode) {
                    current = current.rightNode;
                }
                else {
                    current.rightNode = new TreeNode(data);
                    return this;
                }
            }
            else {
                if (current.leftNode) {
                    current = current.leftNode;
                }
                else {
                    current.leftNode = new TreeNode(data);
                    return this;
                }
            }
        }
    };
    BinarySearchTree.prototype.search = function (data) {
        if (!this.root)
            return undefined;
        var current = this.root;
        while (this.comparator(data, current.data) !== -1) {
            if (this.comparator(data, current.data) !== 0) {
                if (!current.rightNode)
                    return;
                current = current.rightNode;
            }
            else {
                if (!current.leftNode)
                    return;
                current = current.leftNode;
            }
        }
        return current;
    };
    BinarySearchTree.prototype.remove = function (data) {
        if (!this.root)
            return undefined;
        var current = this.root;
        while (current) {
            if (this.comparator(data, current.data) === 1) {
                if (!current.rightNode)
                    return;
                current = current.rightNode;
            }
            else {
                if (!current.leftNode)
                    return;
                current = current.leftNode;
            }
        }
        return current;
    };
    BinarySearchTree.prototype.inOrderTraversal = function (node) {
        if (!node)
            return;
        this.inOrderTraversal(node.leftNode);
        console.log(node.data);
        this.inOrderTraversal(node.rightNode);
    };
    BinarySearchTree.prototype.preOrderTraversal = function (node) {
        if (node) {
            console.log(node.data);
            this.preOrderTraversal(node.leftNode);
            this.preOrderTraversal(node.rightNode);
        }
    };
    BinarySearchTree.prototype.postOrderTraversal = function (node) {
        if (node) {
            this.postOrderTraversal(node.leftNode);
            this.postOrderTraversal(node.rightNode);
            console.log(node.data);
        }
    };
    return BinarySearchTree;
}());
var comparator = function (a, b) {
    if (a < b)
        return -1;
    if (a > b)
        return 1;
    return 0;
};
var Player = /** @class */ (function () {
    function Player(name, score) {
        this.name = name;
        this.score = score;
    }
    Player.prototype.compareTo = function (other) {
        return comparator(this.score, other.score);
    };
    Player.prototype.toString = function () {
        return "".concat(this.name, ": ").concat(this.score);
    };
    return Player;
}());
var Leaderboard = /** @class */ (function () {
    function Leaderboard() {
        this.bst = new BinarySearchTree(function (a, b) {
            return comparator(a.score, b.score);
        });
    }
    Leaderboard.prototype.addPlayer = function (player) {
        this.bst.insert(player);
    };
    Leaderboard.prototype.removePlayer = function (player) {
        this.bst.remove(player);
    };
    Leaderboard.prototype.getTopPlayers = function () {
        var result = [];
        var addPlayers = function (node) {
            if (!node)
                return;
            addPlayers(node.rightNode);
            result.push(node.data);
            addPlayers(node.leftNode);
        };
        addPlayers(this.bst.root);
        return result;
    };
    return Leaderboard;
}());
var scores = new Leaderboard();
var player1 = new Player('John', 900);
var player2 = new Player('Doe', 1000);
var player3 = new Player('Alice', 850);
var player4 = new Player('Bob', 900);
var player5 = new Player('Charlie', 1400);
scores.addPlayer(player1);
scores.addPlayer(player2);
scores.addPlayer(player3);
scores.addPlayer(player4);
scores.addPlayer(player5);
try {
    for (var _b = __values(scores.getTopPlayers()), _c = _b.next(); !_c.done; _c = _b.next()) {
        var player = _c.value;
        console.log(player.toString()); // Outputs the top players in the leaderboard
    }
}
catch (e_1_1) { e_1 = { error: e_1_1 }; }
finally {
    try {
        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
    }
    finally { if (e_1) throw e_1.error; }
}
