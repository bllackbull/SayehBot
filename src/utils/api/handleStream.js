const TwitchAPI = require("node-twitch").default;

const twitch = new TwitchAPI({
  client_id: process.env.TWITCH_CLIENT_ID,
  client_secret: process.env.TWITCH_CLIENT_SECRET,
  access_token: process.env.TWITCH_CLIENT_ACCESS,
  refresh_token: process.env.TWITCH_CLIENT_REFRESH,
});

async function getStreamData(streamerId) {
  const data = await twitch.getStreams({ channel: [streamerId] });
  const result = data.data[0];

  return { result };
}

async function getUserProfile(username) {
  const data = await twitch.getUsers(username);
  const result = data.data[0];

  return { result };
}

module.exports = {
  getStreamData,
  getUserProfile,
};
