const xpModel = require("../../database/xpModel");
const { XPreqs, keyLevels, keyPercentages } = require("./cardUtils");
const { subRole1, subRole2, subRole3, boostRole } = process.env;

function calculatePercentage(level) {
  for (let i = 0; i < keyLevels.length - 1; i++) {
    if (level >= keyLevels[i] && level < keyLevels[i + 1]) {
      const startLevel = keyLevels[i];
      const endLevel = keyLevels[i + 1];
      const startPercentage = keyPercentages[i];
      const endPercentage = keyPercentages[i + 1];
      const levelRange = endLevel - startLevel;
      const percentageRange = startPercentage - endPercentage;
      const levelProgress = level - startLevel;
      return startPercentage - (percentageRange * levelProgress) / levelRange;
    }
  }
  return keyPercentages[keyPercentages.length - 1];
}

module.exports.calculateXP = async (input, user) => {
  const xpProfile = await xpModel.findOne({
    guildId: user.guildId,
  });

  const baseXP = xpProfile ? xpProfile.basexp : 20;
  const maxXP = XPreqs[user.level];
  const percentage = calculatePercentage(user.level);
  const XP = Math.floor((percentage / 100) * maxXP * (baseXP / 20));

  let boost = 1;

  const roleMultipliers = new Map([
    [subRole1, 1.25],
    [subRole2, 1.5],
    [subRole3, 2],
  ]);

  for (const [role, multiplier] of roleMultipliers) {
    if (input.member.roles.cache.has(role)) {
      boost = multiplier;
      break;
    }
  }

  if (input.member.roles.cache.has(boostRole)) boost += 0.5;

  const finalXP = Math.floor(XP * boost);

  return finalXP;
};
