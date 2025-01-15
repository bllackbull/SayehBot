const { consoleTags } = require("../../utils/main/mainUtils");

module.exports = {
  name: "close",

  async execute(client) {
    console.error(`${consoleTags.ws} Disconnected from WebSocket server.`);

    const developer = await client.users.fetch(process.env.developerID);
    if (!developer) return;

    await developer.send(
      `${consoleTags.ws} Disconnected from WebSocket server.`
    );
  },
};
