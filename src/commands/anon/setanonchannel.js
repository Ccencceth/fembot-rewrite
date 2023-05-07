const anonGuildSettings = require("../../schemas/anonguildsettings");
const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  ChannelType
} = require("discord.js");
const mongoose = require("mongoose");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("setanonchannel")
    .setDescription("Sets this channel as the guilds anonymous channel")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .setDMPermission(false),
  async execute(interaction, client) {
    if (interaction.channel.type !== ChannelType.GuildText) {
      await interaction.reply({
        content: "Invalid channel type! please use a server text channel.",
        ephemeral: true,
      });
      return;
    }

    let guildProfile = await anonGuildSettings.findOne({
      _id: interaction.guild.id,
    });
    if (!guildProfile) {
      guildProfile = await new anonGuildSettings({
        _id: interaction.guild.id,
        anonChannelId: interaction.channelId,
      });

      await guildProfile.save().catch(console.error);
      await interaction.reply({
        content: `successfuly set channel to anon channel :)`,
      });
    } else {
      if (interaction.channelId === guildProfile.anonChannelId) {
        interaction.reply({
          content: `Channel is already set here idiot`,
          ephemeral: true,
        });
        return;
      }

      guildProfile.anonChannelId = interaction.channelId;
      await guildProfile.save().catch(console.error);
      await interaction.reply({
        content: `successfuly set channel to anon channel :) (hopefully)`,
      });
    }
  },
};
