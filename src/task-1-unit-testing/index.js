const readline = require('readline');
const { calculatorApi } = require('./calculatorApi');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const operationsKeys = Object.keys(calculatorApi);

console.log(`Выберите операцию: ${operationsKeys.join(', ')}`);
console.log(`Затем введите операнды. Например, вот так: ${operationsKeys[0]} 5 7`);

rl.on('line', (input) => {
  const [operation, a, b] = input.split(" ");

  try {
    if (operation in calculatorApi) {
      console.log(calculatorApi[operation](a, b));
    } else {
      console.log("Неизвестная операция. Попробуйте ещё раз");
    }
  } catch (error) {
    console.log(error.message);
  }
});
