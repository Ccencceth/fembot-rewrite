const { ActivityType } = require("discord.js");

module.exports = (client) => {
  client.pickPresence = async () => {
    const options = [
      {
        type: ActivityType.Watching,
        text: "boys 🤤",
        status: "online",
      },
      {
        type: ActivityType.Watching,
        text: "Him >_< He's so prrtyy!!",
        status: "online",
      },
      {
        type: ActivityType.Playing,
        text: "hehe getting raile",
        status: "dnd",
      },
      {
        type: ActivityType.Listening,
        text: "boysmell 😤",
        status: "online",
      },
      {
        type: ActivityType.Listening,
        text: "I WANT A BOYFRIEND I WANT A BOY FRIEND I WANT A BOYFRIEND I WANT A BOYFRIEND I WANT A BOY FRIEND I WANT A BOYFRIEND I WANT A BOY",
        status: "online",
      },
      {
        type: ActivityType.Streaming,
        text: "blahaj my beloved",
        status: "online",
      },
      {
        type: ActivityType.Playing,
        text: "fishing 🎣",
        status: "idle",
      },
      {
        type: ActivityType.Playing,
        text: "WITH FIRE!",
        status: "idle",
      },
      {
        type: ActivityType.Streaming,
        text: "u-uuuwaaaa~ OmO",
        status: "online",
      },
      {
        type: ActivityType.Playing,
        text: "with boys~",
        status: "dnd",
      },
      {
        type: ActivityType.Playing,
        text: "Programming socks on!! B)",
        status: "online",
      },
      {
        type: ActivityType.Watching,
        text: "Strydr stink",
        status: "online",
      },
      {
        type: ActivityType.Listening,
        text: "boys mffgfhg",
        status: "online",
      },
      {
        type: ActivityType.Listening,
        text: "Sam was",
        status: "online",
      },
      {
        type: ActivityType.Listening,
        text: "femboy commits arson ASMR",
        status: "online",
      },
    ];
    const option = Math.floor(Math.random() * options.length);

    client.user.setPresence({
      activities: [
        {
          name: options[option].text,
          type: options[option].type,
        },
      ],
      status: options[option].status,
    });
  };
};
