const { EmbedBuilder } = require("discord.js");
const { titles, footers, colors } = require("../main/mainUtils");

function createEmbed(response) {
  const embed = new EmbedBuilder()
    .setTitle(titles.sayehai)
    .setDescription(response)
    .setColor(colors.sayehai)
    .setFooter({
      iconURL: footers.exclamation,
      text: "SayehAI can make mistakes.",
    });

  return embed;
}

module.exports = { createEmbed };
