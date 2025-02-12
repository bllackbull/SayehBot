const eventsModel = require("../../database/eventsModel");
const channelModel = require("../../database/channelModel");
const { consoleTags } = require("../../utils/main/mainUtils");

module.exports = {
  name: "birthday",

  async execute(id, guildId, age, client) {
    const guild = await client.guilds.fetch(guildId);
    if (!guild) return;

    const eventsList = await eventsModel.findOne({
      guildId: guildId,
      Birthday: true,
    });
    if (!eventsList) return;

    const channelsList = await channelModel.findOne({
      guildId: guildId,
    });
    if (!channelsList) return;

    const channelId = channelsList.birthdayId;
    if (!channelId) return;

    const channel = await guild.channels.fetch(channelId);
    if (!channel) return;

    const content = `🎈 🎂 Today is **<@${id}>**'s birthday! (Age **${age}**) Happy birthday! 🥳 🎉`;

    await channel.send(content);

    console.log(`${consoleTags.app} Today is ${id}'s birthday! (Age ${age}).`);
  },
};
