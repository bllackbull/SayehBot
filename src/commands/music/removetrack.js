const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
const { createVoteEmbed } = require("../../utils/player/createMusicEmbed");
const { remove } = require("../../utils/player/handleSkip");
const errorHandler = require("../../utils/main/handleErrors");
const { voteReact } = require("../../utils/main/handleReaction");
const deletionHandler = require("../../utils/main/handleDeletion");
const { tags } = require("../../utils/main/mainUtils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("removetrack")
    .setDescription(`${tags.new} Delete a track from the queue.`)
    .addIntegerOption((option) =>
      option
        .setName("position")
        .setDescription("Input a queue position to remove.")
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
        const removeEmbed = await interaction.deferReply({
          fetchReply: true,
        });

        let target = options.getInteger("position");
        if (target > queue.tracks.size) {
          target = queue.tracks.size + 1;
        }

        ////////////// vote requirement check //////////////
        const requiredVotes = member.voice.channel.members.size - 1;

        const allowed =
          member.permissions.has(PermissionFlagsBits.ManageMessages) ||
          requiredVotes <= 1;

        success = true;

        if (allowed) {
          await remove(interaction, queue, target - 1);
        } else {
          ////////////// vote phase //////////////
          let embed = createVoteEmbed(requiredVotes, "start");

          await interaction.editReply({
            embeds: [embed],
          });

          let votes = 0;
          let action = false;
          const timer = requiredVotes * 10 * 1000;

          const collector = voteReact(interaction, removeEmbed, timer);

          collector.on("collect", async (user) => {
            if (user.bot) return;

            if (!action) {
              votes++;

              if (votes >= requiredVotes) {
                action = true;
                collector.stop();

                embed = createVoteEmbed(requiredVotes, "success");

                await interaction.editReply({
                  embeds: [embed],
                });

                await remove(interaction, queue, target - 1);
              }
            }
          });

          collector.on("end", async () => {
            if (!action) {
              embed = createVoteEmbed(requiredVotes, "fail");

              await interaction.editReply({
                embeds: [embed],
              });
            }
          });
        }
      }
    }

    deletionHandler.handleInteractionDeletion(interaction, success);
  },
};
