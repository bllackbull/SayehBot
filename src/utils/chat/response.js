const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.CLOUDFLARE_API_KEY,
  baseURL: `https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/v1`,
});

async function response(messages) {
  try {
    const result = await openai.chat.completions.create({
      model: "@cf/meta/llama-3.1-8b-instruct",
      messages,
    });

    return result.choices[0].message.content;
  } catch (error) {
    throw error;
  }
}

module.exports = { response };
