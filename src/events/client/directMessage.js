const { Events } = require("discord.js");
const { mongoose } = require("mongoose");
const errorHandler = require("../../utils/main/handleErrors");
const chatModel = require("../../database/chatModel");
const tokenHandler = require("../../utils/chat/calculateTokens");
const { updateInfo } = require("../../utils/chat/updateInfo");
const { response } = require("../../utils/chat/response");
const { createEmbed } = require("../../utils/chat/createEmbed");
const utils = require("../../utils/main/mainUtils");

module.exports = {
  name: Events.MessageCreate,

  async execute(message) {
    if (message.channel.type !== 1) return;
    if (message.author.bot) return;
    if (message.webhookId) return;
    if (message.guild) return;
    if (mongoose.connection.readyState !== 1) return;

    const msg = await message.channel.send("SayehBot is thinking...");

    const source = "dm";
    const userId = message.author.id;
    const prompt = message.content;

    const environment = {
      channelId: message.channel.id,
      channelName: message.channel.name,
      currentTime: new Date().toUTCString(),
      authorName: message.author.displayName || message.author.username,
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
      await errorHandler.handleRateLimitErrorMessage(msg);
    } else {
      const chat = chatProfile.Messages;

      const systemMessageIndex = chat.findIndex((msg) => msg.role === "system");

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

        await chatModel.findOneAndUpdate(
          { UserId: userId },
          { Messages: chat }
        );

        const embed = createEmbed(answer);

        await msg.edit({
          content: "",
          embeds: [embed],
        });

        await tokenHandler.updateTotalTokens(userId, prompt);
      } catch (error) {
        console.log(
          `${utils.consoleTags.error} While awaiting response from SayehAI: `,
          error
        );

        msg.replied = true;

        await errorHandler.handleUnknownErrorMessage(msg);
      }
    }
  },
};
