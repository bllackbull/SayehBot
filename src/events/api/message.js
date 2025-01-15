const { checkData } = require("../../utils/api/checkData");
const { consoleTags } = require("../../utils/main/mainUtils");

module.exports = {
  name: "message",

  async execute(data, client) {
    await checkData(data, client);

    console.log(`${consoleTags.ws} Message received from server.`);
  },
};
