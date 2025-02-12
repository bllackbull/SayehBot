const {
  SlashCommandBuilder,
  EmbedBuilder,
  ComponentType,
} = require("discord.js");
const {
  createDeck,
  drawCard,
  calculateScore,
  handToString,
  hasAce,
} = require("../../utils/main/handleDecks");
const { maxLevel } = require("../../utils/level/cardUtils");
const errorHandler = require("../../utils/main/handleErrors");
const { getUser } = require("../../utils/level/handleLevel");
const { createBlackjackButtons } = require("../../utils/main/createButtons");
const { handleBlackjackXP } = require("../../utils/level/handleLevel");
const deletionHandler = require("../../utils/main/handleDeletion");
const utils = require("../../utils/main/mainUtils");

const openTables = new Set();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("blackjack")
    .setDescription(
      `${utils.tags.updated} ${utils.tags.game} Play a round of blackjack with the bot.`
    )
    .addIntegerOption((option) =>
      option
        .setName("bet")
        .setDescription("Bet an amount of your XP on this round.")
        .setMinValue(1000)
        .setMaxValue(10000)
        .setRequired(true)
    ),

  async execute(interaction) {
    const { guildId, channel } = interaction;
    let success = false;
    let disableHit = false;
    let disableDouble = false;
    let disableSurrender = false;
    let round = 0;

    let bet = interaction.options.getInteger("bet");
    const levelProfile = await getUser(guildId, interaction.user);

    if (levelProfile && levelProfile.totalxp < bet) {
      errorHandler.handleXpError(interaction, interaction.user);
    } else if (levelProfile && levelProfile.totalxp < bet * 2) {
      disableDouble = true;
    } else if (openTables.has(interaction.user.id)) {
      errorHandler.handleTableOpen(interaction);
    } else {
      openTables.add(interaction.user.id);

      const deck = createDeck(6);
      const playerHand = [drawCard(deck), drawCard(deck)];
      const dealerHand = [drawCard(deck), drawCard(deck)];

      let playerScore = calculateScore(playerHand);
      let dealerScore = calculateScore(dealerHand);

      const embed = new EmbedBuilder()
        .setTitle(utils.titles.blackjack)
        .setDescription(
          `### Your Hand:\n${handToString(
            playerHand
          )}\n### Dealer's Hand:\n${handToString([dealerHand[0]])} , **??**`
        )
        .setThumbnail(utils.thumbnails.casino)
        .setColor(utils.colors.casino)
        .setFooter({
          iconURL: utils.footers.gamble,
          text: "Dealer must hit soft 17.",
        });

      const button = createBlackjackButtons(
        disableHit,
        disableDouble,
        disableSurrender
      );

      await interaction.reply({
        embeds: [embed],
        components: [button],
      });

      success = true;
      let result = "";

      const collector = channel.createMessageComponentCollector({
        componentType: ComponentType.Button,
        time: 600_000,
      });

      collector.on("collect", async (i) => {
        if (i.user.id !== interaction.user.id) return;

        round++;

        if (i.customId === "hit") {
          const newCard = drawCard(deck);
          playerHand.push(newCard);
          playerScore = calculateScore(playerHand);

          i.reply({
            content: `You received: **${newCard.value} ${newCard.suit}**`,
            ephemeral: true,
          });

          if (playerScore > 21) result = utils.results.busted;
        } else if (i.customId === "stand") {
          i.reply({
            content: `You chose to stand.`,
            ephemeral: true,
          });

          while (
            dealerScore < 17 ||
            (dealerScore === 17 && hasAce(dealerHand))
          ) {
            dealerHand.push(drawCard(deck));
            dealerScore = calculateScore(dealerHand);
          }

          if (dealerScore > 21 || playerScore > dealerScore) {
            result = utils.results.won;
          } else if (playerScore < dealerScore) {
            result = utils.results.lost;
          } else {
            result = utils.results.tie;
          }
        } else if (i.customId === "double") {
          bet *= 2;
          disableHit = true;

          const newCard = drawCard(deck);
          playerHand.push(newCard);
          playerScore = calculateScore(playerHand);

          i.reply({
            content: `You doubled down your bet to **${bet} XP** and received: **${newCard.value} ${newCard.suit}**`,
            ephemeral: true,
          });

          if (playerScore > 21) result = utils.results.busted;
        } else if (i.customId === "surrender") {
          bet /= 2;

          i.reply({
            content: "You chose to surrender.",
            ephemeral: true,
          });

          result = utils.results.lost;
        }

        if (round > 0) {
          disableDouble = true;
          disableSurrender = true;
        }

        const updatedButton = createBlackjackButtons(
          disableHit,
          disableDouble,
          disableSurrender
        );

        if (result === "") {
          embed.setDescription(
            `### Your Hand:\n${handToString(
              playerHand
            )}\n### Dealer's Hand:\n${handToString([dealerHand[0]])} , **??**`
          );

          await interaction.editReply({
            embeds: [embed],
            components: [updatedButton],
          });
        } else {
          embed.setDescription(
            `# ${result}
                        \n### Your Hand:\n${handToString(
                          playerHand
                        )} (Score: ${playerScore})\n### Dealer's Hand:\n${handToString(
              dealerHand
            )} (Score: ${dealerScore})`
          );

          await interaction.editReply({
            embeds: [embed],
            components: [],
          });

          collector.stop();

          if (!levelProfile) return;
          if (levelProfile.level >= maxLevel) return;
          if (result === utils.results.tie) return;

          const XP =
            result === utils.results.won && playerScore == 21 ? bet * 1.5 : bet;

          await handleBlackjackXP(interaction, XP, result);

          const title =
            result === utils.results.won
              ? utils.titles.gamble_winner
              : utils.titles.gamble_loser;
          const mode = result === utils.results.won ? "won" : "lost";
          const color =
            result === utils.results.won
              ? utils.colors.gamble_winner
              : utils.colors.gamble_loser;

          const gambleEmbed = new EmbedBuilder()
            .setTitle(title)
            .setDescription(`${interaction.user} ${mode} **${XP}** XP`)
            .setThumbnail(utils.thumbnails.casino)
            .setColor(color)
            .setFooter({
              iconURL: utils.footers.gamble,
              text: utils.texts.gamble,
            });

          const msg = await interaction.followUp({
            embeds: [gambleEmbed],
          });

          deletionHandler.handleNonMusicalDeletion(msg, success, 10);
        }
      });

      collector.on("end", () => {
        openTables.delete(interaction.user.id);
      });
    }

    deletionHandler.handleNonMusicalDeletion(interaction, success, 10);
  },
};
