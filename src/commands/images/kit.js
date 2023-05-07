const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const https = require("https");
const catApiUrl = "https://api.thecatapi.com/v1/images/search/";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kit")
    .setDescription("kitty cat kit :3"),
  async execute(interaction, client) {
    const gettingImageEmbed = new EmbedBuilder()
      .setColor(client.color)
      .setTitle("Getting kit image...");
    await interaction.reply({ embeds: [gettingImageEmbed] });

    https
      .get(catApiUrl, (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          const imageEmbed = new EmbedBuilder()
            .setColor(client.color)
            .setTitle("Kit")
            .setImage(JSON.parse(data)[0].url);

          interaction.editReply({ embeds: [imageEmbed] });
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
