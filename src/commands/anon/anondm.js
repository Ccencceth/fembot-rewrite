const { SlashCommandBuilder } = require("discord.js");
const anonUserSettings = require("../../schemas/anonusersettings");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("anondm")
    .setDescription("anonymous dms")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("toggle")
        .setDescription("enable/disable recieving anonymous dms")
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("send")
        .setDescription("send an anonymous dm")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("To whom are you sending this?")
            .setRequired(true)
        )
        .addStringOption((option) =>
          option.setName("text").setDescription("Text to send anonymously")
        )
        .addAttachmentOption((option) =>
          option
            .setName("attachment")
            .setDescription("Attachment to send anonymously")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("blockuser")
        .setDescription("block a specific person you HATE from sending anondms")
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("User to block!")
            .setRequired(true)
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("unblockuser")
        .setDescription(
          "unblock a specific person you LOVE from sending anondms"
        )
        .addUserOption((option) =>
          option
            .setName("user")
            .setDescription("User to block!")
            .setRequired(true)
        )
    ),
  async execute(interaction) {
    let userProfile = await anonUserSettings.findOne({
      _id: interaction.user.id,
    });

    if (!userProfile) {
      userProfile = await new anonUserSettings({
        _id: interaction.user.id,
        defaultAnonServerId: "none",
        blockAll: true,
        blockedUsers: [],
      });
    }

    if (interaction.options.getSubcommand() === "send") {
      await interaction.reply({
        content: "sending message...",
        ephemeral: true,
      });

      const receivingUser = interaction.options.getUser("user");
      let receivingUserProfile = await anonUserSettings.findOne({
        _id: receivingUser.id,
      });

      if (!receivingUserProfile) {
        receivingUserProfile = await new anonUserSettings({
          _id: receivingUser.id,
          defaultAnonServerId: "none",
          blockAll: true,
          blockedUsers: [],
        });
      }

      receivingUserProfile.save().catch(console.error);

      if (receivingUserProfile.blockAll) {
        interaction.editReply(
          "This user does not have anonymous dms enabled :P"
        );
        return;
      }

      if (receivingUserProfile.blockedUsers.includes(userProfile._id)) {
        interaction.editReply("This user has you blocked. bad luck buddy :P");
        return;
      }

      const text = interaction.options.getString("text");
      const attachment = interaction.options.getAttachment("attachment");

      if (!text && !attachment) {
        interaction.editReply("Buddy you need to send something :/");
        return;
      }

      if (text) {
        receivingUser.send("Anonymous message: " + text);
      } else {
        receivingUser.send("Anonymous message:");
      }

      if (attachment) {
        receivingUser.send({ files: [{ attachment: attachment.url }] });
      }

      interaction.editReply("Message sent!!!");

      return;
    }
    if (interaction.options.getSubcommand() === "toggle") {
      await interaction.reply("toggling");

      userProfile.blockAll = !userProfile.blockAll;
      userProfile.save().catch(console.error);

      if (userProfile.blockAll) {
        await interaction.editReply("You can no longer receive anonymous dms");
      } else {
        await interaction.editReply("You can now receive anonymous dms");
      }
      return;
    }

    const blockUser = interaction.options.getUser("user");

    if (interaction.options.getSubcommand() === "blockuser") {
      await interaction.reply({
        content: "blocking " + blockUser.tag,
        ephemeral: true,
      });

      if (userProfile.blockedUsers.includes(blockUser.id)) {
        interaction.editReply("You have already blocked this user");
        return;
      }

      userProfile.blockedUsers.push(blockUser.id);
      userProfile.save().catch(console.error);

      if (blockUser === interaction.user) {
        interaction.editReply(
          "idk why youd wanna block yourself but u did it! :P"
        );
      } else {
        interaction.editReply("Successfully blocked " + blockUser.tag);
      }

      return;
    }
    if (interaction.options.getSubcommand() === "unblockuser") {
      await interaction.reply({ content: "unblocking " + blockUser.tag, ephemeral: true });

      const unblockIndex = userProfile.blockedUsers.indexOf(blockUser.id);
      if (unblockIndex > -1) {
        userProfile.blockedUsers.splice(unblockIndex, 1);
      } else {
        interaction.editReply("You do not have this user blocked");
        return;
      }

      userProfile.save().catch(console.error);

      interaction.editReply("Successfully unblocked " + blockUser.tag);
      return;
    }
  },
};
