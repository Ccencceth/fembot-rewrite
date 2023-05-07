const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const https = require("https");
const randomFoxUrl = "https://randomfox.ca/floof/";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("focks")
    .setDescription("foxxin foxer <3"),
  async execute(interaction, client) {
    const gettingImageEmbed = new EmbedBuilder()
      .setColor(client.color)
      .setTitle("Getting focks image...");
    await interaction.reply({ embeds: [gettingImageEmbed] });

    https
      .get(randomFoxUrl, (response) => {
        let data = "";

        response.on("data", (chunk) => {
          data += chunk;
        });

        response.on("end", () => {
          const imageEmbed = new EmbedBuilder()
            .setColor(client.color)
            .setTitle("Focks")
            .setImage(JSON.parse(data).image);
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
