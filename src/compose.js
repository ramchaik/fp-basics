const apply = (acc, val) => val(acc);
const compose = (...funcs) => (x) => funcs.reduce(apply, x);

// add1 :: (Number, Number) -> (Number, Number)
const add1 = ([x, y]) => [x + 1, y];
// addSomething :: (Number, Number) -> Number
const addSomething = ([x, y]) => x + y;
const process = compose(add1, addSomething);

console.log(process([1, 2]));
