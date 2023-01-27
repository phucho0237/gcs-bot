const { ChatInputCommandInteraction, Client } = require("discord.js");

module.exports = {
   name: "interactionCreate",
   once: false,
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    * @param {Client} client
    */
   async execute(interaction, client) {
      if (!interaction.isChatInputCommand) return;

      const command = client.commands.get(interaction.commandName);
      if (!command)
         return interaction.reply({
            content: "This command is outdated",
            ephemeral: true,
         });

      command.execute(interaction, client);
   },
};
