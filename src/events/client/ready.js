const { Client, ActivityType } = require("discord.js");
const mongoose = require("mongoose");

const logger = require("../../functions/logger");

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

      logger.client(`Logged in as ${bot.user.tag}`);

      if (bot.config.db.url) {
         mongoose.set("strictQuery", false);
         mongoose
            .connect(bot.config.db.url)
            .then(() => logger.db("Connected to MongoDB server"))
            .catch(err => {
               logger.error(
                  "Error when trying to connect to MongoDB server\n",
                  err
               );
            });
      }
   },
};
