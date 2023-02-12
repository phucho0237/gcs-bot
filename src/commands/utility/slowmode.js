const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   EmbedBuilder,
} = require("discord.js");
const ms = require("ms");

const logger = require("../../utils/logger");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("slowmode")
      .setDescription("Return the bot status")
      .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
      .addStringOption(option =>
         option
            .setName("time")
            .setDescription("Provide a time (1s, 2m, 3h,...)")
            .setRequired(true)
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      const { options, channel } = interaction;

      let time = options.getString("time");

      if (
         !channel
            .permissionsFor(interaction.member)
            .has(PermissionFlagsBits.ManageChannels)
      )
         return interaction.reply({
            content: "You don't have permission to use this command",
            ephemeral: true,
         });

      if (!ms(time))
         return interaction.reply({
            content: "This is not a valid time",
            ephemeral: true,
         });

      time = ms(time);

      if (time > ms("6h")) {
         time = ms("6h");

         try {
            await channel.setRateLimitPerUser(time);
            return interaction.reply({
               embeds: [
                  new EmbedBuilder()
                     .setColor("Aqua")
                     .setDescription(
                        "**Successfully set the slow mode for this channel to `6h`"
                     ),
               ],
            });
         } catch (err) {
            interaction.reply({
               content:
                  "There was a problem when executing this command. Please try again later",
               ephemeral: true,
            });
            logger.error(err);
         }

         return;
      }

      try {
         await channel.setRateLimitPerUser(ms(time));
         interaction.reply({
            embeds: [
               new EmbedBuilder()
                  .setColor("Aqua")
                  .setDescription(
                     `**Successfully set the slow mode for this channel to \`${time}\`**`
                  )
                  .setTimestamp(),
            ],
         });
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
