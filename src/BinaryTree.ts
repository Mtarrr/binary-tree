export class Node<T> {
    private _key: number | null;
    private _value: T | null;
    private _left: Node<T> | null;
    private _right: Node<T> | null;

    get key(): number {
        return this._key;
    }

    set key(value: number) {
        this._key = value;
    }

    get value(): T {
        return this._value;
    }

    set value(value: T) {
        this._value = value;
    }

    get left(): Node<T> | null {
        return this._left;
    }

    set left(value: Node<T> | null) {
        this._left = value;
    }

    get right(): Node<T> | null {
        return this._right;
    }

    set right(value: Node<T> | null) {
        this._right = value;
    }
}

export class BinaryTree<T> {
    private rootNode: Node<T> = null;

    insert(key: number, value: T): void {
        let newNode = new Node<T>();
        newNode.key = key;
        newNode.value = value;

        if (this.rootNode == null) {
            this.rootNode = newNode;
        } else {
            let current = this.rootNode;
            let parent;
            while (true) {
                parent = current;
                if (key == current.key) {
                    current.value = value;
                    return;
                } else if (key < current.key) {
                    current = current.left;
                    if (current == null) {
                        parent.left = (newNode);
                        return;
                    }
                } else {
                    current = current.right;
                    if (current == null) {
                        parent.right = (newNode);
                        return;
                    }
                }
            }
        }
    }

    search(key: number): Node<T> {
        let current = this.rootNode;
        if (current == null) return null;

        while (current.key != key) {
            if (key < current.key) {
                current = current.left;
            } else {
                current = current.right;
            }
            if (current == null) {
                return null;
            }
        }
        return current;
    }

    delete(key: number): boolean {
        let current = this.rootNode;
        let parent = this.rootNode;
        let isLeftChild = true;

        if (current == null) return false;

        while (current.key != key) {
            parent = current;
            if (key < current.key) {
                isLeftChild = true;
                current = current.left;
            } else {
                isLeftChild = false;
                current = current.right;
            }
            if (current == null)
                return false;
        }

        if (current.left == null && current.right == null) {
            if (current == this.rootNode)
                this.rootNode = null;
            else if (isLeftChild)
                parent.left = null;
            else
                parent.right = null;
        } else if (current.right == null) {
            if (current == this.rootNode)
                this.rootNode = current.left;
            else if (isLeftChild)
                parent.left = (current.left);
            else
                parent.right = (current.left);
        } else if (current.left == null) {
            if (current == this.rootNode)
                this.rootNode = current.right;
            else if (isLeftChild)
                parent.left = (current.right);
            else
                parent.right = (current.right);
        } else {
            let heir = this.replace(current);
            if (current == this.rootNode)
                this.rootNode = heir;
            else if (isLeftChild) {
                parent.left = (heir);
                heir.left = current.left;
            } else {
                parent.right = (heir);
                heir.left = current.left;
            }
        }
        return true;
    }

    replace(node: Node<T>): Node<T> {
        let parent = node;
        let child = node;
        let current = node.right;
        while (current != null) {
            parent = child;
            child = current;
            current = current.left;
        }
        if (child != node.right) {
            parent.left = (child.right);
            child.right = (node.right);
        }
        return child;
    }

    printTree(): void {
        let global: Array<Node<T>> = [this.rootNode];
        let isRowEmpty = false;
        let space = 48;

        while (isRowEmpty == false) {
            let local: Array<Node<T>> = [];
            isRowEmpty = true;
            let rowString: String = "";

            let i: number;
            for (i = 0; i < space; i++) rowString += " ";

            while (global.length != 0) {
                let temp = global.pop();
                if (temp != null) {
                    rowString += temp.key + " (" + temp.value + ")";
                    local.push(temp.left);
                    local.push(temp.right);
                    if (temp.left != null ||
                        temp.right != null)
                        isRowEmpty = false;
                } else {
                    rowString += "(empty)";
                    local.push(null);
                    local.push(null);
                }
                let i: number;
                for (i = 0; i < space; i++) rowString += " ";
            }
            console.log(rowString);
            space /= 2;
            while (local.length != 0)
                global.push(local.pop());
        }
    }
}