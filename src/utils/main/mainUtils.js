const titles = {
  clear: "**🚮 Clear**",
  delete: "**🚮 Delete**",
  help: `**${emojis.help} Help**`,
  ping: "**📶 Ping**",
  qr: `**${emojis.qr} QR Code**`,
  scan: "**🌍 Website Virus Scan**",
  gamble_winner: "**🥇 Winner**",
  gamble_loser: "**😢 Loser**",
  bookmark: `**${emojis.bookmark} Bookmark**`,
  level: "**🤖 Leveling System**",
  leaderboard: "🏅 Leaderboard",
  birthday: "**🎂 Birthday**",
  commands: `**${emojis.command} Available Commands**`,
  presence: `**${emojis.user} Presence Updated**`,
  profile: `**${emojis.user} Profile Updated**`,
  error: "**Error**",
  warn: "**Target Warned**",
  warning: "**Warning!**",
  warnlist: "**WarnList**",
  warnrecord: "**Warn Record**",
  reportcase_open: "**Report Case**",
  reportcase_close: "**Case Closed**",
  report_success: "**Successfully Reported**",
  action_failed: "**Action Failed**",
  test: "**🧪 Event Test**",
  info: "**Bot Info**",
  system: "**⚙️ System Action**",
  events: "**Events**",
  website: `**${emojis.icon} sayehgame.com**`,
  yell: "**📢 Yell**",
  announce: "**Announcement**",
  blackjack: "🃏 𝐁𝐥𝐚𝐜𝐤𝐣𝐚𝐜𝐤",
  sayehai: `**${emojis.sayehai} SayehAI**`,
};

const events = {
  welcome: "🎀 Welcome",
  leave: "👋 Leave",
  boost: "🚀 Boost",
  birthday: "🎂 Birthday",
  stream: "📺 Stream",
  video: "📺 Video",
  level: "🥇 Level",
  levelUp: "📈 Level Up",
  levelDown: "📉 Level Down",
  mod: "⚔️ Moderation",
  player: "🎵 Player",
};

const presences = {
  main: "𝑪𝒉𝒊𝒍𝒍𝒊𝒏𝒈 𝑷𝒂𝒏𝒅𝒂 🐼💤",
  stream: "on Twitch 📺",
  video: "New Video on YouTube! 📺",
};

const labels = {
  stream: "Watch Stream",
  video: "Watch Video",
};

const texts = {
  tools: "Tools",
  moderation: "Moderation",
  overwatch: "Overwatch 2",
  gamble: "Gamble",
  wow: "World of Warcraft",
  twitch: "Twitch",
  youtube: "YouTube",
  telegram: "Telegram",
  instagram: "Instagram",
  steam: "Steam",
  bot: "Bot Manager",
  nasa: "NASA",
  imdb: "IMDb",
  website: "Website",
};

const tag = "@everyone";

const colors = {
  default: "#25bfc4",
  apex: "#b93038",
  overwatch: "#f99e1a",
  valorant: "#fd4556",
  wow: "#f7941d",
  warning: "#ffea00",
  error: "#e01010",
  success: "#46eb34",
  twitch: "#6441a5",
  youtube: "#ff0000",
  steam: "#1b2838",
  giveaway: "#c42577",
  imdb: "#deb522",
  gamble_winner: "#001eff",
  gamble_loser: "#d20202",
  casino: "#2b07b8",
  sunny_weather: "#ffe700",
  clear_weather: "#00ccff",
  rain_weather: "#7f9ba6",
  wind_weather: "#7576e0",
  storm_weather: "#4e6969",
  cloud_weather: "#f1f1f1",
  snow_weather: "#ebecf1",
  sayehai: "#ff00ee",
};

const footers = {
  tools: "https://i.imgur.com/l15zpW0.png",
  moderation: "https://i.imgur.com/vuPFn0B.png",
  page: "https://i.imgur.com/RpkfWKy.png",
  apex: "https://i.imgur.com/Pbpwop0.png",
  overwatch: "https://i.imgur.com/ou3sk4U.png",
  gamble: "https://i.imgur.com/2ZXXgx5.png",
  wow: "https://i.imgur.com/n34gUTh.png",
  date: "https://i.imgur.com/BrgcQ9O.png",
  twitch: "https://i.imgur.com/KAb3lpX.png",
  youtube: "https://i.imgur.com/lP3PjwD.png",
  steam: "https://i.imgur.com/a769BzM.png",
  bot: "https://i.imgur.com/v8O0feS.png",
  nasa: "https://i.imgur.com/V9awHxy.png",
  imdb: "https://download.logo.wine/logo/IMDb/IMDb-Logo.wine.png",
  exclamation: "https://i.imgur.com/saRAWUz.png",
};

