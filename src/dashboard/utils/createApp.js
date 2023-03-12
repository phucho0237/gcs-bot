const { Client } = require("discord.js");
const express = require("express");
const cors = require("cors");

const routes = require("../routes");

function createApp(bot) {
   const app = express();

   app.use(
      cors({
         origin: [`${bot.config.web.domain}:${bot.config.web.port}`],
         credentials: true,
      })
   );
   app.use(express.json());
   app.use(express.urlencoded({ extended: true }));

   app.use("/", routes);

   return app;
}

module.exports = { createApp };
