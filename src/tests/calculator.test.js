/**
 * Unit Tests for Node.js CLI Calculator
 * 
 * Test Suite Coverage:
 * - Addition operations
 * - Subtraction operations
 * - Multiplication operations
 * - Division operations
 * - Edge cases (division by zero, invalid inputs)
 * - Decimal number handling
 */

const { calculate } = require('../calculator');

describe('Calculator - Basic Arithmetic Operations', () => {
  
  describe('Addition', () => {
    test('should add two positive numbers: 2 + 3 = 5', () => {
      expect(calculate(2, '+', 3)).toBe(5);
    });

    test('should add two negative numbers: -5 + -3 = -8', () => {
      expect(calculate(-5, '+', -3)).toBe(-8);
    });

    test('should add positive and negative numbers: 10 + -4 = 6', () => {
      expect(calculate(10, '+', -4)).toBe(6);
    });

    test('should add zero to a number: 0 + 5 = 5', () => {
      expect(calculate(0, '+', 5)).toBe(5);
    });

    test('should add decimal numbers: 2.5 + 3.5 = 6', () => {
      expect(calculate(2.5, '+', 3.5)).toBe(6);
    });
  });

  describe('Subtraction', () => {
    test('should subtract two positive numbers: 10 - 4 = 6', () => {
      expect(calculate(10, '-', 4)).toBe(6);
    });

    test('should subtract negative from positive: 10 - (-4) = 14', () => {
      expect(calculate(10, '-', -4)).toBe(14);
    });

    test('should subtract positive from negative: -10 - 4 = -14', () => {
      expect(calculate(-10, '-', 4)).toBe(-14);
    });

    test('should subtract two negative numbers: -5 - (-3) = -2', () => {
      expect(calculate(-5, '-', -3)).toBe(-2);
    });

    test('should subtract zero from a number: 5 - 0 = 5', () => {
      expect(calculate(5, '-', 0)).toBe(5);
    });

    test('should subtract decimal numbers: 10.5 - 4.3 = 6.2', () => {
      expect(calculate(10.5, '-', 4.3)).toBeCloseTo(6.2);
    });
  });

  describe('Multiplication', () => {
    test('should multiply two positive numbers: 45 * 2 = 90', () => {
      expect(calculate(45, '*', 2)).toBe(90);
    });

    test('should multiply positive and negative: 6 * (-7) = -42', () => {
      expect(calculate(6, '*', -7)).toBe(-42);
    });

    test('should multiply two negative numbers: (-5) * (-3) = 15', () => {
      expect(calculate(-5, '*', -3)).toBe(15);
    });

    test('should multiply by zero: 5 * 0 = 0', () => {
      expect(calculate(5, '*', 0)).toBe(0);
    });

    test('should multiply by one: 5 * 1 = 5', () => {
      expect(calculate(5, '*', 1)).toBe(5);
    });

    test('should multiply decimal numbers: 2.5 * 4 = 10', () => {
      expect(calculate(2.5, '*', 4)).toBe(10);
    });
  });

  describe('Division', () => {
    test('should divide two positive numbers: 20 / 5 = 4', () => {
      expect(calculate(20, '/', 5)).toBe(4);
    });

    test('should divide positive by negative: 20 / (-5) = -4', () => {
      expect(calculate(20, '/', -5)).toBe(-4);
    });

    test('should divide two negative numbers: (-20) / (-5) = 4', () => {
      expect(calculate(-20, '/', -5)).toBe(4);
    });

    test('should divide zero by a number: 0 / 5 = 0', () => {
      expect(calculate(0, '/', 5)).toBe(0);
    });

    test('should divide a number by one: 5 / 1 = 5', () => {
      expect(calculate(5, '/', 1)).toBe(5);
    });

    test('should divide decimal numbers: 10 / 2.5 = 4', () => {
      expect(calculate(10, '/', 2.5)).toBe(4);
    });

    test('should produce decimal result: 5 / 2 = 2.5', () => {
      expect(calculate(5, '/', 2)).toBe(2.5);
    });
  });

  describe('Edge Cases and Error Handling', () => {
    test('should throw error on division by zero', () => {
      expect(() => calculate(10, '/', 0)).toThrow('Cannot divide by zero.');
    });

    test('should throw error on invalid operator', () => {
      expect(() => calculate(10, '%', 5)).toThrow('Invalid operator: %. Supported operators are: +, -, *, /');
    });

    test('should throw error on invalid first operand', () => {
      expect(() => calculate('abc', '+', 5)).toThrow('Invalid operands. Please provide valid numbers.');
    });

    test('should throw error on invalid second operand', () => {
      expect(() => calculate(10, '+', 'xyz')).toThrow('Invalid operands. Please provide valid numbers.');
    });

    test('should handle string numbers correctly: "10" + "5" = 15', () => {
      expect(calculate('10', '+', '5')).toBe(15);
    });

    test('should handle large numbers', () => {
      expect(calculate(1000000, '*', 1000000)).toBe(1000000000000);
    });

    test('should handle very small decimal numbers', () => {
      expect(calculate(0.1, '+', 0.2)).toBeCloseTo(0.3);
    });

    test('should handle negative zero correctly', () => {
      expect(calculate(-5, '+', 5)).toBe(0);
    });
  });

  describe('Complex Scenarios', () => {
    test('should chain multiple operations correctly', () => {
      // (10 + 5) * 2 = 30
      const result1 = calculate(10, '+', 5);
      const result2 = calculate(result1, '*', 2);
      expect(result2).toBe(30);
    });

    test('should handle operation order: multiply then add', () => {
      // 5 * 3 = 15, then 15 + 10 = 25
      const result1 = calculate(5, '*', 3);
      const result2 = calculate(result1, '+', 10);
      expect(result2).toBe(25);
    });

    test('should handle operation order: divide then subtract', () => {
      // 20 / 4 = 5, then 10 - 5 = 5
      const result1 = calculate(20, '/', 4);
      const result2 = calculate(10, '-', result1);
      expect(result2).toBe(5);
    });
  });
});
