const chalk = require("chalk");

module.exports = {
   info: msg => console.log(`${chalk.cyan(`[INFO] | ${msg}`)}`),
   warn: msg => console.log(`${chalk.yellow(`[WARN] | ${msg}`)}`),
   error: msg => console.log(`${chalk.red(`[ERROR] | ${msg}`)}`),
   debug: msg => console.log(`${chalk.blue(`[DEBUG] | ${msg}`)}`),

   client: msg => console.log(`${chalk.cyan(`[CLIENT] | ${msg}`)}`),

   db: msg => console.log(`${chalk.cyan(`[DB] | ${msg}`)}`),
};
