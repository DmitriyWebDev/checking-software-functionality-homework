const { calculatorApi } = require('../calculatorApi');
const { COMMON_DATA } = require("../constants");
const { ERROR_TEXTS_MAP } = COMMON_DATA;

describe('calculatorApi', () => {
  const calculator = calculatorApi;
  const operationsKeys = Object.keys(calculator);

  describe('Если операнды невалидные для любой операции', () => {
    describe('Первый операнд не является числом или литералом строки, выражающим число', () => {
      const invalidOperands = ['not a number', 11];
      const cases = operationsKeys.reduce((result, operationKey) => {
        result.push([operationKey, invalidOperands]);

        return result;
      }, []);

      test.each(cases)('%p', (operationKey, operands) => {
        expect(() => {
          calculator[operationKey].apply(null, operands)
        }).toThrow(new Error(ERROR_TEXTS_MAP.firstOperandIsNotNumber));
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
        }).toThrow(new Error(ERROR_TEXTS_MAP.secondOperandIsNotNumber));
      });
    });

    describe('Оба операнда не являются числами или литералами строк, выражающими числа', () => {
      const invalidOperands = ['///', {}];
      const cases = operationsKeys.reduce((result, operationKey) => {
        result.push([operationKey, invalidOperands]);

        return result;
      }, []);

      test.each(cases)('%p', (operationKey, operands) => {
        expect(() => {
          calculator[operationKey].apply(null, operands)
        }).toThrow(new Error(ERROR_TEXTS_MAP.bothOperandsAreNotNumbers));
      });
    });

    describe('Производится деление на ноль', () => {
      expect(() => {
        calculator.divide(10, 0);
      }).toThrow(new Error(ERROR_TEXTS_MAP.isDivisionByZero));
    });
  });

  describe('Все операции работают корректно', () => {
    describe('Сложение', () => {
      test('С целыми числами', () => {
        expect(calculator.add(1, 2)).toBe(3);
      });

      test('С дробными числами', () => {
        expect(calculator.add(1.1000, 2.778)).toBe(3.878);
      });

      test('С целыми и дробными числами', () => {
        expect(calculator.add(11.7, 2)).toBe(13.7);
      });
    });

    describe('Вычитание', () => {
      test('С целыми числами', () => {
        expect(calculator.subtract(5, 3)).toBe(2);
      });

      test('С дробными числами', () => {
        expect(calculator.subtract(5.1, 3.7)).toBe(1.4);
      });

      test('С целыми и дробными числами', () => {
        expect(calculator.subtract(10.771, 7.00081)).toBe(3.77019);
      });
    });

    describe('Умножение', () => {
      test('С целыми числами', () => {
        expect(calculator.multiply(4, 2)).toBe(8);
      });

      test('С дробными числами', () => {
        expect(calculator.multiply(4.5, 2.31)).toBe(10.395);
        expect(calculator.multiply(1.22, 3.11)).toBe(3.7942);
      });

      test('С целыми и дробными числами', () => {
        expect(calculator.multiply(4.80, 2)).toBe(9.6);
      });
    });

    describe('Деление', () => {
      test('С целыми числами', () => {
        expect(calculator.divide(8, 2)).toBe(4);
      });

      test('С дробными числами', () => {
        expect(calculator.divide(8.5, 2.22)).toBe(3.82882882883);
      });

      test('С целыми и дробными числами', () => {
        expect(calculator.divide(8.78, 2)).toBe(4.39);
      });
    });

    describe('Возведение первого аргумента в степень, равной значению второго аргумента', () => {
      test('С целыми числами', () => {
        expect(calculator.power(2, 3)).toBe(8);
      });

      test('С дробными числами', () => {
        expect(calculator.power(2.5, 3.7)).toBe(29.67413253642);
      });

      test('С целыми и дробными числами', () => {
        expect(calculator.power(27.5, 3)).toBe(20796.875);
      });
    });

    describe('Вычисление длины гипотенузы', () => {
      test('С целыми числами', () => {
        expect(calculator.hypotenuse(3, 4)).toBe(5);
      });

      test('С дробными числами', () => {
        expect(calculator.hypotenuse(3.77, 4.5)).toBe(5.87051105101);
      });

      test('С целыми и дробными числами', () => {
        expect(calculator.hypotenuse(3.1, 4)).toBe(5.06063237155);
      });
    });

    describe('Вычисление величины угла для первого аргумента', () => {
      test('С целыми числами', () => {
        expect(calculator.angleA(3, 4)).toBe(36.86989764584);
      });

      test('С дробными числами', () => {
        expect(calculator.angleA(44.2, 10.8)).toBe(76.26916824294);
      });

      test('С целыми и дробными числами', () => {
        expect(calculator.angleA(50.5, 10)).toBe(78.79920221209);
      });
    });

    describe('Вычисление величины угла для второго аргумента', () => {
      test('С целыми числами', () => {
        expect(calculator.angleB(3, 4)).toBe(53.13010235416);
      });

      test('С дробными числами', () => {
        expect(calculator.angleB(44.2, 10.8)).toBe(13.73083175763);
      });

      test('С целыми и дробными числами', () => {
        expect(calculator.angleB(50.5, 10)).toBe(11.20079778814);
      });
    });
  });
});
