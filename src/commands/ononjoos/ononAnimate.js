const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ononanimate")
    .setDescription("animation challenge")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("help")
        .setDescription("help list for onon animation challenge commands")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("start")
        .setDescription("begin accepting submissions")
    )
    .addSubcommandGroup((subcommandgroup) =>
      subcommandgroup
        .setName("submit")
        .setDescription("submit video through discord")
        .addSubcommand((subcommand) =>
          subcommand
            .setName("attachment")
            .setDescription("submit animation through discord")
            .addStringOption((option) =>
              option
                .setName("title")
                .setDescription("name your animation")
                .setRequired(true)
            )
            .addStringOption((option) =>
              option
                .setName("description")
                .setDescription("add a lil description")
                .setRequired(true)
            )
            .addAttachmentOption((option) =>
              option
                .setName("attachment")
                .setDescription("animation file")
                .setRequired(true)
            )
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName("link")
            .setDescription(
              "submit animation through a link (youtube/google drive)"
            )
            .addStringOption((option) =>
              option
                .setName("title")
                .setDescription("name your animation")
                .setRequired(true)
            )
            .addStringOption((option) =>
              option
                .setName("description")
                .setDescription("add a lil description")
                .setRequired(true)
            )
            .addStringOption((option) =>
              option
                .setName("link")
                .setDescription("link to the animation")
                .setRequired(true)
            )
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("reveal")
        .setDescription("reveal the animations on the day of finishing")
    ),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    const newMessage = `Pong! \nAPI Latency: ${
      client.ws.ping
    }ms\nClient Ping: ${
      message.createdTimestamp - interaction.createdTimestamp
    }ms`;
    await interaction.editReply({
      content: newMessage,
    });
  },
};
