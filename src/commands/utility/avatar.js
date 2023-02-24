const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   Client,
   EmbedBuilder,
   ActionRowBuilder,
   ButtonBuilder,
   ButtonStyle,
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("avatar")
      .setDescription("Replies with user avatar")
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
      .addUserOption(option =>
         option
            .setName("user")
            .setDescription("The user you want to get the avatar")
      ),
   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      const target =
         interaction.options.getMember("user") || interaction.member;

      const row = new ActionRowBuilder().addComponents(
         new ButtonBuilder()
            .setStyle(ButtonStyle.Link)
            .setLabel("Avatar URL")
            .setURL(target.user.displayAvatarURL())
      );

      interaction.reply({
         embeds: [
            new EmbedBuilder()
               .setColor("#32BEA6")
               .setAuthor({
                  name: `${target.user.tag}`,
                  iconURL: target.user.displayAvatarURL(),
               })
               .setImage(
                  target.user.displayAvatarURL({
                     extension: "png",
                     size: 2048,
                  })
               ),
         ],
         components: [row],
      });
   },
};
