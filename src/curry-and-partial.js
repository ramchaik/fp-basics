// normal array
const sumFourNums = (w, x, y, z) => w + x + y + z;
// curried function
const sumFourNumsCurried = (w) => (x) => (y) => (z) => w + x + y + z;

// partial application
const partialWith2Sum = sumFourNums.bind(null, 1, 2);

// curry application
const partialWith2SumSrcCurry = sumFourNumsCurried(1)(2);
const partialWith2SumCurried = curry(partialWith2Sum);

// custom curry helper, not optimized
function curry(f, a = f.length) {
  return function gatherArgs(x, s = 1, args = []) {
    const allArgs = [...args, x];
    return s === a ? f(...allArgs) : (y) => gatherArgs(y, s + 1, allArgs);
  };
}

// console.log(sumFourNums(1,2,3,4))
// console.log(sumFourNumsCurried(1)(2)(3)(4))
console.log(partialWith2Sum(3, 4));
console.log(partialWith2SumSrcCurry(3)(4));
console.log(partialWith2SumCurried(3)(4));
