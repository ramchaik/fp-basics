const arrOfArrs = [
  ['ricardo', 'samuel', 'bilu'],
  ['babla', 'mastana', 'kabu'],
  ['raju', 'chacha', 'kabutar chor', 'dance'],
  ['hello', 'world', '', 'reading'],
];

const makeCSV = (acc, val) => {
  return `${acc},${val}`;
};

const makeRow = (acc, val) => {
  const row = val.slice(1).reduce(makeCSV, val.slice(0, 1));
  return `${acc}\n${row}`;
};

let makeSuperCSV = arrOfArrs.reduce(
  makeRow,
  'Fistname,Lastname,Nickname,Hobby'
);
console.log(makeSuperCSV);
