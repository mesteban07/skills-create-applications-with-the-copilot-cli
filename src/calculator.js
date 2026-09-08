#!/usr/bin/env node

/**
 * Node.js CLI calculator supporting:
 * - addition (+)
 * - subtraction (-)
 * - multiplication (* or x)
 * - division (/)
 * - modulo (%)
 * - exponentiation (^ or **)
 * - square root (sqrt)
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

function modulo(a, b) {
  assertNumbers(a, b);
  if (b === 0) {
    throw new RangeError("Cannot calculate a modulo zero.");
  }
  return a % b;
}

function power(base, exponent) {
  assertNumbers(base, exponent);
  return base ** exponent;
}

function squareRoot(n) {
  if (!Number.isFinite(n)) {
    throw new TypeError("The value must be a finite number.");
  }
  if (n < 0) {
    throw new RangeError("Cannot calculate the square root of a negative number.");
  }
  return Math.sqrt(n);
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
    case "%":
    case "mod":
    case "modulo":
      return modulo(a, b);
    case "^":
    case "**":
    case "pow":
    case "power":
      return power(a, b);
    case "sqrt":
    case "square-root":
    case "squareroot":
    case "square root":
      return squareRoot(a);
    default:
      throw new Error(
        "Unsupported operation. Use addition (+), subtraction (-), multiplication (* or x), division (/), modulo (%), power (^ or **), or square root (sqrt).",
      );
  }
}

function parseArguments(args) {
  if (args[0] === "--operation" || args[0] === "-o") {
    const operation = args[1]?.toLowerCase();
    const isSquareRoot = ["sqrt", "square-root", "squareroot", "square root"].includes(
      operation,
    );
    const requiredLength = isSquareRoot ? 3 : 4;

    if (args.length < requiredLength) {
      throw new Error(
        "Usage: node src/calculator.js <number> <operator> <number>\n" +
          "   or: node src/calculator.js --operation <operation> <number> [<number>]",
      );
    }

    const a = Number(args[2]);
    if (!Number.isFinite(a)) {
      throw new TypeError("Both operands must be finite numbers.");
    }

    if (isSquareRoot) {
      return { a, operation, b: undefined };
    }

    const b = Number(args[3]);
    if (!Number.isFinite(b)) {
      throw new TypeError("Operands must be finite numbers.");
    }

    return { a, operation, b };
  }

  const operation = args[1]?.toLowerCase();
  const isSquareRoot = ["sqrt", "square-root", "squareroot", "square root"].includes(
    operation,
  );
  const requiredLength = isSquareRoot ? 2 : 3;

  if (args.length < requiredLength) {
    throw new Error(
      "Usage: node src/calculator.js <number> <operator> <number>\n" +
        "   or: node src/calculator.js --operation <operation> <number> [<number>]",
    );
  }

  const [first, , second] = args;
  const a = Number(first);

  if (!Number.isFinite(a)) {
    throw new TypeError("Both operands must be finite numbers.");
  }

  if (isSquareRoot) {
    return { a, operation, b: undefined };
  }

  const b = Number(second);
  if (!Number.isFinite(b)) {
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
  modulo,
  power,
  squareRoot,
  calculate,
  parseArguments,
};
