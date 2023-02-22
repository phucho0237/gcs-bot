require("dotenv").config();

module.exports = {
   bot: {
      // Bot token
      token: process.env.TOKEN,

      // Global/Guild configuration
      isGlobal: true,

      // Dev guild ID (optional if you want to set isGlobal to false)
      devGuildID: "",
   },
   db: {
      url: process.env.MONGO_URL,
   },
};
