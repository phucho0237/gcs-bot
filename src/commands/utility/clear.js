const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   Client,
   EmbedBuilder,
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("clear")
      .setDescription(
         "Clear a specific amount of messages from a target or channel"
      )
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
      .addIntegerOption((option) =>
         option
            .setName("amount")
            .setDescription("The amount of messages to clear")
            .setMinValue(1)
            .setMaxValue(100)
            .setRequired(true)
      )
      .addUserOption((option) =>
         option
            .setName("target")
            .setDescription("The target to clear their messages")
      ),

   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    * @param {Client} client
    */
   async execute(interaction, client) {
      const { options, channel } = interaction;

      const amount = options.getInteger("amount");
      const target = options.getMember("user");

      let msgs;
      if (target) {
         msgs = await channel.messages
            .fetch({
               limit: amount,
            })
            .then((messages) =>
               messages.filter((m) => m.author.id === target.id)
            );
      } else {
         msgs = await channel.messages.fetch({
            limit: amount,
         });
      }

      if (msgs.size < amount) {
         interaction.reply({
            content:
               "The amount of messages to delete is greater than the total number of messages in the channel",
            ephemeral: true,
         });
         return;
      }

      const embed = new EmbedBuilder().setColor("#32BEA6");

      try {
         await channel.bulkDelete(msgs).then((msgs) => {
            const desc = target
               ? `Successfully deleted ${msgs.size} messages from ${target}`
               : `Successfully deleted ${msgs.size} from the channel`;
            embed.setDescription(desc);
            interaction.reply({
               embeds: [embed],
            });
         });
      } catch (err) {
         interaction.reply({
            content:
               "There was a problem when executing this command. Please try again later",
            ephemeral: true,
         });
         console.log(err);
      }
   },
};
