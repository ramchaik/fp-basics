// zip :: ([a], [b]) -> [(a,b)]
const zip = function ([xs, ys]) {
  return xs.map((x, i) => [x, ys[i]]);
};

const zipObjects = function (xs, ys) {
  return xs.map((x, i) => ({
    ...x,
    ...ys[i],
  }));
};

const getInitialValForZipInfinite = (arr) => {
  const len = Math.max(...arr.map((x) => x.length));
  return Array.from({ length: len }, (_) => ({}));
};

const zipInfiniteObjects = (arr) =>
  arr.reduce(zipObjects, getInitialValForZipInfinite(arr));

// -------------------------------------------

const nums = [1, 2, 3, 4, 5];
const letters = ['a', 'b', 'c', 'd', 'e'];

const a = [{ a: 'hwllo' }, { b: 'aklsdf' }, { c: 'sdlkfjlskfj' }];
const b = [
  { v: 'aslkdjflkasdf' },
  { k: 'waskdfj' },
  { o: 'skdfjsf' },
  { i: 'lskdfjksf' },
  { p: 'lksdfjksdfksdjf' },
  { z: 'kdsfjksdjfsdflkj' },
];
const x = [
  { d: 'skfjskf' },
  { y: 'sdkfjskfj' },
  { u: 'skdfjsdf' },
  {
    gg: 'ksjfksjfdkj',
  },
];

// -------------------------------------------

console.log(zip([nums, letters]));
console.log(zipInfiniteObjects([a, b, x]));
