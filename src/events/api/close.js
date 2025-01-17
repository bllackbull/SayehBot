const { consoleTags } = require("../../utils/main/mainUtils");
const { notifDeveloper } = require("../../utils/main/handleNotifications");

module.exports = {
  name: "close",

  async execute() {
    const message = `${consoleTags.ws} Disconnected from WebSocket server.`;

    console.error(message);

    await notifDeveloper(message);
  },
};
