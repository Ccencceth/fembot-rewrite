const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bill")
    .setDescription("friendship")
    .addSubcommand((subcommand) =>
      subcommand.setName("goodending").setDescription("cherish")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("badending").setDescription("terminate")
    ),
  async execute(interaction) {
    if (interaction.options.getSubcommand() === "goodending") {
      await interaction.reply(
        `Dear <@233794870727147520>,\n\nI wanted to take a moment to express how much I have enjoyed spending time with you lately. You have become such an important part of my life, and I am grateful for all the amazing memories we have made together.\n\nFrom hiking in the mountains to trying out new restaurants in the city, we have done so many fun things together. I'll never forget the time we went camping and stayed up late by the campfire, roasting marshmallows and telling stories. Or the time we went to that music festival and danced together all night long.\n\nI also cherish the quieter moments we have spent together, like when we sat by the lake and watched the sunset, or when we cooked dinner together and shared stories about our lives. Even just hanging out at home and watching movies or playing games has been so much fun with you.\n\nYour positive energy and adventurous spirit always inspire me to try new things and live life to the fullest. I am grateful for your friendship, and I look forward to all the new adventures we will have together in the future.\n\nThank you for being such an amazing friend, Bill.\n\nSincerely,\n\n${interaction.user.username}`
      );
    } else {
      await interaction.reply(
        "<@233794870727147520> your no longer my friend if i see you in public i will beat the shit out of you and that plan you had with me for the new Minecraft server is gone and out of the window i have blocked you because your are a waste of space little bitch that cries until you get your way and when you do your not nice and if anything you are even more annoying and cocky you stupid little shrimp dick faggot you suck and sallow everyone's cock to get them to play your shitty little game even on my fucking birthday when i had everyone there playing gmod with me then this stupid fat mouth piece of shit popped out and ruined my birthday and don't even try and play innocent because you literally just fucking took everyone from me that i was going to play with and have fun but know you fucked it up once again i hope every part of your life is hell and you may be thinking that i am over exaggerating but this has been a long time coming sincerely " +
          interaction.user.username.toLowerCase() +
          " ps go fuck yourself"
      );
    }
  },
};
