const { Client, Partials, Collection } = require("discord.js");
const ms = require("ms");

const { loadEvents } = require("./functions/events");
const { loadCommands } = require("./functions/commands");

const bot = new Client({
   intents: 131071,
   partials: [Object.keys(Partials)],
   allowedMentions: { parse: ["everyone", "users", "roles"] },
   rest: { timeout: ms("1m") },
});

bot.commands = new Collection();
bot.config = require("./config");

bot.login(bot.config.bot.token).then(() => {
   loadEvents(bot);
   loadCommands(bot);
});
