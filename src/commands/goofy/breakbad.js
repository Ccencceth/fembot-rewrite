const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const https = require("https");
const breakingBadQuotesUrl = "https://api.breakingbadquotes.xyz/v1/quotes";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("breakbad")
    .setDescription("breaking epic :3"),
  async execute(interaction, client) {
    await interaction.reply("Getting quote...");

    https
      .get(breakingBadQuotesUrl, (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          interaction.editReply(
            JSON.parse(data)[0].quote + "\n - " + JSON.parse(data)[0].author
          );
        });
      })
      .on("error", (error) => {
        console.log(error.message);
        interaction.editReply(
          "Gomenasai! thewe was an ewwow getting da anime quote!"
        );
      });
  },
};
