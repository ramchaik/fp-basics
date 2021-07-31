function buildTree(arr) {
  return arr.reduce(insertNode, {});
}

function insertNode(tree = {}, value) {
  const newNode = { data: value };
  if (tree.data === undefined) {
    return newNode;
  }

  const path = value < tree.data ? 'left' : 'right';
  const parentNode = tree[path];
  return { ...tree, [path]: insertNode(parentNode, value) };
}

const arr = [5, 6, 7, 8, 1, 2, 9, 3, 4];

console.log("*** Building the tree... ***");

const bst = buildTree(arr);

console.log(JSON.stringify(bst, null, 2));

module.exports = buildTree;


