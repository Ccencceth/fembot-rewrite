const { SlashCommandBuilder } = require("discord.js");
const { Uwuifier } = require("@patarapolw/uwuifier");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("uwuify")
    .setDescription("UwUifies your message")
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("message to uwuify")
        .setRequired(true)
    ),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    const uwuifier = new Uwuifier();
    const text = interaction.options.getString("message");

    let uwuifiedText = uwuifier.uwuifySentence(text)

    if (uwuifiedText.length > 2000) {
        interaction.editReply(`Uwuified message too sees bulge w-wong (${uwuifiedText.length} chawactews). Pwease use a message showtew than 2000 ÚwÚ chawactews.`);

        return;
    }

    await interaction.editReply(uwuifiedText);
  },
};
