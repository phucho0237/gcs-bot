const {
   Guild,
   Client,
   ChannelType,
   EmbedBuilder,
   ActionRowBuilder,
   ButtonBuilder,
   ButtonStyle,
} = require("discord.js");

const logger = require("../../utils/logger");

module.exports = {
   name: "guildCreate",
   once: false,

   /**
    *
    * @param {Guild} guild
    * @param {Client} bot
    */
   async execute(guild, bot) {
      const channel = guild.channels.cache
         .filter(c => c.type === ChannelType.GuildText)
         .sort((a, b) => a.rawPosition - b.rawPosition || a.id - b.id)
         .first();

      const embed = new EmbedBuilder()
         .setColor("#32BEA6")
         .setTitle(`${bot.user.username}`)
         .setDescription(
            `Thank you for adding me to your server. To get started, type \`/help\` in any channel to see all my commands`
         )
         .setTimestamp();

      const components = new ActionRowBuilder().addComponents(
         new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Support Server")
            .setURL("https://github.com")
      );

      try {
         channel.send({ embeds: [embed], components: [components] });
      } catch (err) {
         logger.red(err);
      }
   },
};
