const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("anonmessage").setDescription("this doesnt work yet :P"),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    const newMessage = `GRAAA`;
    await interaction.editReply({
      content: newMessage,
    });
  },
};
