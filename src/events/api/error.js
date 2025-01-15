const { consoleTags } = require("../../utils/main/mainUtils");

module.exports = {
  name: "error",

  async execute(error) {
    console.log(`${consoleTags.ws} error:`, error.message);
  },
};
