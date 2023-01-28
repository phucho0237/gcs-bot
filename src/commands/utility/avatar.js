const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   Client,
   EmbedBuilder,
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("avatar")
      .setDescription("Replies with user avatar")
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
      .addUserOption((option) =>
         option
            .setName("user")
            .setDescription("The user you want to get the avatar")
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    * @param {Client} client
    */
   async execute(interaction, client) {
      const { options, member } = interaction;

      const target = options.getMember("user") || member;

      interaction.reply({
         embeds: [
            new EmbedBuilder()
               .setColor("#32BEA6")
               .setAuthor({
                  name: `${target.user.tag}`,
                  iconURL: target.user.displayAvatarURL(),
               })
               .setDescription(`[Avatar URL](${target.user.displayAvatarURL()})`)
               .setImage(
                  target.user.displayAvatarURL({
                     extension: "png",
                     size: 2048,
                  })
               ),
         ],
      });
   },
};
