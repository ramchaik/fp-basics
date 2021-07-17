const print = (val) => console.log(val);

const apply = (fn1, fn2) => fn2(fn1);
const compose = (arrOfFn) => (val) => arrOfFn.reduce(apply, val);

const addOne = (n) => n + 1;
const double = (n) => n * 2;

const manyFns = compose([double, addOne, double, addOne, double]);
print(manyFns(3));
