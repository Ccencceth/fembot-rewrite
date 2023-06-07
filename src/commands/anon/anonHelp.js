const { SlashCommandBuilder, EmbedBuilder, Client } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder().setName("anonhelp").setDescription("help for all things anonymous messaging related."),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    const helpEmbed = new EmbedBuilder()
      .setColor(client.color)
      .setTitle('Anon Message Help')
      .setDescription('How t-to use da x3 fembot anyonymous messaging system.')
      .addFields(
        { name: '/anonhelp', value: 'omg hi this haiii :3'},
        { name: '/setanonchannel', value: 'Sets the channel as the servers anonymous message channel. Only admins can use this command.' },
        { name: '/anonmessage setdefault', value: 'This will give you a dropdown menu of all the servers you share with fembot. Choose the one you wish to send anonymous messages to. You can change this at any time :)' },
        { name: '/anonmessage send', value: 'This allows you to send text and/or a file attachment (video/gif/whatever) anonymously to the selected servers anonymous channel.' },
        { name: '/anondm toggle', value: 'Allows you to enable/disable anonymous dms. You need to enable this to receive anonymous dms.' },
        { name: '/anondm send', value: 'Send an anonymous message in a specified users dms. you will need to use this command in a server with both fembot (obviously) and the user you wish to send the dm. Other than that, this command has the same rules as the "/anonmessage send" command.' },
        { name: "/anondm blockuser", value: "Block a specific user from sending you anonymous dms" },
        { name: "/anondm unblockuser", value: "Unblock a user and let them send anondms to you again." }
      )

    // embed for command explanations :D
    await interaction.editReply({
        embeds: [helpEmbed],
    })
  },
};
