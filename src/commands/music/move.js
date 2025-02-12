const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const errorHandler = require("../../utils/main/handleErrors");
const { titles } = require("../../utils/player/musicUtils");
const { determineSource } = require("../../utils/player/createMusicEmbed");
const deletionHandler = require("../../utils/main/handleDeletion");
const { tags } = require("../../utils/main/mainUtils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("move")
    .setDescription(
      `${tags.new} Move a track from one position to another within the queue.`
    )
    .addIntegerOption((option) =>
      option
        .setName("from")
        .setDescription("Input a queue position to move the track from.")
        .setMinValue(1)
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("to")
        .setDescription("Input a queue position to move the track to.")
        .setMinValue(1)
        .setRequired(true)
    )
    .setDMPermission(false),

  async execute(interaction, client) {
    ////////////// base variables //////////////
    const { guildId, member, options } = interaction;

    const queue = client.player.nodes.get(guildId);
    let success = false;

    if (!member.voice.channel) {
      errorHandler.handleVoiceChannelError(interaction);
    } else if (!queue) {
      await errorHandler.handleQueueError(interaction);
    } else {
      const sameChannel =
        queue.connection.joinConfig.channelId === member.voice.channel.id;

      if (!sameChannel) {
        errorHandler.handleBusyError(interaction);
      } else {
        ////////////// moving the track //////////////
        await interaction.deferReply({
          fetchReply: true,
        });

        let fromPosition = options.getInteger("from");
        let toPosition = options.getInteger("to");

        if (fromPosition > queue.tracks.size) {
          fromPosition = queue.tracks.size + 1;
        }

        if (toPosition > queue.tracks.size) {
          toPosition = queue.tracks.size + 1;
        }

        if (fromPosition === toPosition) {
          await errorHandler.handleMoveError(interaction);
        } else {
          const song = queue.tracks.data[fromPosition - 1];
          const source = determineSource(song.url);

          queue.node.move(song, toPosition - 1);

          const embed = new EmbedBuilder()
            .setTitle(titles.move)
            .setDescription(
              `**[${song.title}](${song.url})**\nhas been moved to **#${toPosition}** in the queue.`
            )
            .setThumbnail(song.thumbnail)
            .setColor(source.color)
            .setFooter({
              text: source.text,
              iconURL: source.iconURL,
            });

          await interaction.editReply({
            embeds: [embed],
          });

          success = true;
        }
      }
    }

    deletionHandler.handleInteractionDeletion(interaction, success);
  },
};
