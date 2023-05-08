module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    setInterval(client.pickPresence, 10 * 10000);
    console.log(`Ready!!! ${client.user.tag} is logged in and online.`);
  },
};
