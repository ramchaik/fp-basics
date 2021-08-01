function apply(x, f) {
  return f(x);
}

function compose(...funcs) {
  return (x) => funcs.reduceRight(apply, x);
}

function concat(xs, val) {
  return xs.concat(val);
}

const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// transformations
const add1 = (x) => x + 1;
const doubleIt = (x) => x * 2;
const add = (x, y) => x + y;

// predicates
const isEven = (x) => x % 2 === 0;
const isOdd = (x) => !isEven(x);

function mapping(f) {
  // This is a transducer
  // as it takes a reducer and 
  // returns a reducer
  return function (step) { // reducing/step/reducer fn
    return (acc, val) => {
      return step(acc, f(val));
    };
  };
}

function filtering(predicate) {
  // This is a transducer
  // as it takes a reducer and 
  // returns a reducer
  return function (rf) { // reducing/step/reducer fn
    return (acc, val) => {
      return predicate(val) ? rf(acc, val) : acc;
    };
  };
}

const transformWithMapAndFilter = compose(mapping(add1), filtering(isEven));
const transformWithMapAndFilterResultWithAdd = nums.reduce(
  transformWithMapAndFilter(add), // add is a reducing function
  0
);
const transformWithMapAndFilterResultWithConcat = nums.reduce(
  transformWithMapAndFilter(concat), // concat is a reducing function
  []
);

console.log({ transformWithMapAndFilterResultWithAdd });
console.log({ transformWithMapAndFilterResultWithConcat });

// transduce helper method
function transduce(xf, rf, init, xs) {
  return xs.reduce(xf(rf), init);
}

console.log({
  transduceWithAdd: transduce(transformWithMapAndFilter, add, 0, nums),
});
console.log({
  transduceWithConcat: transduce(transformWithMapAndFilter, concat, [], nums),
});

const dataStructure = {};
dataStructure.reduce = function (rf, init) {
  return this.value.reduce(rf, init);
};
dataStructure.concat = function (x) {
  return Object.assign(this, { value: this.value.concat(x) });
};
dataStructure.of = function (...xs) {
  const value = xs === undefined ? [] : xs;
  return Object.assign({}, dataStructure, { value });
};

const xform = compose(
  mapping(add1),
  filtering(isEven),
  mapping(doubleIt),
  mapping(add1)
);

const newNums = dataStructure.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
console.log({ transduceCustDS: transduce(xform, add, 0, newNums) });
console.log({ transduceCustDS: transduce(xform, concat, dataStructure.of(), newNums) });
console.log({ transduceOrigDS: transduce(xform, add, 0, nums) });
console.log({ transduceOrigDS: transduce(xform, concat, [], nums) });
