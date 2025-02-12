const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { QueryType } = require("discord-player");
const errorHandler = require("../../utils/main/handleErrors");
const { titles } = require("../../utils/player/musicUtils");
const { handleData } = require("../../utils/player/handlePlayerData");
const { response } = require("../../utils/player/createResponse");
const { createQueue } = require("../../utils/player/createQueue");
const { createTrackEmbed } = require("../../utils/player/createMusicEmbed");
const { search } = require("../../utils/player/handleSearch");
const { createButtons } = require("../../utils/main/createButtons");
const deletionHandler = require("../../utils/main/handleDeletion");
const { tags } = require("../../utils/main/mainUtils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("forceplay")
    .setDescription(
      `${tags.new} Skip the currently playing track and play a new track.`
    )
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("Input a track name or url.")
        .setRequired(true)
        .setAutocomplete(true)
    )
    .addStringOption((option) =>
      option
        .setName("source")
        .setDescription("Select a source to search in.")
        .addChoices(
          { name: "YouTube", value: QueryType.YOUTUBE },
          { name: "Spotify", value: QueryType.SPOTIFY_SEARCH },
          { name: "SoundCloud", value: QueryType.SOUNDCLOUD },
          { name: "Apple Music", value: QueryType.APPLE_MUSIC_SEARCH }
        )
    )
    .setDMPermission(false),

  async autocompleteRun(interaction) {
    ////////////// autocomplete response //////////////
    const query = interaction.options.getString("query", true);
    if (!query) return;

    const source = interaction.options.get("source");
    const sourceValue = source ? source.value : QueryType.YOUTUBE;

    const engine = query.startsWith("https") ? "auto" : sourceValue;
    const result = await search(query, engine);
    if (!result.hasTracks()) return;

    const respond = response(result);

    try {
      await interaction.respond(respond);
    } catch (error) {
      return;
    }
  },

  async execute(interaction, client) {
    ////////////// base variables //////////////
    const { guildId, member } = interaction;
    const target = 1;
    let success = false;

    if (!member.voice.channel) {
      errorHandler.handleVoiceChannelError(interaction);
    } else {
      const query = interaction.options.getString("query", true);

      const source = interaction.options.get("source");
      const sourceValue = source ? source.value : QueryType.YOUTUBE;

      const engine = query.startsWith("https") ? "auto" : sourceValue;
      const result = await search(query, engine);

      if (!result.hasTracks()) {
        errorHandler.handleNoResultError(interaction);
      } else {
        const queue =
          client.player.nodes.get(guildId) ||
          (await createQueue(client, interaction, result));

        if (!queue.connection) {
          await queue.connect(member.voice.channel);
        }

        const sameChannel =
          queue.connection.joinConfig.channelId === member.voice.channel.id;

        if (!sameChannel) {
          errorHandler.handleBusyError(interaction);
        } else {
          ////////////// inserting the track //////////////
          const playEmbed = await interaction.deferReply({
            fetchReply: true,
          });

          try {
            const song = result.tracks[0];
            const entry = queue.tasksQueue.acquire();

            await entry.getTask();
            await queue.insertTrack(song, target - 1);

            ////////////// permission check //////////////
            const requiredVotes = member.voice.channel.members.size - 1;

            const allowed =
              member.permissions.has(PermissionFlagsBits.ManageMessages) ||
              requiredVotes <= 1;

            success = true;

            if (allowed) await queue.node.skip();

            const { embed, nowPlaying } = createTrackEmbed(
              interaction,
              queue,
              result,
              song
            );

            if (!nowPlaying) embed.setTitle(`**${titles.track} ${target}**`);

            await handleData(guildId, nowPlaying);

            if (!queue.node.isPlaying() && !queue.node.isPaused())
              await queue.node.play();

            await queue.tasksQueue.release();

            const button = createButtons(nowPlaying);

            await interaction.editReply({
              embeds: [embed],
              components: [button],
            });
          } catch (error) {
            errorHandler.handleMusicError(interaction, error);
          }
        }
      }
    }

    deletionHandler.handleInteractionDeletion(interaction, success);
  },
};
