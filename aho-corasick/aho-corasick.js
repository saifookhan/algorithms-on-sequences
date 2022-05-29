const LinkedList = require("../utils/linkedList");

console.clear();
class CustomNode {
  child = new Map();
  suffixLink = null; //TODO: implement suffixLink
  patternIndex = -1;
}

function buildTrie(root, patterns) {
  let i = 0;

  for (i; i < patterns.length; i++) {
    let curr = root;
    let j = 0;

    for (j; j < patterns[i].length; j++) {
      let char = patterns[i].charAt(j);
      if (curr.child.has(char)) {
        curr = curr.child.get(char);
      } else {
        let newEmptyNode = new CustomNode();
        curr.child.set(char, newEmptyNode);
        curr = newEmptyNode;
      }
    }
    curr.patternIndex = i;
  }
}

function buildFailureLinks(root) {
  root.suffixLink = root;
  var queue = new LinkedList();

  // for first level, set failure link to root node
  root.child.forEach((node) => {
    queue.insertLast(node);
    return (node.suffixLink = root);
  });

  console.log(queue.size);
  while (queue.size > 0) {
    currentState = queue.head.value;
    queue.removeAt(0);
    console.log(currentState);

    for (let [key] of currentState.child.keys()) {
      let currentChild = currentState.child.get(key);
      let tmp = currentState.suffixLink;

      while (!tmp.child.has(key) && tmp !== root) {
        tmp = tmp.suffixLink;
      }
      if (tmp.child.has(key)) {
        currentChild.suffixLink = tmp.child.get(key);
      } else {
        currentChild.suffixLink = root;
      }
      queue.insertLast(currentChild);
    }
  }
}

var rootNode = new CustomNode();
buildTrie(rootNode, ["ACC", "ATC", "CAT", "A", "C", "XYZ"]);
buildFailureLinks(rootNode);
console.log("\n====================\n");
console.log(rootNode);
