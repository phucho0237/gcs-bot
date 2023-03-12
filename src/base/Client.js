const { Client, Partials, Collection } = require("discord.js");
const ms = require("ms");

const { Dashboard } = require("../dashboard");

class client extends Client {
   constructor() {
      super({
         intents: 131071,
         partials: Object.keys(Partials),
         allowedMentions: { parse: ["everyone", "users", "roles"] },
         rest: { timeout: ms("1m") },
      });

      this.commands = new Collection();
      this.config = require("../config");

      this.dashboard = new Dashboard(this);
   }
}

module.exports = client;
