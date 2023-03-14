const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   AttachmentBuilder,
   EmbedBuilder,
} = require("discord.js");
// const { profileImage } = require("discord-arts");

const { addSuffix } = require("../../utils/addSuffix");
const { addBadges } = require("../../utils/addBadges");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("whois")
      .setDescription("Displays various information about a user")
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
      .addUserOption(option =>
         option
            .setName("user")
            .setDescription("The user to get information about")
      ),

   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    * @param {Client} bot
    */
   async execute(interaction) {
      await interaction.deferReply();

      const member =
         interaction.options.getMember("user") || interaction.member;

      if (member.user.bot)
         return interaction.editReply(
            "At this moment, bots are not supported for this command"
         );

      try {
         const fetchedMembers = await interaction.guild.members.fetch();

         const profileBuffer = await profileImage(member.id);
         const imgAttachment = new AttachmentBuilder(profileBuffer, {
            name: "profile.png",
         });

         const joinPosition =
            Array.from(
               fetchedMembers
                  .sort((a, b) => a.joinedTimestamp - b.joinedTimestamp)
                  .keys()
            ).indexOf(member.id) + 1;

         const topRoles = member.roles.cache
            .sort((a, b) => b.position - a.position)
            .map(role => role)
            .slice(0, 3);

         const userBadges = member.user.flags.toArray();

         const joinedTime = parseInt(member.joinedTimestamp / 1000);
         const createdTime = parseInt(member.user.createdTimestamp / 1000);

         const booster = member.premium_since ? "Yes" : "No";

         const embed = new EmbedBuilder()
            .setAuthor({
               name: `${member.user.tag} | General Infomation`,
               iconURL: member.displayAvatarURL(),
            })
            .setColor("#32BEA6")
            .setDescription(
               `On <t:${joinedTime}:D>, ${
                  member.user.username
               } joined as the **${addSuffix(
                  joinPosition
               )}** member of this guild`
            )
            .addFields([
               { name: "Unique ID", value: `${member.id}` },
               {
                  name: "Badges",
                  value: `${addBadges(userBadges).join(" ")}`,
                  inline: true,
               },
               { name: "Is boosted", value: `${booster}`, inline: true },
               {
                  name: "Top Roles",
                  value: `${topRoles
                     .join("")
                     .replace(`<@${interaction.guildId}>`)}`,
               },
               {
                  name: "Created at",
                  value: `<t:${createdTime}:R>`,
                  inline: true,
               },
               {
                  name: "Joined at",
                  value: `<t:${joinedTime}:R>`,
                  inline: true,
               },
               {
                  name: "Avatar",
                  value: `[Link](${member.displayAvatarURL()})`,
                  inline: true,
               },
               {
                  name: "Banner",
                  value: `[Link](${(await member.user.fetch()).bannerURL()})`,
                  inline: true,
               },
            ]);

         interaction.editReply({ embeds: [embed] });
      } catch (err) {}
   },
};
