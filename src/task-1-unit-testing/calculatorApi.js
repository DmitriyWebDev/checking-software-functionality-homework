const {
  OPERATION_DECORATORS,
  composeFunctions,
  calculationUtilsMap
} = require("./utils");

const calculatorApi = Object.entries(calculationUtilsMap).reduce((resultApi, [operationKey, operationFunction]) => {
  resultApi[operationKey] = composeFunctions.apply(this, OPERATION_DECORATORS)(operationFunction);

  return resultApi;
}, {});

module.exports = {
  calculatorApi,
};
