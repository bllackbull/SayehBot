const { SlashCommandBuilder } = require("discord.js");
const { mongoose } = require("mongoose");
const errorHandler = require("../../utils/main/handleErrors");
const chatModel = require("../../database/chatModel");
const tokenHandler = require("../../utils/chat/calculateTokens");
const { updateInfo } = require("../../utils/chat/updateInfo");
const { response } = require("../../utils/chat/response");
const { createEmbed } = require("../../utils/chat/createEmbed");
const utils = require("../../utils/main/mainUtils");
const { handleNonMusicalDeletion } = require("../../utils/main/handleDeletion");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ask")
    .setDescription(`${utils.tags.new} Ask anything from SayehAI.`)
    .addStringOption((option) =>
      option
        .setName("prompt")
        .setDescription("Input a prompt to ask.")
        .setRequired(true)
    ),

  async execute(interaction) {
    let success = false;

    if (mongoose.connection.readyState !== 1) {
      errorHandler.handleDatabaseError(interaction);
    } else {
      await interaction.deferReply({
        fetchReply: true,
      });

      const source = "interaction";
      const userId = interaction.user.id;
      const prompt = interaction.options.getString("prompt");
      const owner = await interaction.guild.fetchOwner();

      const environment = {
        guild: interaction.guild.name,
        ownerName: owner.displayName || owner.username,
        ownerId: owner.id,
        channelId: interaction.channel.id,
        channelName: interaction.channel.name,
        currentTime: new Date().toUTCString(),
        authorName: interaction.user.displayName || interaction.user.username,
        authorId: userId,
      };

      let chatProfile = await chatModel.findOne({
        UserId: userId,
      });

      if (!chatProfile) {
        chatProfile = new chatModel({
          UserId: userId,
          Username: environment.authorName,
          Title: "First Chat",
          Messages: [updateInfo(environment, source)],
        });

        await chatProfile.save().catch(console.error);
      }

      await tokenHandler.checkDate(chatProfile);

      if (chatProfile.TokensUsed >= utils.TOKEN_LIMIT) {
        await errorHandler.handleRateLimitError(interaction);
      } else {
        const chat = chatProfile.Messages;

        const systemMessageIndex = chat.findIndex(
          (msg) => msg.role === "system"
        );

        if (systemMessageIndex !== -1) {
          chat[systemMessageIndex] = updateInfo(environment, source);
        } else {
          chat.unshift(updateInfo(environment, source));
        }

        if (chat.length > 20) {
          chat.splice(1, 2);
        }

        chat.push({
          role: "user",
          content: prompt,
        });

        try {
          const answer = await response(chat);

          chat.push({
            role: "assistant",
            content: answer,
          });

          const embed = createEmbed(answer);

          await interaction.editReply({
            embeds: [embed],
          });

          await tokenHandler.updateTotalTokens(userId, prompt);

          success = true;
        } catch (error) {
          console.log(
            `${utils.consoleTags.error} While awaiting response from SayehAI: `,
            error
          );

          await errorHandler.handleUnknownError(interaction);
        }
      }
    }

    handleNonMusicalDeletion(interaction, success, 10);
  },
};
