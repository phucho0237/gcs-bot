const { ChatInputCommandInteraction, Client } = require("discord.js");

module.exports = {
   name: "interactionCreate",
   once: false,
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    * @param {Client} bot
    */
   async execute(interaction, bot) {
      if (!interaction.isChatInputCommand) return;

      const command = bot.commands.get(interaction.commandName);
      if (!command)
         return interaction.reply({
            content: "This command is outdated, please try again later",
            ephemeral: true,
         });

      if (
         command.ownerOnly &&
         !bot.config.bot.ownerId.includes(interaction.user.id)
      )
         return interaction.reply({
            content: "Sorry, but you can't use this command",
            ephemeral: true,
         });
      command.execute(interaction, bot);
   },
};
