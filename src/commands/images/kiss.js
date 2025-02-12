const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { gifs, colors, tags } = require("../../utils/main/mainUtils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kiss")
    .setDescription(`${tags.images} Kiss someone.`)
    .addUserOption((option) =>
      option.setName("user").setDescription("Pick a member.").setRequired(true)
    ),

  async execute(interaction) {
    const target = interaction.options.getUser("user");

    const embed = new EmbedBuilder()
      .setDescription(`😍 **${interaction.user}** kissed **${target}** 💋`)
      .setImage(gifs.kiss)
      .setColor(colors.default);

    await interaction.reply({
      embeds: [embed],
    });
  },
};
