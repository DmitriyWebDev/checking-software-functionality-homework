const {COMMON_DATA} = require("./constants");
const {errorTextMap} = COMMON_DATA;

function getValidatedOperands(a, b) {
  const aParsed = parseFloat(a);
  const bParsed = parseFloat(b);

  const isFirstOperandNumber = !Number.isNaN(aParsed);
  const isSecondOperandNumber = !Number.isNaN(bParsed);

  if (!isFirstOperandNumber && !isSecondOperandNumber) {
    throw new Error(errorTextMap.bothOperandsAreNotNumbers);
  }

  if (!isFirstOperandNumber) {
    throw new Error(errorTextMap.firstOperandIsNotNumber);
  }

  if (!isSecondOperandNumber) {
    throw new Error(errorTextMap.secondOperandIsNotNumber);
  }

  return {a: aParsed, b: bParsed};
}

function withOperandsValidation(baseFunction) {
  return function() {
    const validOperands = Object.values(getValidatedOperands.apply(this, arguments));

    return baseFunction.apply(this, validOperands);
  }
}

const calculationUtilsMap = {
  add: (a, b) => a + b,
  subtract: (a, b) => a - b,
  multiply: (a, b) => a * b,
  divide: (a, b) => {
    if (b === 0) {
      throw new Error(errorTextMap.isDivisionByZero);
    }
    return a / b;
  },
  power: (a, b) => Math.pow(a, b),
  hypotenuse: (a, b) => Math.sqrt(a*a + b*b),
  angleA: (a, b) => Math.asin(a / Math.sqrt(a*a + b*b)) * (180 / Math.PI),
  angleB: (a, b) => Math.asin(b / Math.sqrt(a*a + b*b)) * (180 / Math.PI)
};

module.exports = {
  withOperandsValidation,
  calculationUtilsMap,
};
