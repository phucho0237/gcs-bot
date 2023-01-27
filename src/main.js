const { Client, Partials } = require("discord.js");
const ms = require("ms");

const { loadEvents } = require("./handlers/events");

const client = new Client({
   intents: 131071,
   partials: [Object.keys(Partials)],
   allowedMentions: { parse: ["everyone", "users", "roles"] },
   rest: { timeout: ms("1m") },
});

client.config = require("./config");

client.login(client.config.bot.token).then(() => {
   loadEvents(client);
});
