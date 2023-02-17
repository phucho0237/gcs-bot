const { loadEvents } = require("./functions/events");
const { loadCommands } = require("./functions/commands");

const client = require("./base/Client"),
   bot = new client();

const init = async () => {
   bot.login(bot.config.bot.token).then(() => {
      loadEvents(bot);
      loadCommands(bot);
   });
};

init();

bot.on("error", err => bot.logger.red(err)).on("warn", info =>
   bot.logger.yellow(info)
);

process.on("unhandledRejection", err => console.error(err));
