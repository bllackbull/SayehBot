const { consoleTags } = require("../../utils/main/mainUtils");
const wsModel = require("../../database/wsModel");

module.exports = {
  name: "close",

  async execute() {
    console.error(`${consoleTags.ws} Disconnected from WebSocket server.`);

    await wsModel.findOneAndUpdate({}, { Connection: false }, { upsert: true });
  },
};
