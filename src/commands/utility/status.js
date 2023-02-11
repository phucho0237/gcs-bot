const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   Client,
   EmbedBuilder,
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("status")
      .setDescription(
         "Show the status of the bot, included ping, uptime, etc..."
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),

   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    * @param {Client} bot
    */
   async execute(interaction, bot) {
      await interaction.deferReply();

      const reply = await interaction.fetchReply();
      const ping = reply.createdTimestamp - interaction.createdTimestamp;

      interaction.editReply({
         embeds: [
            new EmbedBuilder()
               .setColor("#32BEA6")
               .setTitle(`${bot.user.username}'s Status`)
               .setDescription(
                  `🏓 Bot latency: \`${ping}ms\`\n🏓 API latency: \`${
                     bot.ws.ping
                  }ms\`\n\n⏱ Uptime: <t:${parseInt(
                     bot.readyTimestamp / 1000
                  )}:R>`
               ),
         ],
      });
   },
};
