const { Client } = require("discord.js");
const ascii = require("ascii-table");
const fs = require("node:fs");

const logger = require("../utils/logger");
/**
 *
 * @param {Client} bot
 */
function loadEvents(bot) {
   const table = new ascii().setHeading("Events", "Status");

   const folders = fs.readdirSync("./src/events");
   for (const folder of folders) {
      const files = fs
         .readdirSync(`./src/events/${folder}`)
         .filter(f => f.endsWith(".js"));
      for (const file of files) {
         const event = require(`../events/${folder}/${file}`);

         if (event.name) {
            if (event.rest) {
               if (event.once)
                  bot.rest.once(event.name, (...args) =>
                     event.execute(...args, bot)
                  );
               else
                  bot.rest.on(event.name, (...args) =>
                     event.execute(...args, bot)
                  );
            } else {
               if (event.once)
                  bot.once(event.name, (...args) =>
                     event.execute(...args, bot)
                  );
               else
                  bot.on(event.name, (...args) => event.execute(...args, bot));
            }

            table.addRow(file, "✅");
         } else {
            table.addRow(file, "❌");
         }
      }
   }

   return logger.cyan(table.toString());
}

module.exports = { loadEvents };
