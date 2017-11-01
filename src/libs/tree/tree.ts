class Node {
    data: any;
    parent: Node;
    children: Array<Node>;
    depth: number;
    id: number;
    chart: any;

    constructor(data: any) {
        this.data       = data;
        this.parent     = null;
        this.children   = [];
        this.depth      = 1;
        this.id         = 1;
        this.chart      = null;
    }

    getDepth(): number {
        return this.depth;
    }
}

class Queue {
    _oldestIndex: number;
    _newestIndex: number;
    _storage: any;

    constructor() {
        this._oldestIndex = 1;
        this._newestIndex = 1;
        this._storage = {};
    }

    size(): number {
        return this._newestIndex - this._oldestIndex;
    }

    enqueue(data: any): void {
        this._storage[this._newestIndex] = data;
        this._newestIndex++;
    }

    dequeue(): any {
        let oldestIndex = this._oldestIndex;
        let newestIndex = this._newestIndex;
        let deletedData;

        if (oldestIndex !== newestIndex) {
            deletedData = this._storage[oldestIndex];
            delete this._storage[oldestIndex];
            this._oldestIndex++;

            return deletedData;
        }
    }

}

class Tree {
    _root: Node = null;
    idArray: Array<number> = [1];

    constructor(data: any) {
        this._root = new Node(data);
    }

    traverseDF(callback: Function): void {
        (function recurse(currentNode: Node) {
            for (let node of currentNode.children) {
                recurse(node);
            }
            callback(currentNode);
        })(this._root);
    }

    traverseBF(callback: Function): void {
        let queue = new Queue();
        queue.enqueue(this._root);

        let currentTree = queue.dequeue();

        while (currentTree) {

            for (let node of currentTree.children) {
                queue.enqueue(node);
            }

            callback(currentTree);
            currentTree = queue.dequeue();
        }
    }

    contains(callback: Function, traversal: any): void {
        traversal.call(this, callback);
    }

    getParent(data: any, traversal: any): Node {
        let parent: Node = null;
        let callback = function (node: Node) {
            if (node.data === data) {
                parent = node.parent;
            }
        };

        this.contains(callback, traversal);

        return parent;
    }

    getNode(data: any, traversal: any): Node {
        let findNode: Node = null;
        let callback = function (node: Node) {
            if (node.data === data) {
                findNode = node.parent;
            }
        };

        this.contains(callback, traversal);

        return findNode;
    }

    add(data: any, toData: any, traversal: any): Node {
        let child: Node = new Node(data);
        let parent: Node = null;
        let id: number = 0;
        let callback = function (node: Node) {
            if (node.data === data) {
                parent = node.parent;
            }
        };

        this.contains(callback, traversal);

        if (parent) {
            if (this.idArray[parent.depth] === undefined ) {
                this.idArray.push(1);
                id = 1;
            } else {
                id = this.idArray[parent.depth];
                this.idArray[parent.depth] += 1;
            }

            child.id = id;
            child.depth = parent.depth + 1;
            parent.children.push(child);
            child.parent = parent;
            child.data += child.depth + '-' + child.id;
            return child;
        } else {
            throw new Error('Cannot add node to a non-existent parent.');
        }
    }

    remove(data: any, fromData: any, traversal: any): Node {
        let parent: Node = null;
        let childToRemove: Node = null;
        let index: number;
        let callback = function (node: Node) {
            if (node.data === fromData) {
                parent = node;
            }
        };

        this.contains(callback, traversal);

        if (parent) {
            index = this.findIndex(parent.children, data);

            if (index === undefined) {
                throw new Error('Node to remove does not exist.');
            } else {
                childToRemove = parent.children.splice(index, 1)[0];
            }
        } else {
            throw new Error('Parent does not exist.');
        }

        return childToRemove;
    }

    findIndex(arr: Array<Node>, data: any): number {
        let index: number;

        for (let i in arr) {
            if (arr[i].data === data) {
                index = Number(i);
            }
        }

        return index;
    }
}

export { Tree };
