const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("ping")
      .setDescription("Response with pong")
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),
   async execute(interaction, client) {
      interaction.reply({
         content: "Pong",
         ephemeral: true,
      });
   },
};
