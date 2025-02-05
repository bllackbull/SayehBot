const WebSocket = require("ws");
const { consoleTags } = require("../main/mainUtils");
const wsModel = require("../../database/wsModel");

let ws;

function connectWebSocket() {
  ws = new WebSocket("wss://api.sayehgame.com/ws");

  ws.on("close", async () => {
    console.log(`${consoleTags.ws} Attempting to reconnect...`);
    await wsModel.findOneAndUpdate({}, { Connection: false }, { upsert: true });
    setTimeout(connectWebSocket, 5000);
  });

  return ws;
}

module.exports = { connectWebSocket };
