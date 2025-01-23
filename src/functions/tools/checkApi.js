const axios = require("axios");
const { checkData } = require("../../utils/api/checkData");
const { warning } = require("../../utils/main/mainUtils").consoleTags;

module.exports = (client) => {
  client.checkApi = async () => {
    try {
      const response = await axios.get("https://api.sayehgame.com");
      const data = response.data;

      await checkData(data);
    } catch (error) {
      console.error(`${warning} Error while checking API :`, error.message);
    }
  };
};
