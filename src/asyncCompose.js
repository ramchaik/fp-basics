const applyAsync = (acc, val) => acc.then(val);

const composeAsync =
  (...funcs) =>
  (x) =>
    funcs.reduce(applyAsync, Promise.resolve(x));

const allTaskPromise = (allTasks) =>
  allTasks.map(
    (task) => () =>
      task()
        .then(console.log)
        .catch((e) => {
          throw e;
        })
  );

const runAll = (...fns) => composeAsync(...allTaskPromise(fns))();

// ------------------------------------------------

const promise1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('promise #1 in 1 sec'), 1000);
  });
};

const promise2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('promise #2 in 1 sec'), 1000);
  });
};

const promise3 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('promise #3 in 1 sec'), 1000);
  });
};


runAll(promise1, promise2, promise3)
  .then(() => {
    console.log('Final: you are done!');
  })
  .catch((e) => {
    console.log('Final: ', { e });
  });
