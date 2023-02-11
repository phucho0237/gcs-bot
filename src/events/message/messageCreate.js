const {
   Message,
   Client,
   EmbedBuilder,
   ActionRowBuilder,
   ButtonBuilder,
   ButtonStyle,
} = require("discord.js");
const ms = require("ms");

module.exports = {
   name: "messageCreate",
   once: false,
   /**
    *
    * @param {Message} message
    * @param {Client} bot
    */
   async execute(message, bot) {
      if (!message.guild || message.author.bot) return;
      if (
         message.content.includes("@here") ||
         message.content.includes("@everyone")
      )
         return;
      if (!message.content.includes(bot.user.id)) return;

      return message
         .reply({
            embeds: [
               new EmbedBuilder()
                  .setColor("#32BEA6")
                  .setDescription(
                     `Hi, I am \`${bot.user.username}\`\nTo see all my commands, type \`/\` & click on my logo to see all my commands`
                  )
                  .setFooter({
                     text: "This message will automatically delete in 10 seconds.",
                  })
                  .setTimestamp(),
            ],
            components: [
               new ActionRowBuilder().addComponents(
                  new ButtonBuilder()
                     .setStyle(ButtonStyle.Link)
                     .setLabel("Support Server")
                     .setURL("https://github.com")
               ),
            ],
         })
         .then(msg => {
            setTimeout(() => {
               msg.delete().catch(err => {
                  if (err.code !== 10008) return console.error(err);
               });
            }, ms("10s"));
         });
   },
};
