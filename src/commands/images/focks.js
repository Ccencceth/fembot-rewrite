const { SlashCommandBuilder } = require("discord.js");
const https = require("https");
const randomFoxUrl = "https://randomfox.ca/floof/";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("focks")
    .setDescription("foxxin foxer <3"),
  async execute(interaction, client) {
    await interaction.reply("Getting focks image...");

    https
      .get(randomFoxUrl, (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          interaction.editReply("Focks");
          interaction.channel.send(JSON.parse(data).image);
        });
      })
      .on("error", (error) => {
        console.log(error.message);
        interaction.editReply(
          "Gomenasai! thewe was an ewwow getting da photo!"
        );
      });
  },
};
