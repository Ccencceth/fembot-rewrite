const { SlashCommandBuilder } = require("discord.js");
const anonUserSettings = require("../../schemas/anonusersettings");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("anondm")
    .setDescription("anonymous dms")
    .addSubcommand((subcommand) =>
      subcommand.setName("toggle").setDescription("enable/disable recieving anonymous dms")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("send").setDescription("send an anonymous dm")
    ),
  async execute(interaction) {
    if (interaction.options.getSubcommand() === "send") {
      await interaction.reply("working on it");
      return;
    } 
    if (interaction.options.getSubcommand() === "toggle") {
      await interaction.reply("working on it");
      return;
    }
  },
};
