const streamModel = require("../../database/streamModel");
const videoModel = require("../../database/videoModel");
const notifHandler = require("../../utils/main/handleNotifications");

async function checkData(data, client) {
  const guild = await client.guilds.fetch(process.env.guildID);
  if (!guild) return;

  const sayehStream = await streamModel.findOne({
    guild: guild.id,
    Streamer: "sayeh",
  });
  if (!sayehStream) return;

  if (sayehStream.IsLive !== data.twitch.sayeh.live) {
    if (!sayehStream.IsLive && data.twitch.sayeh.live) {
      await notifHandler.startStream(client, data.twitch.sayeh);
    } else if (sayehStream.IsLive && !data.twitch.sayeh.live) {
      await notifHandler.endStream(client, data.twitch.sayeh);
    }
  } else if (sayehStream.IsLive && data.twitch.sayeh.live) {
    await notifHandler.updateStream(client, data.twitch.sayeh);
  }

  const hamidStream = await streamModel.findOne({
    guild: guild.id,
    Streamer: "hamidfailz",
  });
  if (!hamidStream) return;

  if (hamidStream.IsLive !== data.twitch.hamid.live) {
    if (!hamidStream.IsLive && data.twitch.hamid.live) {
      await notifHandler.startStream(client, data.twitch.hamid);
    } else if (hamidStream.IsLive && !data.twitch.hamid.live) {
      await notifHandler.endStream(client, data.twitch.hamid);
    }
  } else if (hamidStream.IsLive && data.twitch.hamid.live) {
    await notifHandler.updateStream(client, data.twitch.hamid);
  }

  const sayehVideos = await videoModel.findOne({
    guild: guild.id,
    Channel: "Sayeh",
  });
  if (!sayehVideos) return;

  const { sayeh, sayeh_stream } = data.youtube;
  if (!sayeh.latest[0].id) return;

  if (sayehVideos.VideoId !== sayeh.latest[0].id) {
    await notifHandler.newVideo(client, sayeh);
  }

  const hamidVideos = await videoModel.findOne({
    guild: guild.id,
    Channel: "Hamid",
  });
  if (!hamidVideos) return;
  if (!sayeh_stream.latest[0].id) return;

  if (hamidVideos.VideoId !== sayeh_stream.latest[0].id) {
    await notifHandler.newVideo(client, sayeh_stream);
  }
}

module.exports = { checkData };
