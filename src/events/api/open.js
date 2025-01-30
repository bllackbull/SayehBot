const { consoleTags } = require("../../utils/main/mainUtils");
const wsModel = require("../../database/wsModel");

module.exports = {
  name: "open",

  async execute() {
    console.log(`${consoleTags.ws} Connection has been established.`);

    await wsModel.findOneAndUpdate({}, { Connection: true }, { upsert: true });
  },
};
