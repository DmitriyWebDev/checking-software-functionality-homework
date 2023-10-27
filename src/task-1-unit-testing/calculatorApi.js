const {
  withOperandsValidation,
  calculationUtilsMap
} = require("./utils");

const calculatorApi = Object.entries(calculationUtilsMap).reduce((resultApi, [operationKey, operationFunction]) => {
  resultApi[operationKey] = withOperandsValidation(operationFunction);

  return resultApi;
}, {});

module.exports = {
  calculatorApi,
};

