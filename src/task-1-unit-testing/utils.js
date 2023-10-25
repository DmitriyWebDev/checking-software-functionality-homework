function getValidatedOperands(a, b) {
  const aParsed = parseFloat(a);
  const bParsed = parseFloat(b);

  if (Number.isNaN(aParsed)) {
    throw new Error("Ошибка: первый операнд не является числом");
  }

  if (Number.isNaN(bParsed)) {
    throw new Error("Ошибка: второй операнд не является числом");
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
      throw new Error("Ошибка: деление на ноль");
    }
    return a / b;
  },
  power: (a, b) => Math.pow(a, b),
  hypotenuse: (a, b) => Math.sqrt(a*a + b*b),
  angleA: (a, b) => Math.asin(a / Math.sqrt(a*a + b*b)) * (180 / Math.PI),
  angleB: (a, b) => Math.asin(b / Math.sqrt(a*a + b*b)) * (180 / Math.PI)
}

module.exports = {
  withOperandsValidation,
  calculationUtilsMap,
}
