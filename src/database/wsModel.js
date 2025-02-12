const mongoose = require("mongoose");

const wsSchema = new mongoose.Schema({
  Connection: Boolean,
});

module.exports = mongoose.model("ws", wsSchema);
