const { Events } = require("discord.js");
const { mainPresence } = require("../../utils/main/handlePresence");
const intervals = require("../../utils/client/intervals");
const { getWarnClient } = require("../../utils/main/warnPenalty");
const { getReportClient } = require("../../utils/main/handleReports");
const { getLevelClient } = require("../../utils/level/levelActions");
const { consoleTags } = require("../../utils/main/mainUtils");
const birthdayModel = require("../../database/birthdayModel");

module.exports = {
  name: Events.ClientReady,
  once: true,

  async execute(client) {
    await mainPresence(client);

    intervals.setIntervals(client);

    getWarnClient(client);
    getReportClient(client);
    getLevelClient(client);

    console.log(`${consoleTags.app} SayehBot is online.`);

    setInterval(() => {
      intervals.clearIntervals();
      intervals.setIntervals(client);

      console.log(`${consoleTags.app} Intervals have been refreshed.`);
    }, 43_200_000);

    const documents = await birthdayModel.find();

    for (doc of documents) {
      const user = await client.users.fetch(doc.User);

      if (doc.GuildId && doc.Username) return;

      await birthdayModel.updateOne(
        { _id: doc._id },
        {
          $set: {
            GuildId: process.env.guildID,
            Username: user.displayName || user.username,
          },
        }
      );
    }
  },
};
