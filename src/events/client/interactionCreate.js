module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const { commands } = client;
      const { commandName } = interaction;
      const command = commands.get(commandName);
      if (!command) return;

      try {
        await command.execute(interaction, client);
      } catch (error) {
        console.error(error);
        await interaction.channel.send({
          content: `Oopsie woopsie! UwU we made a fucky wucky! The code monkeys at our headqwartews awe working vewwy hawd to fix this!`,
        });
      }
    } else if (interaction.isButton()) {
      const { buttons } = client;
      const { customId } = interaction;
      const button = buttons.get(customId);
      if (!button) return new Error("There is no code for this button.");

      try {
        await button.execute(interaction, client);
      } catch (err) {
        console.error(err);
      }
    } else if (interaction.isStringSelectMenu()) {
      const { selectMenus } = client;
      const { customId } = interaction;
      const { menu } = selectMenus.get(customId);
      if (!menu) return new Error("There is no code for this select menu.");

      try {
        await execute(interaction, client);
      } catch (err) {
        console.error(err);
      }
    }
  },
};
