const buttons = {
  view: "<:view:1328810076621897762>",
  add: "<:add:1328808683236229141>",
  remove: "<:remove:1328809820727414857>",
  filter: "<:effect:1328806838484992010>",
  repeat: "<:repeat:1328806089210462290>",
  move: "<:move:1328805669952028784>",
  playlist: "<:playlist:1271847051344347198>",
  search: "<:search:1328794516576141314>",
  play: "<:play:1328793704458358785>",
  previous: "<:previous:1328795136825753642>",
  pause: "<:pause:1328792081392599191>",
  skip: "<:skip:1328793165397753857>",
  shuffle: "<:shuffle:1328796760763535420>",
  favorite: "🤍",
};

const titles = {
  nowplaying: "**🎵 Now Playing**",
  track: "🎵 Track",
  album: "**🎶 Album**",
  playlist: "**🎶 Playlist**",
  voteskip: `**${buttons.skip} Vote Skip**`,
  skip: `**${buttons.skip} Skip**`,
  previous: `**${buttons.previous} Previous**`,
  replay: "**🔄 Replay**",
  seek: `**${buttons.skip} Seek**`,
  upcoming: `**${buttons.skip} Upcoming Tracks**`,
  pause: `**${buttons.pause} Pause**`,
  resume: `**${buttons.play} Resume**`,
  repeat: `"**${buttons.repeat} Repeat**`,
  shuffle: `**${buttons.shuffle} Shuffle**`,
  move: `**${buttons.move} Move**`,
  queue: `**${buttons.playlist} Queue**`,
  filter: `**${buttons.filter} Audio Filters**`,
  search: `**${buttons.search} Search Result**`,
  leave: "**❎ Leave**",
  addfavorite: `**${buttons.add} Add Track**`,
  removefavorite: `**${buttons.remove} Remove Track**`,
  fullfavorite: "**Full Playlist**",
  viewfavorite: `**${buttons.view} View Playlist**`,
  clearfavorite: `**${buttons.remove} Clear Playlist**`,
  actioncancelled: "**❌ Action Cancelled**",
};

const colors = {
  youtube: "#ff0000",
  spotify: "#1db954",
  soundcloud: "#ff5500",
  applemusic: "#f94c57",
  music: "#256fc4",
};

const footers = {
  youtube: "https://i.imgur.com/lP3PjwD.png",
  spotify: "https://i.imgur.com/nMOYQ9T.png",
  soundcloud: "https://i.imgur.com/q07BmFw.png",
  applemusic: "https://i.imgur.com/1lJOb6i.png",
  genius: "https://i.imgur.com/qJJpRQ4.png",
  page: "https://i.imgur.com/RpkfWKy.png",
  favorite: "https://i.imgur.com/lOT3Ii5.png",
  music: "https://i.imgur.com/vI8XyWe.png",
};

const texts = {
  applemusic: "Apple Music",
  youtube: "YouTube",
  spotify: "Spotify",
  soundcloud: "Soundcloud",
  favorite: "Favorite",
  music: "Music",
};

const thumbnails = {
  pause: "https://i.imgur.com/8uaJDrj.png",
  resume: "https://i.imgur.com/PUCQ7vZ.png",
  shuffle: "https://i.imgur.com/rk96zds.png",
  repeat: "https://i.imgur.com/9E3b5Cv.png",
  filter: "https://i.imgur.com/LlJYfy0.png",
  leave: "https://i.imgur.com/zkXbpHy.png",
  voteskip: "https://i.imgur.com/MgFIhIN.png",
  successvote: "https://i.imgur.com/BjvYAao.png",
  failvote: "https://i.imgur.com/8ef49od.png",
  fullfavorite: "https://i.imgur.com/EpGilgs.png",
  emptyfavorite: "https://i.imgur.com/rXXcmhq.png",
  deletewarning: "https://i.imgur.com/WQFdlMq.png",
};

const filters = [
  {
    label: "8D",
    value: "8D",
    description: "Simulate surround audio effect.",
    emoji: "<:surround:1328811576756666470>",
  },
  {
    label: "Normalizer",
    value: "normalizer",
    description: "Normalize the audio (avoid distortion).",
    emoji: "<:normalizer:1271847038686072842>",
  },
  {
    label: "Bass boost",
    value: "bassboost_high",
    description: "Boost the bass of the audio.",
    emoji: "🔊",
  },
  {
    label: "Nightcore",
    value: "nightcore",
    description: "Speed up the audio (higher pitch).",
    emoji: "💨",
  },
  {
    label: "Vaporwave",
    value: "vaporwave",
    description: "Slow down the audio (lower pitch).",
    emoji: "🐌",
  },
  {
    label: "Reverse",
    value: "reverse",
    description: "Reverse the audio.",
    emoji: "◀",
  },
  {
    label: "Fade-in",
    value: "fadein",
    description: "Add a progressive increase in the volume of the audio.",
    emoji: "📈",
  },
  {
    label: "Karaoke",
    value: "karaoke",
    description: "Lower the singer's voice from the audio.",
    emoji: "<:karaoke:1328812919328211058>",
  },
  {
    label: "Vibrato",
    value: "vibrato",
    description: "Make the notes change pitch subtly and quickly.",
    emoji: "<:vibrate:1328813091655516182>",
  },
  {
    label: "Earrape",
    value: "earrape",
    description: "Add a extremely loud and distorted audio.",
    emoji: "👂",
  },
];

const favoriteSizes = [
  { label: "Tier 1", value: 100 },
  { label: "Tier 2", value: 150 },
  { label: "Tier 3", value: 200 },
];

module.exports = {
  titles,
  colors,
  buttons,
  footers,
  texts,
  thumbnails,
  filters,
  favoriteSizes,
};
