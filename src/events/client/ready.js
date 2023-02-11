const { Client, ActivityType } = require("discord.js");
const ms = require("ms");

module.exports = {
   name: "ready",
   once: true,
   /**
    *
    * @param {Client} bot
    */
   async execute(bot) {
      bot.user.setPresence({
         activities: [
            {
               name: "GCS Bot | /help",
               type: ActivityType.Playing,
            },
         ],
         status: "dnd",
      });

      console.log(`Logged in as ${bot.user.tag}`);
   },
};
