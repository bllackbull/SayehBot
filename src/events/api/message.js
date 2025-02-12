const { checkData } = require("../../utils/api/checkData");
const { consoleTags } = require("../../utils/main/mainUtils");

module.exports = {
  name: "message",

  async execute(data) {
    console.log(`${consoleTags.ws} Message received from server.`);

    const binaryData = Buffer.from(data);
    const stringData = binaryData.toString("utf-8");

    let jsonData;

    try {
      jsonData = JSON.parse(stringData);
    } catch (error) {
      console.error(
        `${consoleTags.error} While parsing API JSON data:`,
        error.message
      );
    }

    await checkData(jsonData);
  },
};
