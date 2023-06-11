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
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("propose").setDescription("marry")
    ),
  async execute(interaction) {
    if (interaction.options.getSubcommand() === "goodending") {
      // Maybe one day it won't be a ChatGPT response
      await interaction.reply(
        `Dear <@233794870727147520>,\n\nI wanted to take a moment to express how much I have enjoyed spending time with you lately. You have become such an important part of my life, and I am grateful for all the amazing memories we have made together.\n\nFrom hiking in the mountains to trying out new restaurants in the city, we have done so many fun things together. I'll never forget the time we went camping and stayed up late by the campfire, roasting marshmallows and telling stories. Or the time we went to that music festival and danced together all night long.\n\nI also cherish the quieter moments we have spent together, like when we sat by the lake and watched the sunset, or when we cooked dinner together and shared stories about our lives. Even just hanging out at home and watching movies or playing games has been so much fun with you.\n\nYour positive energy and adventurous spirit always inspire me to try new things and live life to the fullest. I am grateful for your friendship, and I look forward to all the new adventures we will have together in the future.\n\nThank you for being such an amazing friend, Bill.\n\nSincerely,\n\n${interaction.user.username}`
      );
    } else if (interaction.options.getSubcommand() === "badending") {
      await interaction.reply(
        "<@233794870727147520> your no longer my friend if i see you in public i will beat the shit out of you and that plan you had with me for the new Minecraft server is gone and out of the window i have blocked you because your are a waste of space little bitch that cries until you get your way and when you do your not nice and if anything you are even more annoying and cocky you stupid little shrimp dick faggot you suck and sallow everyone's cock to get them to play your shitty little game even on my fucking birthday when i had everyone there playing gmod with me then this stupid fat mouth piece of shit popped out and ruined my birthday and don't even try and play innocent because you literally just fucking took everyone from me that i was going to play with and have fun but know you fucked it up once again i hope every part of your life is hell and you may be thinking that i am over exaggerating but this has been a long time coming sincerely " +
          interaction.user.username.toLowerCase() +
          " ps go fuck yourself"
      );
    } else if (interaction.options.getSubcommand() === "propose") {
      await interaction.reply(
        `My Dearest <@233794870727147520>, \n From the moment our paths intertwined, my heart has known nothing but love and joy. Today, as I gather the courage to put my feelings into words, I cannot imagine my life without you by my side. You are my confidant, my best friend, and the love of my life. \n\nEvery day spent with you feels like a beautiful adventure, filled with laughter, understanding, and unwavering support. Your kindness and compassion have touched my soul in ways I never thought possible. With each passing moment, my love for you has only grown stronger, and I now realize that I want to spend the rest of my life with you, cherishing every precious moment. \n\nBill, will you make me the happiest person in the world and do me the extraordinary honor of becoming my partner for life? Will you walk with me hand in hand through all of life's joys and challenges, promising to love, cherish, and support each other unconditionally? \n\nTogether, we have created countless memories, shared dreams, and embarked on incredible adventures. I can't help but picture a future where we build a home filled with love, laughter, and the warmth of our unwavering commitment. I imagine us waking up each morning, grateful for the blessing of having each other, and going to bed each night knowing that our hearts are forever intertwined.\n\nI promise to love you with all my heart, to be your rock when you need support, and to stand beside you through thick and thin. I will always strive to be the best partner I can be, nurturing our love and making you feel cherished every single day.\n\nSo, my love, I ask you this with all the love and sincerity in my soul: Will you marry me and make me the luckiest person alive?\n\nIf your heart is ready to say "yes," then let our love be the foundation of a lifetime of happiness, adventure, and unconditional love. Together, we can create a love story that will be remembered for generations to come.\n\nForever yours,\n${interaction.user.username}`
      );
    }
  },
};
