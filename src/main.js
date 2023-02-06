const { Client, Partials, Collection } = require("discord.js");
const ms = require("ms");

const { loadEvents } = require("./handlers/events");
const { loadCommands } = require("./handlers/commands");

const client = new Client({
   intents: 131071,
   partials: [Object.keys(Partials)],
   allowedMentions: { parse: ["everyone", "users", "roles"] },
   rest: { timeout: ms("1m") },
});

client.commands = new Collection();
client.config = require("./config");

client.login(client.config.bot.token).then(() => {
   loadEvents(client);
   loadCommands(client);
});
