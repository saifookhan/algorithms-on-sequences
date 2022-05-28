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

var rootNode = new CustomNode();
buildTrie(rootNode, ["ACC", "ATC", "CAT", "A", "C", "XYZ"]);
console.log("\n====================\n");
console.log(rootNode);
