const WebSocket = require("ws");
const { consoleTags } = require("../main/mainUtils");

let ws;

function connectWebSocket() {
  ws = new WebSocket("wss://api.sayehgame.com/ws");

  ws.on("close", () => {
    console.error(`${consoleTags.ws} Attempting to reconnect...`);
    setTimeout(connectWebSocket, 5000);
  });

  return ws;
}

module.exports = { connectWebSocket };
