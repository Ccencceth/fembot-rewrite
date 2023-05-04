const { SlashCommandBuilder } = require("discord.js");
const https = require("https");
const catApiUrl = "https://api.thecatapi.com/v1/images/search/";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kit")
    .setDescription("kitty cat kit :3"),
  async execute(interaction, client) {
    await interaction.reply("Getting kit image...");

    https
      .get(catApiUrl, (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          interaction.editReply("Kit");
          interaction.channel.send(JSON.parse(data)[0].url);
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
