const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
  Events,
} = require("discord.js");
const utils = require("../../utils/main/mainUtils");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("test")
    .setDescription(
      `${utils.tags.reworked} ${utils.tags.mod} Simulate an event triggeration.`
    )
    .addStringOption((option) =>
      option
        .setName("event")
        .setDescription("Select an event to test.")
        .setRequired(true)
        .addChoices(
          {
            name: utils.events.welcome,
            value: Events.GuildMemberAdd,
          },
          {
            name: utils.events.leave,
            value: Events.GuildMemberRemove,
          },
          {
            name: utils.events.boost,
            value: Events.GuildMemberUpdate,
          },
          {
            name: utils.events.levelUp,
            value: "levelUp",
          },
          {
            name: utils.events.levelDown,
            value: "levelDown",
          },
          {
            name: utils.events.birthday,
            value: "birthday",
          }
        )
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
    .setDMPermission(false),

  async execute(interaction, client) {
    const event = interaction.options.get("event").value;

    if (event === Events.GuildMemberUpdate) {
      const newMember = {
        guild: {
          id: interaction.guild.id,
        },
        premiumSince: new Date(),
        user: interaction.user,
        id: interaction.user.id,
      };

      await client.emit(event, false, newMember);
    } else if (event === "levelUp" || event === "levelDown") {
      const user = {
        guildId: interaction.guild.id,
        userId: interaction.user.id,
      };

      await client.emit(event, user);
    } else if (event === "birthday") {
      const user = interaction.user.id;
      const guildId = interaction.guild.id;
      const age = 0;

      await client.emit(event, user, guildId, age);
    } else {
      await client.emit(event, interaction.member);
    }

    const embed = new EmbedBuilder()
      .setTitle(utils.titles.test)
      .setDescription("Event has been triggered successfully.")
      .setColor(utils.colors.default)
      .setThumbnail(utils.thumbnails.success)
      .setFooter({
        text: utils.texts.bot,
        iconURL: utils.footers.bot,
      });

    await interaction.reply({
      embeds: [embed],
      ephemeral: true,
    });
  },
};
