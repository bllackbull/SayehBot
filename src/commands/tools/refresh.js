const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const errorHandler = require("../../utils/main/handleErrors");
const { handleNonMusicalDeletion } = require("../../utils/main/handleDeletion");
const utils = require("../../utils/main/mainUtils");
const axios = require("axios");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("refresh")
    .setDescription(
      `${utils.tags.new} ${utils.tags.mod} Refresh Sayeh API Data.`
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),

  async execute(interaction) {
    let success = false;

    try {
      await axios.post("https://api.sayehgame.com/refresh/");

      const embed = new EmbedBuilder()
        .setTitle("**API Refreshed**")
        .setDescription("Data has been refresh successfully!")
        .setColor(utils.colors.success)
        .setThumbnail(utils.thumbnails.success);

      await interaction.reply({ embeds: [embed] });

      success = true;
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data;

        interaction.errorStatus = status;
        interaction.errorMessage = message;

        if (status === 429) {
          await errorHandler.handleRateLimitError(interaction);
        } else {
          await errorHandler.handleAPIError(interaction);
        }
      } else {
        console.log(
          `${utils.consoleTags.error} While attempting to refresh Sayeh API data:`,
          error
        );

        await errorHandler.handleUnknownError(interaction);
      }
    }

    handleNonMusicalDeletion(interaction, success, 5);
  },
};
