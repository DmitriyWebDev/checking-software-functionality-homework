const { COMMON_DATA } = require("./constants");
const { ERROR_TEXTS_MAP, MAX_NUMBER_OF_DECIMAL_PLACES } = COMMON_DATA;

function withOperandsValidation(baseFunction) {
  return function() {
    const validOperands = Object.values(getValidatedOperands.apply(this, arguments));

    return baseFunction.apply(this, validOperands);
  }
}

function withValueRounding(baseFunction) {
  return function() {
    const value = baseFunction.apply(this, arguments);

    return parseFloat(value.toFixed(MAX_NUMBER_OF_DECIMAL_PLACES));
  }
}

function getValidatedOperands(a, b) {
  const aParsed = parseFloat(a);
  const bParsed = parseFloat(b);

  const isFirstOperandNumber = !Number.isNaN(aParsed);
  const isSecondOperandNumber = !Number.isNaN(bParsed);

  if (!isFirstOperandNumber && !isSecondOperandNumber) {
    throw new Error(ERROR_TEXTS_MAP.bothOperandsAreNotNumbers);
  }

  if (!isFirstOperandNumber) {
    throw new Error(ERROR_TEXTS_MAP.firstOperandIsNotNumber);
  }

  if (!isSecondOperandNumber) {
    throw new Error(ERROR_TEXTS_MAP.secondOperandIsNotNumber);
  }

  return {a: aParsed, b: bParsed};
}

const OPERATION_DECORATORS = [withOperandsValidation, withValueRounding];

const composeFunctions = (...funcs) => {
  return funcs.reduce((a, b) => (...args) => a(b(...args)), arg => arg);
}

const calculationUtilsMap = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => {
    if (b === 0) {
      throw new Error(ERROR_TEXTS_MAP.isDivisionByZero);
    }

    return a / b;
  },
  power: (a, b) => Math.pow(a, b),
  hypotenuse: function(a, b) {
    return Math.sqrt(this.add(this.power(a, 2), this.power(b, 2)));
  },
  angleA: function(a, b) {
    return Math.asin(this.divide(a, this.hypotenuse(a, b))) * (180 / Math.PI);
  },
  angleB: function(a, b) {
    return Math.asin(this.divide(b, this.hypotenuse(a, b))) * (180 / Math.PI);
  }
};

module.exports = {
  composeFunctions,
  calculationUtilsMap,
  OPERATION_DECORATORS,
};