const thumbnails = {
  tools: "https://i.imgur.com/l15zpW0.png",
  clear: "https://i.imgur.com/FhH4jJL.png",
  delete: "https://i.imgur.com/YPaDC4S.png",
  system: "https://i.imgur.com/UD49B9U.png",
  ping: "https://i.imgur.com/e7YutBG.png",
  no_results: "https://i.imgur.com/mWSzYrQ.png",
  connection_error: "https://i.imgur.com/ZvaYoK6.png",
  warning: "https://i.imgur.com/mlekPA6.png",
  error: "https://i.imgur.com/xyfU2uT.png",
  success: "https://i.imgur.com/jDR8Ihh.png",
  virus: "https://i.imgur.com/XtPASQJ.png",
  busy: "https://i.imgur.com/np3CKvO.png",
  access: "https://i.imgur.com/iJSVpii.png",
  case: "https://i.imgur.com/pHfa5pw.png",
  roll: "https://i.imgur.com/851YpFE.png",
  casino: "https://i.imgur.com/NabJ4ov.png",
  bookmark: "https://i.imgur.com/FjwLaip.png",
  twitch_sayeh: "https://i.imgur.com/7aO5p95.png",
  twitch_hamid: "https://i.imgur.com/VdPzgLm.png",
  twitch_offline_sayeh: "https://i.imgur.com/6BsizDi.jpg",
  twitch_offline_hamid: "https://i.imgur.com/nmKK3BU.jpg",
  youtube_sayeh_stream: "https://i.imgur.com/qjvAnGf.jpg",
  tf2: "https://i.imgur.com/DQgNJgP.png",
  cs: "https://i.imgur.com/J0NbZqS.png",
  dota: "https://i.imgur.com/VrUFhs4.png",
  market: "https://i.imgur.com/GyePHjC.png",
  birthday: "https://i.imgur.com/ypwCxLa.png",
};

const gifs = {
  flip: "https://i.imgur.com/I4mtHv8.gif",
  fuch: "https://i.imgur.com/CfFt7yI.gif",
  kish: "https://i.imgur.com/2j9km8I.gif",
  kiss: "https://i.imgur.com/flcFO8U.gif",
  spank: "https://i.imgur.com/QLjPSmH.gif",
};

const urls = {
  youtube_sayeh: "https://www.youtube.com/@Say3h/?sub_confirmation=1",
  youtube_hamid: "https://www.youtube.com/@SayehStream/?sub_confirmation=1",
  twitch_sayeh: "https://twitch.tv/Sayeh",
  kick: "https://kick.com/sayeh",
  telegram: "https://t.me/sayeh_game",
  instagram: "https://www.instagram.com/sayeh_game",
  website: "https://sayehgame.com",
};

const emojis = {
  sayehai: "<:sayehai:1327276070445256886>",
  bookmark: "<:bookmark:1271846805306605599>",
  bin: "<:bin:1328809241816862750>",
  next: "<:nextpage:1329040805679075369>",
  previous: "<:previouspage:1329042943058645053>",
  help: "<:help:1329056395554848788>",
  icon: "<:webicon:1329057518722355252>",
  user: "<:user:1329059359417958501>",
  qr: "<:qr:1329059947849187378>",
  command: "<:command:1329061892932632606>",
  message: "<:message:1329063406224805938>",
  cursor: "<:cursor:1329064273972035625>",
};

const warnPenalties = [
  { label: "Warning Message", timer: 0 },
  { label: "1 Minute Timeout", timer: 60_000 },
  { label: "10 Minutes Timeout", timer: 600_000 },
  { label: "30 Minutes Timeout", timer: 1_800_000 },
  { label: "1 Hour Timeout", timer: 3_600_000 },
  { label: "5 Hours Timeout", timer: 18_000_000 },
  { label: "12 Hours Timeout", timer: 43_200_000 },
  { label: "1 Day Timeout", timer: 86_400_000 },
  { label: "3 Days Timeout", timer: 259_200_000 },
  { label: "1 Week Timeout", timer: 604_800_000 },
];

const bannedWords = [
  "+18",
  "kos",
  "kir",
  "kun",
  "dick",
  "pussy",
  "ass",
  "boobs",
  "sex",
  "fuck",
  "porn",
  "nude",
  "horny",
  "onlyfans",
  "only fans",
  "کص",
  "کیر",
  "کون",
  "دیک",
  "پوسی",
  "کصکش",
  "ممه",
  "سکس",
  "گایید",
  "پورن",
  "حشری",
];

const formats = ["image/png", "image/gif", "image/jpeg"];
const formatsLabel = ".png, .gif, .jpeg, .jpg";

const modes = { enabled: "Enabled ✅", disabled: "Disabled ❌" };

const tags = {
  new: "[New]",
  updated: "[Updated]",
  reworked: "[Reworked]",
  mod: "[Mods-only]",
  admin: "[Admins-only]",
  music: "[Music]",
  game: "[Game]",
  tools: "[Tools]",
  images: "[Images]",
};

const consoleTags = {
  app: "[Application]",
  notif: "[Notification]",
  warning: "[Warning]",
  error: "[Error]",
  player: "[Player]",
  ws: "[WebSocket]",
};

const results = {
  won: "𝐘𝐨𝐮 𝐰𝐨𝐧!",
  lost: "𝐘𝐨𝐮 𝐥𝐨𝐬𝐭.",
  busted: "𝐁𝐮𝐬𝐭𝐞𝐝! 𝐘𝐨𝐮 𝐥𝐨𝐬𝐭.",
  tie: "𝐓𝐢𝐞!",
};

const TOKEN_LIMIT = 2_000;

module.exports = {
  titles,
  events,
  presences,
  labels,
  colors,
  footers,
  thumbnails,
  gifs,
  texts,
  tag,
  urls,
  emojis,
  warnPenalties,
  formats,
  formatsLabel,
  bannedWords,
  modes,
  tags,
  consoleTags,
  results,
  TOKEN_LIMIT,
};
