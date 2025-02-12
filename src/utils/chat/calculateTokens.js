const { encode } = require("gpt-tokenizer");
const chatModel = require("../../database/chatModel");
const { TOKEN_LIMIT } = require("../main/mainUtils");

async function checkDate(chatProfile) {
  const date = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const { UserId, TokensUsed, LastUpdated } = chatProfile;

  if (!TokensUsed || !LastUpdated || LastUpdated !== date) {
    await chatModel.updateOne(
      { UserId },
      {
        TokensUsed: 0,
        LastUpdated: date,
      }
    );
  }
}

async function updateTotalTokens(userId, prompt, response) {
  const chatProfile = await chatModel.findOne({
    UserId: userId,
  });

  if (!chatProfile) return;

  const promptTokens = encode(prompt).length;
  const responseTokens = encode(response).length;

  let newTotalTokens = chatProfile.TokensUsed + promptTokens + responseTokens;

  if (newTotalTokens > TOKEN_LIMIT) {
    newTotalTokens = TOKEN_LIMIT;
  }

  await chatModel.updateOne(
    { UserId: userId },
    {
      TokensUsed: newTotalTokens,
    }
  );
}

module.exports = { checkDate, updateTotalTokens };
