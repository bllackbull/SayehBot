const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require("discord.js");
const { postPM2 } = require("../../utils/client/handleProcessActions");
const errorHandler = require("../../utils/main/handleErrors");
const utils = require("../../utils/main/mainUtils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pm2")
    .setDescription(
      `${utils.tags.new} ${utils.tags.admin} Execute PM2 commands.`
    )
    .addStringOption((option) =>
      option
        .setName("action")
        .setDescription("Select an action to perform.")
        .setRequired(true)
        .addChoices(
          { name: "restart", value: "restart" },
          { name: "stop", value: "stop" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("target")
        .setDescription("Input a custom PM2 process name.")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),

  async execute(interaction) {
    await interaction.deferReply({
      fetchReply: true,
      ephemeral: true,
    });

    const action = interaction.options.getString("action");
    const target = interaction.options.getString("target") || "bot";
    const command = `pm2 ${action} ${target}`;

    const embed = new EmbedBuilder()
      .setTitle(utils.titles.system)
      .setDescription("Executing PM2 command...")
      .setColor(utils.colors.default)
      .setThumbnail(utils.thumbnails.system)
      .setFooter({
        text: utils.texts.bot,
        iconURL: utils.footers.bot,
      });

    await interaction.editReply({
      embeds: [embed],
    });

    setTimeout(async () => {
      try {
        await postPM2(command);
      } catch (error) {
        await errorHandler.handleUnknownError(interaction);
      }
    }, 5_000);
  },
};
