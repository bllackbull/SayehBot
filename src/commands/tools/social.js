const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
} = require("discord.js");
const utils = require("../../utils/main/mainUtils");
const { createUrlButton } = require("../../utils/main/createButtons");
const { handleNonMusicalDeletion } = require("../../utils/main/handleDeletion");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("social")
    .setDescription("Follow Sayeh on social media."),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle(utils.titles.website)
      .setDescription("Follow Sayeh on social media!")
      .addFields(
        { name: utils.texts.twitch, value: "Sayeh", inline: true },
        {
          name: `${utils.texts.youtube} (Main)`,
          value: "@Say3h",
          inline: true,
        },
        {
          name: `${utils.texts.youtube} (Stream)`,
          value: "@SayehStream",
          inline: true,
        },
        { name: utils.texts.telegram, value: "@sayeh_game", inline: true },
        { name: utils.texts.instagram, value: "@sayeh_game", inline: true },
        { name: utils.texts.website, value: "sayehgame.com", inline: true }
      )
      .setColor(utils.colors.default)
      .setURL(utils.urls.website)
      .setThumbnail(utils.thumbnails.twitch_sayeh)
      .setFooter({
        iconURL: utils.footers.tools,
        text: utils.texts.tools,
      });

    const twitchButton = createUrlButton(
      utils.texts.twitch,
      utils.urls.twitch_sayeh
    );

    const youtubeButton = createUrlButton(
      `${utils.texts.youtube} (Main)`,
      utils.urls.youtube_sayeh
    );

    const youtubeStreamButton = createUrlButton(
      `${utils.texts.youtube} (Stream)`,
      utils.urls.youtube_hamid
    );

    const instagramButton = createUrlButton(
      utils.texts.instagram,
      utils.urls.instagram
    );

    const button = new ActionRowBuilder().addComponents(
      twitchButton,
      youtubeButton,
      youtubeStreamButton,
      instagramButton
    );

    await interaction.reply({
      embeds: [embed],
      components: [button],
    });

    handleNonMusicalDeletion(interaction, true, 10);
  },
};
