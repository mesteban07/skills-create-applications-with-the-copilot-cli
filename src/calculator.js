#!/usr/bin/env node

/**
 * Node.js CLI calculator supporting only:
 * - addition (+)
 * - subtraction (-)
 * - multiplication (* or x)
 * - division (/)
 */

function assertNumbers(a, b) {
  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new TypeError("Both operands must be finite numbers.");
  }
}

function addition(a, b) {
  assertNumbers(a, b);
  return a + b;
}

function subtraction(a, b) {
  assertNumbers(a, b);
  return a - b;
}

function multiplication(a, b) {
  assertNumbers(a, b);
  return a * b;
}

function division(a, b) {
  assertNumbers(a, b);
  if (b === 0) {
    throw new RangeError("Cannot divide by zero.");
  }
  return a / b;
}

function calculate(a, operator, b) {
  switch (operator) {
    case "+":
    case "add":
    case "addition":
      return addition(a, b);
    case "-":
    case "subtract":
    case "subtraction":
      return subtraction(a, b);
    case "*":
    case "x":
    case "multiply":
    case "multiplication":
      return multiplication(a, b);
    case "/":
    case "divide":
    case "division":
      return division(a, b);
    default:
      throw new Error(
        "Unsupported operation. Use addition (+), subtraction (-), multiplication (* or x), or division (/).",
      );
  }
}

function parseArguments(args) {
  if (args[0] === "--operation" || args[0] === "-o") {
    if (args.length < 4) {
      throw new Error(
        "Usage: node src/calculator.js <number> <operator> <number>\n" +
          "   or: node src/calculator.js --operation <operation> <number> <number>",
      );
    }

    const a = Number(args[2]);
    const b = Number(args[3]);
    if (!Number.isFinite(a) || !Number.isFinite(b)) {
      throw new TypeError("Both operands must be finite numbers.");
    }

    return { a, operation: args[1], b };
  }

  if (args.length < 3) {
    throw new Error(
      "Usage: node src/calculator.js <number> <operator> <number>\n" +
        "   or: node src/calculator.js --operation <operation> <number> <number>",
    );
  }

  const [first, operation, second] = args;
  const a = Number(first);
  const b = Number(second);

  if (!Number.isFinite(a) || !Number.isFinite(b)) {
    throw new TypeError("Both operands must be finite numbers.");
  }

  return { a, operation, b };
}

function main() {
  try {
    const { a, operation, b } = parseArguments(process.argv.slice(2));
    console.log(calculate(a, operation.toLowerCase(), b));
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  addition,
  subtraction,
  multiplication,
  division,
  calculate,
  parseArguments,
};
