require("dotenv").config();

module.exports = {
   bot: {
      token: process.env.TOKEN,
   },
   db: {
      url: process.env.MONGO_URL,
   },
};
