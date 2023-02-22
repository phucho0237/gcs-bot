const { Client } = require("discord.js");
const ascii = require("ascii-table");
const fs = require("node:fs");

const logger = require("../utils/logger");

/**
 *
 * @param {Client} bot
 */
function loadCommands(bot) {
   const table = new ascii().setHeading("Commands", "Status");

   let commandsArray = [];

   const folders = fs.readdirSync("./src/commands");
   for (const folder of folders) {
      const files = fs
         .readdirSync(`./src/commands/${folder}`)
         .filter(f => f.endsWith(".js"));
      for (const file of files) {
         const command = require(`../commands/${folder}/${file}`);

         if (command.data.name) {
            bot.commands.set(command.data.name, command);
            commandsArray.push(command.data.toJSON());

            table.addRow(file, "✅");
         } else {
            table.addRow(file, "❌");
         }
      }
   }
   logger.cyan(table.toString());

   if (bot.config.bot.isGlobal === true) {
      logger.yellow(
         `[WARN] | You set the "isGlobal" property to "true", so the bot will load all commands globally`
      );

      return bot.application.commands.set(commandsArray);
   } else {
      logger.yellow(
         `[WARN] | You set the "isGlobal" to false, so the bot will load commands only in 1 guild you specified in "devGuildID" property`
      );

      const guild = bot.guilds.cache.get(bot.config.bot.devGuildID);
      if (!guild)
         return logger.red(
            "[ERR] | Guild not found: Please make sure that the guild ID is correct or not empty"
         );

      return guild.commands.set(commandsArray);
   }
}

module.exports = { loadCommands };
