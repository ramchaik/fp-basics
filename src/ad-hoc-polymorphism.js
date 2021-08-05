// Ad hoc polymorphism
// A different implementation based on the type

const map = (context, fn) => context.map(fn);
const duplicate = (context, fn) => context.duplicate(fn);

const someString = '333';
const someArray = [1, 2, 3, 4, 5];

String.prototype.map = function (fn) {
  return this.split('').map(fn).join('');
};

String.prototype.duplicate = function () {
  return this.split('').duplicate().join('');
};

Array.prototype.duplicate = function () {
  return [...this, ...this];
};

// custom data type
const myDataType = {
  value: '_xyz_',
  of: function (value) {
    const newInstance = Object.create(this);
    newInstance.value = value;
    return newInstance;
  },
  map: function () {
    return this;
  },
  double: function () {
    const newValue = this.value.split('').duplicate().join('');
    return this.of(newValue);
  },
  log: function () {
    console.log(this.value);
  },
};

// Adapter to normalize myDataType to the pipeline
const myDataAdapter = (instance) => ({
  duplicate: instance.double,
  ...instance,
});

const inc = (c) => Number(c) + 1;
const pipeline = (x) => duplicate(map(x, inc));

console.log('array out :>> ', pipeline(someArray));
console.log('string out :>> ', pipeline(someString));
console.log('myDataType out :>> ', pipeline(myDataAdapter(myDataType)));
