require("dotenv").config();

module.exports = {
   bot: {
      // Bot token
      token: process.env.TOKEN,

      // Client id
      clientId: process.env.CLIENT_ID,

      // Client secret
      clientSecret: process.env.CLIENT_SECRET,

      // Global/Guild configuration
      isGlobal: true,

      // Dev guild ID (optional if you want to set isGlobal to false)
      devGuildID: "",

      // Owner ID
      ownerId: [""],
   },
   db: {
      // Mongo DB url
      url: process.env.MONGO_URL,
   },
   web: {
      // Domain
      domain: "http://localhost",

      // Port
      port: process.env.PORT || 3000,
   },
};
