let nums = Array.from({ length: 10 }, (_, i) => i + 1);

const sumAllWithFor = (arr) => {
  if (!arr) return 0;

  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    sum += arr[i];
  }

  return sum;
};

const sumAllWithWhile = (arr) => {
  if (!arr) return 0;
  if (arr.length === 1) return arr[0];

  let i = 0;
  let total = 0;
  while (i < arr.length) {
    total += arr[i];
    i++;
  }
  return total;
};

const sum = (a, b) => a + b;

const sumAllRecursive = (arr) => {
  if (!arr) return 0;
  if (arr.length === 1) return arr[0];
  if (arr.length === 2) return sum(...arr);

  return sum(arr[0], sumAllRecursive(arr.slice(1)));
};

const sumAllHaskellWay = (x, ...xs) => {
  if (!x) return 0;
  if (!xs) return x;
  return sum(x, sumAllHaskellWay(...xs));
};

const sumAllJSAdaptaionFP = (arr) => {
  if (!arr) return 0;
  return arr.reduce(sum, 0);
};

console.log('For: ', sumAllWithFor(nums));
console.log('While: ', sumAllWithWhile(nums));
console.log('GOD recursion: ', sumAllRecursive(nums));
console.log('Above GOD haskell way: ', sumAllHaskellWay(...nums));
console.log('NANI JS?!!: ', sumAllJSAdaptaionFP(nums));
