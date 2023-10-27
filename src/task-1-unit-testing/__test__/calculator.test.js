const { calculatorApi } = require('../calculatorApi');
const { COMMON_DATA } = require("../constants");
const { errorTextMap } = COMMON_DATA;

describe('calculatorApi', () => {
  const calculator = calculatorApi;
  const operationsKeys = Object.keys(calculator);

  describe('Если операнды невалидные', () => {
    describe('Первый операнд не является числом или литералом строки, выражающим число', () => {
      const invalidOperands = ['not a number', 11];
      const cases = operationsKeys.reduce((result, operationKey) => {
        result.push([operationKey, invalidOperands]);

        return result;
      }, []);

      test.each(cases)('%p', (operationKey, operands) => {
        expect(() => {
          calculator[operationKey].apply(null, operands)
        }).toThrow(new Error(errorTextMap.firstOperandIsNotNumber));
      });
    });

    describe('Второй операнд не является числом или литералом строки, выражающим число', () => {
      const invalidOperands = [777, null];
      const cases = operationsKeys.reduce((result, operationKey) => {
        result.push([operationKey, invalidOperands]);

        return result;
      }, []);

      test.each(cases)('%p', (operationKey, operands) => {
        expect(() => {
          calculator[operationKey].apply(null, operands)
        }).toThrow(new Error(errorTextMap.secondOperandIsNotNumber));
      });
    });

    describe('Оба операнда не являются числами или литералами строк, выражающих числа', () => {
      const invalidOperands = ['///', {}];
      const cases = operationsKeys.reduce((result, operationKey) => {
        result.push([operationKey, invalidOperands]);

        return result;
      }, []);

      test.each(cases)('%p', (operationKey, operands) => {
        expect(() => {
          calculator[operationKey].apply(null, operands)
        }).toThrow(new Error(errorTextMap.bothOperandsAreNotNumbers));
      });
    });

    describe('Производится деление на ноль', () => {
      expect(() => {
        calculator.divide(10, 0);
      }).toThrow(new Error(errorTextMap.isDivisionByZero));
    });
  });

  test('adds 1 + 2 to equal 3', () => {
    expect(calculator.add(1, 2)).toBe(3);
  });

  test('subtract 5 - 3 to equal 2', () => {
    expect(calculator.subtract(5, 3)).toBe(2);
  });

  test('multiply 4 * 2 to equal 8', () => {
    expect(calculator.multiply(4, 2)).toBe(8);
  });

  test('divide 8 / 2 to equal 4', () => {
    expect(calculator.divide(8, 2)).toBe(4);
  });

  test('division by zero should throw an error', () => {
    expect(() => calculator.divide(8, 0)).toThrow("Ошибка: деление на ноль");
  });

  test('2 to the power of 3 to equal 8', () => {
    expect(calculator.power(2, 3)).toBe(8);
  });

  test('hypotenuse of 3 and 4 to equal 5', () => {
    expect(calculator.hypotenuse(3, 4)).toBeCloseTo(5);
  });

  test('angleA of 3 and 4 should be correct', () => {
    expect(calculator.angleA(3, 4)).toBeCloseTo(36.87, 2);
  });

  test('angleB of 3 and 4 should be correct', () => {
    expect(calculator.angleB(3, 4)).toBeCloseTo(53.13, 2);
  });
})
