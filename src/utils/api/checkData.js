const streamModel = require("../../database/streamModel");
const videoModel = require("../../database/videoModel");
const notifHandler = require("../../utils/main/handleNotifications");

async function checkData(data) {
  const guildId = process.env.guildID;

  const sayehStream = await streamModel.findOne({
    guild: guildId,
    Streamer: "sayeh",
  });
  if (!sayehStream) return;

  if (sayehStream.IsLive !== data.twitch.sayeh.live) {
    if (!sayehStream.IsLive && data.twitch.sayeh.live) {
      await notifHandler.startStream(data.twitch.sayeh);
    } else if (sayehStream.IsLive && !data.twitch.sayeh.live) {
      await notifHandler.endStream(data.twitch.sayeh);
    }
  } else if (sayehStream.IsLive && data.twitch.sayeh.live) {
    await notifHandler.updateStream(data.twitch.sayeh);
  }

  const hamidStream = await streamModel.findOne({
    guild: guildId,
    Streamer: "hamidfailz",
  });
  if (!hamidStream) return;

  if (hamidStream.IsLive !== data.twitch.hamid.live) {
    if (!hamidStream.IsLive && data.twitch.hamid.live) {
      await notifHandler.startStream(data.twitch.hamid);
    } else if (hamidStream.IsLive && !data.twitch.hamid.live) {
      await notifHandler.endStream(data.twitch.hamid);
    }
  } else if (hamidStream.IsLive && data.twitch.hamid.live) {
    await notifHandler.updateStream(data.twitch.hamid);
  }

  const sayehVideos = await videoModel.findOne({
    guild: guildId,
    Channel: "Sayeh",
  });
  if (!sayehVideos) return;

  const { sayeh, sayeh_stream } = data.youtube;
  if (!sayeh.latest[0].id) return;

  if (sayehVideos.VideoId !== sayeh.latest[0].id) {
    await notifHandler.newVideo(sayeh);
  }

  const hamidVideos = await videoModel.findOne({
    guild: guildId,
    Channel: "Hamid",
  });
  if (!hamidVideos) return;
  if (!sayeh_stream.latest[0].id) return;

  if (hamidVideos.VideoId !== sayeh_stream.latest[0].id) {
    await notifHandler.newVideo(sayeh_stream);
  }
}

module.exports = { checkData };
