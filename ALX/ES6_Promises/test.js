const isNumeric = (value) => {
  return ["number", "bigint"].includes(typeof value);
};

const sum = (...values) => {
  if (!values.every(isNumeric)) {
    throw new TypeError("Can only add numbers");
  }

  return values.reduce((a, b) => a + b);
};

console.log(sum(1, 2, 3, 4));

try {
  sum(1, 2, "10");
} catch (err) {
  console.error(err);
}
