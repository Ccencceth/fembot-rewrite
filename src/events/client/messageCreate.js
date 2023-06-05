module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (message.content.toLowerCase() === "$im spongebob") {
      await message.channel.send(
        `${message.author.username}, you are not spongebob`
      );
      message.delete();
    }
  },
};
