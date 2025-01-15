const { consoleTags } = require("../../utils/main/mainUtils");

module.exports = {
  name: "error",

  async execute(error) {
    console.error(`${consoleTags.ws} error:`, error.message);
  },
};
