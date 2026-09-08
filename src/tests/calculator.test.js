const assert = require("node:assert/strict");
const test = require("node:test");

const {
  addition,
  subtraction,
  multiplication,
  division,
  calculate,
  parseArguments,
} = require("../calculator");

test("addition matches the example: 2 + 3 = 5", () => {
  assert.equal(addition(2, 3), 5);
});

test("subtraction matches the example: 10 - 4 = 6", () => {
  assert.equal(subtraction(10, 4), 6);
});

test("multiplication matches the example: 45 * 2 = 90", () => {
  assert.equal(multiplication(45, 2), 90);
});

test("division matches the example: 20 / 5 = 4", () => {
  assert.equal(division(20, 5), 4);
});

test("addition handles negative and decimal numbers", () => {
  assert.equal(addition(-2.5, 1.5), -1);
});

test("subtraction handles negative numbers", () => {
  assert.equal(subtraction(-2, -5), 3);
});

test("multiplication handles zero and negative numbers", () => {
  assert.equal(multiplication(-7, 0), -0);
  assert.equal(multiplication(-7, -2), 14);
});

test("division handles decimal results", () => {
  assert.equal(division(7, 2), 3.5);
});

test("division by zero throws a clear error", () => {
  assert.throws(() => division(10, 0), {
    name: "RangeError",
    message: "Cannot divide by zero.",
  });
});

test("operations reject non-finite operands", () => {
  for (const operation of [addition, subtraction, multiplication, division]) {
    assert.throws(() => operation(Number.NaN, 1), {
      name: "TypeError",
      message: "Both operands must be finite numbers.",
    });
    assert.throws(() => operation(1, Number.POSITIVE_INFINITY), {
      name: "TypeError",
      message: "Both operands must be finite numbers.",
    });
  }
});

test("calculate supports symbols and operation names", () => {
  assert.equal(calculate(2, "+", 3), 5);
  assert.equal(calculate(10, "subtraction", 4), 6);
  assert.equal(calculate(45, "x", 2), 90);
  assert.equal(calculate(20, "division", 5), 4);
});

test("calculate rejects unsupported operations", () => {
  assert.throws(() => calculate(2, "%", 3), {
    name: "Error",
    message: /Unsupported operation/,
  });
});

test("parseArguments supports positional CLI syntax", () => {
  assert.deepEqual(parseArguments(["2", "+", "3"]), {
    a: 2,
    operation: "+",
    b: 3,
  });
});

test("parseArguments supports --operation CLI syntax", () => {
  assert.deepEqual(parseArguments(["--operation", "division", "20", "5"]), {
    a: 20,
    operation: "division",
    b: 5,
  });
});

test("parseArguments rejects missing or invalid input", () => {
  assert.throws(() => parseArguments(["2", "+"]), /Usage:/);
  assert.throws(
    () => parseArguments(["two", "+", "3"]),
    {
      name: "TypeError",
      message: "Both operands must be finite numbers.",
    },
  );
});
