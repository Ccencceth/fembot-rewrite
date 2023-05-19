const {
  SlashCommandBuilder,
  StringSelectMenuBuilder,
  ActionRowBuilder,
} = require("discord.js");
const anonUserSettings = require("../../schemas/anonusersettings");
const anonGuildSettings = require("../../schemas/anonguildsettings");

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
    } else if (interaction.options.getSubcommand() === "send") {
      if (userProfile.defaultAnonServerId === "none") {
        interaction.reply({
          content:
            "You don't have a default anonymous channel set. Please select a server using ```/anonmessage setdefault```",
          ephemeral: true,
        });
        return;
      }

      //Check if users selected server has an anonymous channel.
      let guildProfile = await anonGuildSettings.findOne({
        _id: userProfile.defaultAnonServerId,
      });

      if (!guildProfile) {
        interaction.reply({
          content:
            "Your selected server does not have an anon messages channel. Please get an admin to use the ```/setanonchannel``` command within this server or select a different server with ```/anonmessage setdefault```",
          ephemeral: true,
        });
        return;
      }

      const anonChannel = await interaction.client.channels.cache.get(
        guildProfile.anonChannelId
      );
      anonChannel.send("anonymous test!! (u cant actually use this yet btw)");

      interaction.reply({ content: "Message sent", ephemeral: true });
    }
  },
};
