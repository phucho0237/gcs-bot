const { Client, Events } = require("discord.js");

const { createApp } = require("./utils/createApp");
const logger = require("../utils/logger");

class Dashboard {
   constructor(bot) {
      this.bot = bot;
   }

   init() {
      const initialize = () => {
         try {
            const app = createApp(this.bot);

            app.listen(this.bot.config.web.port, () =>
               logger.cyan(
                  `[WEB] | Dashboard initialized at: ${this.bot.config.web.domain}/${this.bot.config.web.port}`
               )
            );
         } catch (err) {
            logger.red(err);
         }
      };

      if (!this.bot.isReady())
         this.bot.once(Events.ClientReady, () => initialize());
      else initialize();
   }
}

module.exports = { Dashboard };
