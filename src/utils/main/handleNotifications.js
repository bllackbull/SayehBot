const { EmbedBuilder, ActionRowBuilder } = require("discord.js");
const { mongoose } = require("mongoose");
const streamModel = require("../../database/streamModel");
const videoModel = require("../../database/videoModel");
const eventsModel = require("../../database/eventsModel");
const channelModel = require("../../database/channelModel");
const { createUrlButton } = require("../../utils/main/createButtons");
const presenceHandler = require("../../utils/main/handlePresence");
const utils = require("../main/mainUtils");
const { consoleTags } = require("./mainUtils");

const notifiedChannels = new Set();

const STREAMERS = {
  sayeh: {
    streamData: false,
    embed: false,
    announcement: false,
    msg: false,
  },
  hamidfailz: {
    streamData: false,
    embed: false,
    announcement: false,
    msg: false,
  },
};

function updateStreamerData(streamer, data, embed, announcement, msg) {
  STREAMERS[streamer].streamData = data;
  STREAMERS[streamer].embed = embed;
  STREAMERS[streamer].announcement = announcement;
  STREAMERS[streamer].msg = msg;
}

function resetStreamerData(streamer) {
  STREAMERS[streamer].streamData = false;
  STREAMERS[streamer].embed = false;
  STREAMERS[streamer].announcement = false;
  STREAMERS[streamer].msg = false;
}

function createItems(username) {
  const name = username.toLowerCase();
  const timestamp = Date.now();

  const image = `https://static-cdn.jtvnw.net/previews-ttv/live_user_${name}-1920x1080.jpg?NgOqCvLCECvrHGtf=1&t=${timestamp}`;
  const url = `https://www.twitch.tv/${username}`;

  return { image, url };
}

async function startStream(client, data) {
  if (mongoose.connection.readyState !== 1) return;

  const guild = await client.guilds.fetch(process.env.guildID);
  if (!guild) return;

  const eventsList = await eventsModel.findOne({
    guildId: guild.id,
    Stream: true,
  });
  if (!eventsList) return;

  const channelsList = await channelModel.findOne({
    guildId: guild.id,
  });
  if (!channelsList) return;

  const channelId = channelsList.streamId;
  if (!channelId) return;

  const channel = await guild.channels.fetch(channelId);
  if (!channel) return;

  const { username, category, title, viewer_count, avatar } = data;
  const user_login = username.toLowerCase();
  const { image, url } = createItems(username);

  let streamList = await streamModel.findOne({
    guild: guild.id,
    Streamer: user_login,
  });

  if (!streamList) {
    streamList = new streamModel({
      guild: guild.id,
      Streamer: user_login,
      IsLive: false,
    });
    await streamList.save().catch(console.error);
  }

  if (streamList.IsLive) return;

  await streamModel.updateOne(
    {
      guild: guild.id,
      Streamer: user_login,
    },
    {
      IsLive: true,
    }
  );

  presenceHandler.streamPresence(client, title, username);

  const embed = new EmbedBuilder()
    .setAuthor({
      name: username,
      iconURL: avatar,
      url,
    })
    .setTitle(`**${title}**`)
    .setURL(url)
    .setDescription(
      `Streaming **${category || `Just Chatting`}** for ${viewer_count} viewers`
    )
    .setThumbnail(avatar)
    .setImage(image)
    .setColor(utils.colors.twitch)
    .setTimestamp(Date.now())
    .setFooter({
      text: utils.texts.twitch,
      iconURL: utils.footers.twitch,
    });

  const announcement = `Hey ${utils.tag}\n**${username}** is now LIVE on Twitch! 😍🔔\n\n## ${title}\n\n${url}`;

  const { urlButton } = createUrlButton(utils.labels.stream, url);
  const button = new ActionRowBuilder().addComponents(urlButton);

  if (notifiedChannels.has(user_login)) return;
  notifiedChannels.add(user_login);

  console.log(`${consoleTags.app} ${username}'s twitch notification sent.`);

  const msg = await channel.send({
    content: announcement,
  });

  if (STREAMERS[user_login]) {
    updateStreamerData(user_login, data, embed, announcement, msg);
  }

  setTimeout(async () => {
    await msg.edit({
      embeds: [embed],
      components: [button],
    });
  }, 2_000);

  setTimeout(() => {
    notifiedChannels.delete(user_login);
  }, 600_000);
}

