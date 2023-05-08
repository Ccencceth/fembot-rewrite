const { SlashCommandBuilder } = require("discord.js");
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
    let command = "incomplete";
    if (command !== "done") {
      return;
    }

    let userProfile = await new anonUserSettings.findOne({
      _id: interaction.user.id,
    });

    if (!userProfile) {
      userProfile = await new anonUserSettings({
        _id: interaction.user.id,
        defaultAnonServerId: "none",
        blockAll: true,
        blockedUsers: [],
      });
    }

    if (interaction.option.getSubcommand === "setdefault") {
      userProfile.defaultAnonServerId = interaction.channelId;
      await userProfile.save().catch(console.error);
      await interaction.reply("hehe this doesnt do things right");
    }
  },
};
