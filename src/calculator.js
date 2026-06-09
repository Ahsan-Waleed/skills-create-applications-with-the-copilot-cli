#!/usr/bin/env node

/**
 * Node.js CLI Calculator App
 * 
 * Supported Basic Operations:
 * - Addition: Adds two numbers together
 * - Subtraction: Subtracts the second number from the first
 * - Multiplication: Multiplies two numbers
 * - Division: Divides the first number by the second
 * 
 * Supported Advanced Operations:
 * - Modulo: Returns the remainder after division
 * - Power: Raises a number to a power (exponentiation)
 * - Square Root: Returns the square root of a number
 * 
 * Usage:
 *   node calculator.js <operand1> <operator> <operand2>
 * 
 * Examples:
 *   node calculator.js 10 + 5      # Output: 15
 *   node calculator.js 20 - 8      # Output: 12
 *   node calculator.js 6 "*" 7     # Output: 42
 *   node calculator.js 100 / 4     # Output: 25
 *   node calculator.js 17 % 5      # Output: 2
 *   node calculator.js 2 ^ 8       # Output: 256
 */

/**
 * Performs basic arithmetic operations
 * @param {number} num1 - First operand
 * @param {string} operator - Operator ('+', '-', '*', '/')
 * @param {number} num2 - Second operand
 * @returns {number} Result of the operation
 */
function calculate(num1, operator, num2) {
  const operand1 = parseFloat(num1);
  const operand2 = parseFloat(num2);

  if (isNaN(operand1) || isNaN(operand2)) {
    throw new Error('Invalid operands. Please provide valid numbers.');
  }

  switch (operator) {
    case '+':
      // Addition: sum of two numbers
      return operand1 + operand2;

    case '-':
      // Subtraction: difference of two numbers
      return operand1 - operand2;

    case '*':
      // Multiplication: product of two numbers
      return operand1 * operand2;

    case '/':
      // Division: quotient of two numbers
      if (operand2 === 0) {
        throw new Error('Cannot divide by zero.');
      }
      return operand1 / operand2;

    default:
      throw new Error(`Invalid operator: ${operator}. Supported operators are: +, -, *, /`);
  }
}

/**
 * Calculates the modulo (remainder) of two numbers
 * @param {number} a - The dividend
 * @param {number} b - The divisor
 * @returns {number} The remainder of a divided by b
 */
function modulo(a, b) {
  const dividend = parseFloat(a);
  const divisor = parseFloat(b);

  if (isNaN(dividend) || isNaN(divisor)) {
    throw new Error('Invalid operands. Please provide valid numbers.');
  }

  if (divisor === 0) {
    throw new Error('Cannot perform modulo with divisor of zero.');
  }

  return dividend % divisor;
}

/**
 * Raises a base number to a power (exponentiation)
 * @param {number} base - The base number
 * @param {number} exponent - The exponent
 * @returns {number} base raised to the power of exponent
 */
function power(base, exponent) {
  const baseNum = parseFloat(base);
  const expNum = parseFloat(exponent);

  if (isNaN(baseNum) || isNaN(expNum)) {
    throw new Error('Invalid operands. Please provide valid numbers.');
  }

  return Math.pow(baseNum, expNum);
}

/**
 * Calculates the square root of a number
 * @param {number} n - The number to find the square root of
 * @returns {number} The square root of n
 */
function squareRoot(n) {
  const num = parseFloat(n);

  if (isNaN(num)) {
    throw new Error('Invalid operand. Please provide a valid number.');
  }

  if (num < 0) {
    throw new Error('Cannot calculate square root of a negative number.');
  }

  return Math.sqrt(num);
}

// Main execution
function main() {
  const args = process.argv.slice(2);

  if (args.length !== 3) {
    console.error('Usage: node calculator.js <operand1> <operator> <operand2>');
    console.error('');
    console.error('Supported operators:');
    console.error('  + : Addition');
    console.error('  - : Subtraction');
    console.error('  * : Multiplication');
    console.error('  / : Division');
    process.exit(1);
  }

  const [operand1, operator, operand2] = args;

  try {
    const result = calculate(operand1, operator, operand2);
    console.log(result);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Export the calculate function and advanced math functions for testing
module.exports = { calculate, modulo, power, squareRoot };

// Run main if executed directly
if (require.main === module) {
  main();
}
