const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   Client,
   EmbedBuilder,
} = require("discord.js");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("whois")
      .setDescription("Displays various information about a user")
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
      .addUserOption(option =>
         option
            .setName("user")
            .setDescription("The user to get information about")
            .setRequired(true)
      ),

   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    * @param {Client} bot
    */
   async execute(interaction) {
      const { options, guild } = interaction;

      const user = options.getUser("user");

      const member = guild.members.cache.get(user.id);

      const embed = new EmbedBuilder().setColor("#32BEA6").addFields(
         {
            name: "Username",
            value: `\`${user.username}\``,
            inline: true,
         },
         {
            name: "Discriminator",
            value: `\`#${user.discriminator}\``,
            inline: true,
         },
         { name: "ID", value: `\`${user.id}\`` },
         {
            name: "Created At",
            value: `<t:${Math.floor(user.createdTimestamp / 1000)}:R>`,
            inline: true,
         },
         {
            name: "Joined At",
            value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`,
            inline: true,
         },
         {
            name: "Roles",
            value: member.roles.cache
               .filter(r => r.id !== guild.roles.everyone.id)
               .map(role => role.toString())
               .join(", "),
         }
      );

      try {
         interaction.reply({ embeds: [embed] });
      } catch (err) {
         interaction.reply({
            content:
               "There was a problem when executing this command. Please try again later",
            ephemeral: true,
         });
         logger.red(err);
      }
   },
};
