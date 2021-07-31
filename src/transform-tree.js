const buildTree = require('./build-bst');

const arr = [5, 6, 7, 8, 1, 2, 9, 3, 4];

function transformBst(fn, tree) {
  if (tree === undefined) {
    return {};
  }

  const left = branchMap(fn, tree, 'left');
  const right = branchMap(fn, tree, 'right');

  return {
    data: fn(tree.data),
    ...left,
    ...right,
  };
  // return Object.assign({ data: fn(tree.data) }, left, right);
}

function branchMap(fn, tree, path) {
  return tree[path] === undefined
    ? {}
    : { [path]: transformBst(fn, tree[path]) };
}

const double = (x) => x * 2;

console.log("*** Transforming the tree... ***");

const bst = transformBst(double, buildTree(arr));

console.log(JSON.stringify(bst, null, 2));

module.exports = transformBst;