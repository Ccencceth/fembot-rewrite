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
        .addStringOption((option) =>
          option.setName("text").setDescription("Text to send anonymously")
        )
        .addAttachmentOption((option) =>
          option
            .setName("attachment")
            .setDescription("Attachment to send anonymously")
        )
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
      const text = interaction.options.getString("text");
      const attachment = interaction.options.getAttachment("attachment");

      if (userProfile.defaultAnonServerId === "none") {
        interaction.reply({
          content:
            "You don't have a default anonymous channel set. Please select a server using ```/anonmessage setdefault```",
          ephemeral: true,
        });
        return;
      }

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

      await interaction.reply({
        content: "Anonymous message sending...",
        ephemeral: true,
      });

      if (!text && !attachment) {
        await interaction.editReply("Buddy you need to send something :/");
        return;
      }

      if (text) {
        if (text.includes("@everyone") || text.includes("@here")) {
          await interaction.editReply("Don't @everyone its annoying");
          return;
        }
        anonChannel.send("Anonymous message: " + text);
      }

      if (attachment) {
        anonChannel.send({ files: [{ attachment: attachment.url }] });
      }

      interaction.editReply("Anonymous message sent!");
    }
  },
};
