import {BinaryTree} from "./BinaryTree";
import * as readlineSync from "readline-sync";

let binaryTree = new BinaryTree();
let input: string;

console.log("Binary Search Tree.");
while (input = readlineSync.question("Options:" + "\n'1' to add node" + "\n'2' to delete node by key" + "\n'3' to get value by key \n")) {
    switch (input) {
        case "1": {
            let key = parseInt(readlineSync.question("key: "));
            let value = readlineSync.question("value: ");
            binaryTree.insert(key, value);
            binaryTree.printTree();
            console.log(". . . . . . . . . .");
            break;
        }
        case "2": {
            let key = parseInt(readlineSync.question("key: "));
            let isDeleted: boolean = binaryTree.delete(key);
            if (isDeleted == false) console.log("Error. Deletion failed");
            binaryTree.printTree();
            console.log(". . . . . . . . . .");
            break;
        }
        case "3": {
            let key = parseInt(readlineSync.question("key: "));
            let value = binaryTree.search(key);
            if (value == null) console.log("Error. No such key");
            else console.log("value: " + value.value);
            console.log(". . . . . . . . . .");
            break;
        }
    }
}