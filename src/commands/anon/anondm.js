const { SlashCommandBuilder } = require("discord.js");
const anonUserSettings = require("../../schemas/anonusersettings");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("anondm")
    .setDescription("anonymous dms")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("toggle")
        .setDescription("enable/disable recieving anonymous dms")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("send").setDescription("send an anonymous dm")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("blockuser")
        .setDescription("block a specific person you HATE from sending anondms")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("unblockuser")
        .setDescription(
          "unblock a specific person you LOVE from sending anondms"
        )
    ),
  async execute(interaction) {
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
    }

    if (interaction.options.getSubcommand() === "send") {
      await interaction.reply("working on it");
      return;
    }
    if (interaction.options.getSubcommand() === "toggle") {
      await interaction.reply("working on it");

      userProfile.blockAll = !userProfile.blockAll;
      userProfile.save().catch(console.error);

      if (userProfile.blockAll) {
        await interaction.editReply("You can no longer receive anonymous dms");
      } else {
        await interaction.editReply("You can now receive anonymous dms");
      }
      return;
    }
    if (interaction.options.getSubcommand() === "blockuser") {
      await interaction.reply("working on it");
      return;
    }
    if (interaction.options.getSubcommand() === "unblockuser") {
      await interaction.reply("working on it");
      return;
    }
  },
};
