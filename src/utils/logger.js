const chalk = require("chalk");

module.exports = {
   info: msg => console.log(`${chalk.cyan(`${msg}`)}`),
   warn: msg => console.log(`${chalk.yellow(`${msg}`)}`),
   error: msg => console.log(`${chalk.red(`${msg}`)}`),
   debug: msg => console.log(`${chalk.blue(`${msg}`)}`),
};
