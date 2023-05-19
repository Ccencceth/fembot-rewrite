const {
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder,
} = require("discord.js");
const anonUserSettings = require("../../schemas/anonusersettings");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("anonmessage")
    .setDescription("this doesnt work yet :P")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("setdefault")
        .setDescription("Set which server you will send messages too.")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("send")
        .setDescription("Send a message to your selected servers anon channel")
    ),
  async execute(interaction, client) {
    let userProfile = await anonUserSettings.findOne({
      _id: interaction.user.id,
    });

    if (!userProfile) {
      userProfile = await new anonUserSettings({
        _id: interaction.user.id,
        defaultAnonServerId: "none",
        blockAll: true,
        blockedUsers: [],
      });

      await userProfile.save().catch(console.error);
    }

    if (interaction.options.getSubcommand() === "setdefault") {
      const guilds = [];
      for (const [, guild] of interaction.client.guilds.cache) {
        await guild.members
          .fetch(interaction.user)
          .then(() => guilds.push(guild))
          .catch((error) => console.log(error));
      }

      const servers = [];
      for (let i = 0; i < Object.keys(guilds).length; i++) {
        servers.push({
          label: Object.entries(guilds)[i][1].name,
          value: Object.entries(guilds)[i][1].id,
        });
      }

      const row = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
          .setCustomId("selectanonmessageserver")
          .setPlaceholder("Select a server")
          .addOptions(servers)
      );
      await interaction.reply({ components: [row], ephemeral: true });
    }
  },
};
