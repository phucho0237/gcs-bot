const { Client } = require("discord.js");
const ascii = require("ascii-table");
const fs = require("node:fs");

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

   bot.application.commands.set(commandsArray);

   return console.log(table.toString());
}

module.exports = { loadCommands };
