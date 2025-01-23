const { consoleTags } = require("../main/mainUtils");
let checkApi, birthdayInterval, presenceInterval, systemInterval;

function setIntervals(client) {
  checkApi = setInterval(client.checkApi, 600_000);
  birthdayInterval = setInterval(client.remindBirthday, 600_000);
  presenceInterval = setInterval(client.updatePresence, 3_600_000);
  systemInterval = setInterval(client.checkSystem, 10_000);

  console.log(`${consoleTags.app} Intervals have been set.`);
}

function clearIntervals() {
  clearIntervals(checkApi);
  clearInterval(birthdayInterval);
  clearInterval(presenceInterval);
  clearInterval(systemInterval);

  console.log(`${consoleTags.app} Intervals have been cleared.`);
}

module.exports = {
  setIntervals,
  clearIntervals,
};
