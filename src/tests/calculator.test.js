/**
 * Unit Tests for Node.js CLI Calculator
 * 
 * Test Suite Coverage:
 * - Addition operations
 * - Subtraction operations
 * - Multiplication operations
 * - Division operations
 * - Modulo operations (remainder)
 * - Power operations (exponentiation)
 * - Square root operations
 * - Edge cases (division by zero, negative square roots, invalid inputs)
 * - Decimal number handling
 */

const { calculate, modulo, power, squareRoot } = require('../calculator');

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

describe('Calculator - Advanced Operations', () => {
  
  describe('Modulo (Remainder)', () => {
    test('should calculate modulo with positive numbers: 5 % 2 = 1', () => {
      expect(modulo(5, 2)).toBe(1);
    });

    test('should calculate modulo: 17 % 5 = 2', () => {
      expect(modulo(17, 5)).toBe(2);
    });

    test('should calculate modulo with negative dividend: -17 % 5 = -2', () => {
      expect(modulo(-17, 5)).toBe(-2);
    });

    test('should calculate modulo with negative divisor: 17 % -5 = 2', () => {
      expect(modulo(17, -5)).toBe(2);
    });

    test('should calculate modulo with two negative numbers: -17 % -5 = -2', () => {
      expect(modulo(-17, -5)).toBe(-2);
    });

    test('should return zero when dividend is divisible: 10 % 5 = 0', () => {
      expect(modulo(10, 5)).toBe(0);
    });

    test('should handle decimal modulo: 5.5 % 2 = 1.5', () => {
      expect(modulo(5.5, 2)).toBeCloseTo(1.5);
    });

    test('should throw error on modulo by zero', () => {
      expect(() => modulo(10, 0)).toThrow('Cannot perform modulo with divisor of zero.');
    });

    test('should throw error on invalid first operand', () => {
      expect(() => modulo('abc', 5)).toThrow('Invalid operands. Please provide valid numbers.');
    });

    test('should throw error on invalid second operand', () => {
      expect(() => modulo(10, 'xyz')).toThrow('Invalid operands. Please provide valid numbers.');
    });
  });

  describe('Power (Exponentiation)', () => {
    test('should calculate power with positive numbers: 2 ^ 3 = 8', () => {
      expect(power(2, 3)).toBe(8);
    });

    test('should calculate power: 2 ^ 8 = 256', () => {
      expect(power(2, 8)).toBe(256);
    });

    test('should calculate power with base zero: 0 ^ 5 = 0', () => {
      expect(power(0, 5)).toBe(0);
    });

    test('should calculate power with exponent zero: 5 ^ 0 = 1', () => {
      expect(power(5, 0)).toBe(1);
    });

    test('should calculate power with base one: 1 ^ 10 = 1', () => {
      expect(power(1, 10)).toBe(1);
    });

    test('should calculate negative base to even power: (-2) ^ 4 = 16', () => {
      expect(power(-2, 4)).toBe(16);
    });

    test('should calculate negative base to odd power: (-2) ^ 3 = -8', () => {
      expect(power(-2, 3)).toBe(-8);
    });

    test('should calculate power with fractional exponent: 4 ^ 0.5 = 2', () => {
      expect(power(4, 0.5)).toBe(2);
    });

    test('should calculate power with negative exponent: 2 ^ -2 = 0.25', () => {
      expect(power(2, -2)).toBe(0.25);
    });

    test('should handle large numbers: 10 ^ 6 = 1000000', () => {
      expect(power(10, 6)).toBe(1000000);
    });

    test('should throw error on invalid base', () => {
      expect(() => power('abc', 3)).toThrow('Invalid operands. Please provide valid numbers.');
    });

    test('should throw error on invalid exponent', () => {
      expect(() => power(2, 'xyz')).toThrow('Invalid operands. Please provide valid numbers.');
    });
  });

  describe('Square Root', () => {
    test('should calculate square root: √16 = 4', () => {
      expect(squareRoot(16)).toBe(4);
    });

    test('should calculate square root: √25 = 5', () => {
      expect(squareRoot(25)).toBe(5);
    });

    test('should calculate square root of zero: √0 = 0', () => {
      expect(squareRoot(0)).toBe(0);
    });

    test('should calculate square root of one: √1 = 1', () => {
      expect(squareRoot(1)).toBe(1);
    });

    test('should calculate square root of decimal: √2 ≈ 1.414', () => {
      expect(squareRoot(2)).toBeCloseTo(1.414, 3);
    });

    test('should calculate square root of decimal number: √6.25 = 2.5', () => {
      expect(squareRoot(6.25)).toBe(2.5);
    });

    test('should calculate square root of very small number: √0.04 = 0.2', () => {
      expect(squareRoot(0.04)).toBe(0.2);
    });

    test('should calculate square root of very large number: √10000 = 100', () => {
      expect(squareRoot(10000)).toBe(100);
    });

    test('should throw error on negative number: √-4', () => {
      expect(() => squareRoot(-4)).toThrow('Cannot calculate square root of a negative number.');
    });

    test('should throw error on negative decimal: √-2.5', () => {
      expect(() => squareRoot(-2.5)).toThrow('Cannot calculate square root of a negative number.');
    });

    test('should throw error on invalid operand', () => {
      expect(() => squareRoot('abc')).toThrow('Invalid operand. Please provide a valid number.');
    });
  });

  describe('Advanced Operations - Complex Scenarios', () => {
    test('should combine power and modulo: (2 ^ 4) % 5 = 16 % 5 = 1', () => {
      const powerResult = power(2, 4);
      const moduloResult = modulo(powerResult, 5);
      expect(moduloResult).toBe(1);
    });

    test('should combine square root and addition: √16 + 9 = 4 + 9 = 13', () => {
      const sqrtResult = squareRoot(16);
      const addResult = calculate(sqrtResult, '+', 9);
      expect(addResult).toBe(13);
    });

    test('should combine square root and multiplication: √25 * 2 = 5 * 2 = 10', () => {
      const sqrtResult = squareRoot(25);
      const multResult = calculate(sqrtResult, '*', 2);
      expect(multResult).toBe(10);
    });

    test('should calculate power of square root: (√16) ^ 2 = 4 ^ 2 = 16', () => {
      const sqrtResult = squareRoot(16);
      const powerResult = power(sqrtResult, 2);
      expect(powerResult).toBe(16);
    });

    test('should combine modulo with other operations: (10 + 7) % 6 = 17 % 6 = 5', () => {
      const addResult = calculate(10, '+', 7);
      const moduloResult = modulo(addResult, 6);
      expect(moduloResult).toBe(5);
    });
  });
});
