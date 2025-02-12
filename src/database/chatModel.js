const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  UserId: String,
  Username: String,
  TwitchUserId: String,
  TwitchUsername: String,
  Email: String,
  LastSource: String,
  Title: String,
  Messages: [
    {
      role: String,
      content: String,
    },
  ],
  TokensUsed: Number,
  LastUpdated: String,
});

module.exports = mongoose.model("chat", chatSchema);
