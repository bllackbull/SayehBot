const { consoleTags } = require("../../utils/main/mainUtils");

module.exports = {
  name: "close",

  async execute() {
    console.log(`${consoleTags.ws} Disconnected from WebSocket server.`);
  },
};
