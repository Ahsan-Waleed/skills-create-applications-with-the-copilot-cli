#!/usr/bin/env node

/**
 * Node.js CLI Calculator App
 * 
 * Supported Operations:
 * - Addition: Adds two numbers together
 * - Subtraction: Subtracts the second number from the first
 * - Multiplication: Multiplies two numbers
 * - Division: Divides the first number by the second
 * 
 * Usage:
 *   node calculator.js <operand1> <operator> <operand2>
 * 
 * Examples:
 *   node calculator.js 10 + 5      # Output: 15
 *   node calculator.js 20 - 8      # Output: 12
 *   node calculator.js 6 "*" 7     # Output: 42
 *   node calculator.js 100 / 4     # Output: 25
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

// Export the calculate function for testing
module.exports = { calculate };

// Run main if executed directly
if (require.main === module) {
  main();
}
