const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   Client,
   EmbedBuilder,
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("ping")
      .setDescription("Replies with the bot ping")
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    * @param {Client} client
    */
   async execute(interaction, client) {
      await interaction.deferReply();

      const reply = await interaction.fetchReply();
      const ping = reply.createdTimestamp - interaction.createdTimestamp;

      interaction.editReply({
         embeds: [
            new EmbedBuilder()
               .setColor("Aqua")
               .setTitle("🏓 Pong!")
               .setDescription(
                  `Client: \`${ping}ms\`\nWebsocket: \`${client.ws.ping}ms\``
               ),
         ],
      });
   },
};