async function updateStream(client, data) {
  if (mongoose.connection.readyState !== 1) return;

  const guild = await client.guilds.fetch(process.env.guildID);
  if (!guild) return;

  const eventsList = await eventsModel.findOne({
    guildId: guild.id,
    Stream: true,
  });
  if (!eventsList) return;

  const { username, category, title, viewer_count } = data;
  const user_login = username.toLowerCase();
  const { image, url } = createItems(username);

  const streamer = STREAMERS[user_login];
  if (!streamer.embed) return;

  let update = false;
  if (
    streamer.streamData.category != category ||
    streamer.streamData.title != title
  )
    update = true;

  if (!update) return;

  presenceHandler.streamPresence(client, title, username);

  const announcement = `Hey ${utils.tag}\n**${username}** is now LIVE on Twitch! 😍🔔\n\n## ${title}\n\n${url}`;

  const embed = streamer.embed
    .setTitle(`**${title}**`)
    .setDescription(
      `Streaming **${category || `Just Chatting`}** for ${viewer_count} viewers`
    )
    .setImage(image);

  const msg = await streamer.msg.edit({
    embeds: [embed],
    content: announcement,
  });

  console.log(`${consoleTags.app} ${username}'s twitch notification updated.`);

  updateStreamerData(user_login, data, embed, announcement, msg);
}

async function endStream(client, data) {
  if (mongoose.connection.readyState !== 1) return;

  const guild = await client.guilds.fetch(process.env.guildID);
  if (!guild) return;

  const eventsList = await eventsModel.findOne({
    guildId: guild.id,
    Stream: true,
  });
  if (!eventsList) return;

  const user_login = data.username.toLowerCase();

  await streamModel.updateOne(
    {
      guild: guild.id,
      Streamer: user_login,
    },
    { IsLive: false }
  );

  presenceHandler.mainPresence(client);

  const { offline_image } = data;
  const announcement = `${data.username} has gone offline. 😢`;

  const streamer = STREAMERS[user_login];
  if (!streamer.embed) return;

  const embed = streamer.embed.setImage(offline_image);

  await streamer.msg.edit({
    embeds: [embed],
    content: announcement,
    components: [],
  });

  console.log(
    `${consoleTags.app} ${data.username}'s twitch notification edited to offline mode.`
  );

  resetStreamerData(user_login);
}

async function newVideo(client, data) {
  if (mongoose.connection.readyState !== 1) return;

  const guild = await client.guilds.fetch(process.env.guildID);
  if (!guild) return;

  const eventsList = await eventsModel.findOne({
    guildId: guild.id,
    Video: true,
  });
  if (!eventsList) return;

  const channelsList = await channelModel.findOne({
    guildId: guild.id,
  });
  if (!channelsList) return;

  const channelId = channelsList.videoId;
  if (!channelId) return;

  const channel = await guild.channels.fetch(channelId);
  if (!channel) return;

  const user_login = data.username === "Sayeh" ? "Sayeh" : "Hamid";

  let videoList = await videoModel.findOne({
    guild: guild.id,
    Channel: user_login,
  });

  if (!videoList) {
    videoList = new videoModel({
      guild: guild.id,
      Channel: user_login,
      VideoId: data.latest[0].id,
    });

    return await videoList.save();
  }

  if (notifiedChannels.has(user_login)) return;
  notifiedChannels.add(user_login);

  await videoModel.updateOne(
    { guild: guild.id, Channel: user_login },
    {
      VideoId: data.latest[0].id,
    }
  );

  const { title, url, id } = data.latest[0];

  const thumbnailId = id.slice(9);
  const image = `https://img.youtube.com/vi/${thumbnailId}/maxresdefault.jpg`;
  const channelUrl =
    data.username === "Sayeh"
      ? utils.urls.youtube_sayeh
      : utils.urls.youtube_hamid;

  presenceHandler.videoPresence(client);

  const embed = new EmbedBuilder()
    .setAuthor({
      name: data.username,
      iconURL: data.avatar,
      url: channelUrl,
    })
    .setTitle(`**${title}**`)
    .setURL(url)
    .setDescription(`${data.username} published a video on YouTube!`)
    .setColor(utils.colors.youtube)
    .setTimestamp(Date.now())
    .setImage(image)
    .setThumbnail(data.avatar)
    .setFooter({
      iconURL: utils.footers.youtube,
      text: utils.texts.youtube,
    });

  const announcement = `Hey ${utils.tag}\n**${data.username}** just published a new video! 😍🔔\n\n## ${title}\n\n${url}`;

  const { urlButton } = createUrlButton(utils.labels.video, url);
  const button = new ActionRowBuilder().addComponents(urlButton);

  const msg = await channel.send({
    content: announcement,
  });

  setTimeout(async () => {
    await msg?.edit({
      embeds: [embed],
      components: [button],
    });
  }, 2_000);

  console.log(
    `${consoleTags.notif} ${data.username} just published a new video on YouTube!`
  );

  setTimeout(() => {
    notifiedChannels.delete(user_login);
  }, 600_000);
}

module.exports = {
  startStream,
  updateStream,
  endStream,
  newVideo,
};
