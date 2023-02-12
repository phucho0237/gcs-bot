const chalk = require("chalk");

module.exports = {
   cyan: msg => console.log(`${chalk.cyan(`${msg}`)}`),
   yellow: msg => console.log(`${chalk.yellow(`${msg}`)}`),
   red: msg => console.log(`${chalk.red(`${msg}`)}`),
   blue: msg => console.log(`${chalk.blue(`${msg}`)}`),
};
