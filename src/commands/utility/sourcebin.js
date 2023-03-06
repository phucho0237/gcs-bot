const {
   SlashCommandBuilder,
   PermissionFlagsBits,
   ChatInputCommandInteraction,
   EmbedBuilder,
} = require("discord.js");
const sourcebin = require("sourcebin");

module.exports = {
   data: new SlashCommandBuilder()
      .setName("sourcebin")
      .setDescription("Create a sourcebin url for sharing the code with anyone")
      .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages)
      .addStringOption(option =>
         option
            .setName("title")
            .setDescription("The title of the sourcebin link")
            .setRequired(true)
      )
      .addStringOption(option =>
         option
            .setName("code")
            .setDescription("The code you want to share in sourcebin")
            .setRequired(true)
      )
      .addStringOption(option =>
         option
            .setName("description")
            .setDescription("The description of sourcebin link")
      ),

   /**
    *
    * @param {ChatInputCommandInteraction} interaction
    */
   async execute(interaction) {
      const title = interaction.options.getString("title");
      const desc = interaction.options.getString("description") || "";
      const code = interaction.options.getString("code");

      await interaction.deferReply();

      await sourcebin
         .create({
            title: `${title}`,
            description: `${desc}`,
            files: [
               {
                  content: `${code}`,
                  language: "text",
               },
            ],
         })
         .then(val =>
            interaction.editReply({
               embeds: [
                  new EmbedBuilder()
                     .setTitle("Your code has been posted!")
                     .setDescription(
                        `[Click here to see your code](${val.url})`
                     ),
               ],
            })
         );
   },
};
