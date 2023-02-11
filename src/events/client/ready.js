const { Client, ActivityType } = require("discord.js");
const mongoose = require("mongoose");

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

      if (bot.config.db.url) {
         mongoose.set("strictQuery", false);
         mongoose
            .connect(bot.config.db.url)
            .then(() => console.log("Connected to MongoDB server"))
            .catch(err => {
               console.log(
                  "Error when trying to connect to MongoDB server\n",
                  err
               );
            });
      }
   },
};
