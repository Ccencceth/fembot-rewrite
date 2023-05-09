module.exports = {
  data: {
    name: `selectanonmessageserver`,
  },
  async execute(interaction, client) {
    console.log(interaction.values);
    await interaction.reply({
      content: `You selected: ${interaction.values[0]}`,
    });
  },
};
