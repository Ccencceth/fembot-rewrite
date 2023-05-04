const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bill")
    .setDescription("terminate friendship"),
  async execute(interaction) {
    await interaction.reply(
      "<@233794870727147520> your no longer my friend if i see you in public i will beat the shit out of you and that plan you had with me for the new Minecraft server is gone and out of the window i have blocked you because your are a waste of space little bitch that cries until you get your way and when you do your not nice and if anything you are even more annoying and cocky you stupid little shrimp dick faggot you suck and sallow everyone's cock to get them to play your shitty little game even on my fucking birthday when i had everyone there playing gmod with me then this stupid fat mouth piece of shit popped out and ruined my birthday and don't even try and play innocent because you literally just fucking took everyone from me that i was going to play with and have fun but know you fucked it up once again i hope every part of your life is hell and you may be thinking that i am over exaggerating but this has been a long time coming sincerely " +
        interaction.user.username.toLowerCase() +
        " ps go fuck yourself"
    );
  },
};
