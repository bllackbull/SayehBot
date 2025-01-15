const { consoleTags } = require("../../utils/main/mainUtils");

module.exports = {
  name: "open",

  async execute() {
    console.log(`${consoleTags.ws} Connection has been established.`);
  },
};
