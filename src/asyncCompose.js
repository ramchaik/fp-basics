const applyAsync = (acc, val) => acc.then(val);

const composeAsync =
  (...funcs) =>
  (x) =>
    funcs.reduce(applyAsync, Promise.resolve(x));

// ! Dependent tasks
const allTaskPromise = (allTasks) =>
  allTasks.map(
    (task) => () =>
      task()
        .then(console.log)
        .catch((e) => {
          console.log('Error: ', e);
          throw e;
        })
  );

const runAll = (...fns) => composeAsync(...allTaskPromise(fns))();

// ------------------------------------------------

const promise1 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('promise #1 in 2 sec'), 2000);
  });
};

const promise2 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject('promise #2 in 1 sec'), 1000);
  });
};

const promise3 = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject('promise #3 in 0.5 sec'), 500);
  });
};

// runAll(promise1, promise2, promise3)
//   .then(() => {
//     console.log('Final: you are done!');
//   })
//   .catch((e) => {
//     console.log('Final: ', { e });
//   });

// ! Independent tasks
// * all tasks are invoked synchronously, but handled asynchronously
// * so every task will run irrespective of any one failing
Promise.all(
  [promise1, promise2, promise3].map((p) =>
    p()
      .then(console.log)
      .catch((e) => {
        console.log('from error: ', e);
        throw e;
      })
  )
)
  .then(() => {
    // On successful completion of all tasks
    console.log('Final: you are done!');
  })
  .catch((e) => {
    // On failure of any task, error is propagated to this final state
    console.log('Any one task failed: ', { e });
  });
