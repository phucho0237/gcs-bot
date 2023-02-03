const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
} = require("discord.js");

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

         newChannel.send(`**Nuked by \`${interaction.user.tag}\`**`);
      } catch (err) {
         interaction.reply({
            content:
               "There was a problem when executing this command. Please try again later",
            ephemeral: true,
         });
         console.error(err);
      }
   },
};
