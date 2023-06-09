const anonUserSettings = require("../../schemas/anonusersettings");

module.exports = {
  data: {
    name: `selectanonmessageserver`,
  },
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
      ephemeral: true,
    });

    let userProfile = await anonUserSettings.findOne({
      _id: interaction.user.id,
    });

    userProfile.defaultAnonServerId = interaction.values[0];
    await userProfile.save().catch(console.error);

    await interaction.editReply({
      content: `You selected: ${interaction.values[0]} (this means it worked trust me!!)`,
    });
  },
};
