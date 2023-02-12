const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
} = require("discord.js");
const ms = require("ms");

const logger = require("../../utils/logger");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("nuke")
      .setDescription("Nuke a channel")
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      const { channel } = interaction;

      if (
         !channel
            .permissionsFor(interaction.member)
            .has(PermissionFlagsBits.ManageChannels)
      )
         return interaction.reply({
            content: "You don't have permission to use this command",
            ephemeral: true,
         });

      const newChannel = await channel.clone();
      await newChannel.setPosition(channel.position);

      try {
         await channel.delete();

         newChannel
            .send(`Nuked by \`${interaction.user.tag}\``)
            .then(msg => setTimeout(() => msg.delete(), ms("5s")));
      } catch (err) {
         interaction.reply({
            content:
               "There was a problem when executing this command. Please try again later",
            ephemeral: true,
         });
         logger.error(err);
      }
   },
};
