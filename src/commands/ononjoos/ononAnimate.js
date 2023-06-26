const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const ononAnimationSubmission = require("../../schemas/ononanimationsubmission");
const ononanimate = require("../../schemas/ononanimate");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ononanimate")
    .setDescription("animation challenge")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("help")
        .setDescription("help list for onon animation challenge commands")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("start").setDescription("begin accepting submissions")
    )
    .addSubcommandGroup((subcommandgroup) =>
      subcommandgroup
        .setName("submit")
        .setDescription("submit video through discord")
        .addSubcommand((subcommand) =>
          subcommand
            .setName("attachment")
            .setDescription("submit animation through discord")
            .addStringOption((option) =>
              option
                .setName("title")
                .setDescription("name your animation")
                .setRequired(true)
            )
            .addStringOption((option) =>
              option
                .setName("description")
                .setDescription("add a lil description")
                .setRequired(true)
            )
            .addAttachmentOption((option) =>
              option
                .setName("attachment")
                .setDescription("animation file")
                .setRequired(true)
            )
        )
        .addSubcommand((subcommand) =>
          subcommand
            .setName("link")
            .setDescription(
              "submit animation through a link (youtube/google drive)"
            )
            .addStringOption((option) =>
              option
                .setName("title")
                .setDescription("name your animation")
                .setRequired(true)
            )
            .addStringOption((option) =>
              option
                .setName("description")
                .setDescription("add a lil description")
                .setRequired(true)
            )
            .addStringOption((option) =>
              option
                .setName("link")
                .setDescription("link to the animation")
                .setRequired(true)
            )
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("reveal")
        .setDescription("reveal the animations on the day of finishing")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("reset").setDescription("delete ononanimate data")
    ),
  async execute(interaction, client) {
    if (interaction.options.getSubcommand() === "help") {
      const message = await interaction.deferReply({
        fetchReply: true,
      });

      const helpEmbed = new EmbedBuilder()
        .setColor(client.color)
        .setTitle("hewp :3")
        .setDescription("help!")
        .addFields(
          { name: "/ononanimate help", value: "helping you rn :3" },
          {
            name: "/ononanimate start",
            value: "Opens up Onon Animation Submissions (admins only)",
          },
          {
            name: "/ononanimate submit attachment",
            value:
              "Submit your animation through discord as a file. Give your animation a title and description as well :3",
          },
          {
            name: "/ononanimate submit link",
            value:
              "Submit your animation as a link (Youtube, Google Drive, Bilibili, etc.) This also requires a title and description :3",
          },
          {
            name: "/ononanimate reveal",
            value:
              "Reveal all the epic and cool animation submissions (admins only)",
          },
          {
            name: "/ononanimate reset",
            value: "Suck my dick and balls and delete all the data",
          }
        );

      interaction.editReply({ embeds: [helpEmbed] });
      return;
    }

    if (interaction.options.getSubcommand() === "reveal") {
      await interaction.deferReply({ fetchReply: true });

      if (
        !interaction.member.permissions.has(PermissionFlagsBits.Administrator)
      ) {
        interaction.editReply("nuh uh cant do that you dont have permission");

        return;
      }
      const ononAnimateData = await ononanimate.findOne({
        _id: interaction.guild.id,
      });

      const submissions = await ononAnimationSubmission.find({});

      if (!ononAnimateData.inProgress || !submissions[0]) {
        interaction.editReply("NOT POSSIBLE (there is nothing to show)");

        return;
      }

      await interaction.editReply("# Submissions");

      for (const submission in submissions) {
        const user = await interaction.client.users.fetch(
          submissions[submission]._id
        );

        await interaction.channel.send(
          `# Submission ${Number(submission) + 1}: ${
            submissions[submission].title
          }\n*by ${user.username}*\n### Description\n${
            submissions[submission].description
          }\n${submissions[submission].animation}`
        );
      }

      return;
    }

    const message = await interaction.deferReply({
      fetchReply: true,
      ephemeral: true,
    });

    let ononAnimateData = await ononanimate.findOne({
      _id: interaction.guild.id,
    });

    if (!ononAnimateData) {
      ononAnimateData = await new ononanimate({
        _id: interaction.guild.id,
        inProgress: false,
      });
    }

    if (interaction.options.getSubcommand() === "start") {
      if (ononAnimateData.inProgress) {
        interaction.editReply("onon animate already in progress :P");
        return;
      }
      if (
        !interaction.member.permissions.has(PermissionFlagsBits.Administrator)
      ) {
        interaction.editReply("u do not have permission to use this command");
        return;
      }
      ononAnimateData.inProgress = true;

      await ononAnimateData.save().catch(console.error);

      interaction.editReply("onon animate submissions are now open");

      return;
    }

    if (interaction.options.getSubcommandGroup() === "submit") {
      const ononAnimateData = await ononanimate.findOne({
        _id: interaction.guild.id,
      });

      if (!ononAnimateData.inProgress) {
        interaction.editReply(
          "You are stupid (no ur not u just cant submit yet)"
        );

        return;
      }

      interaction.editReply("submitting le submission");

      const animation_title = interaction.options.getString("title");
      const animation_description =
        interaction.options.getString("description");

      let animation_submission = await ononAnimationSubmission.findOne({
        _id: interaction.user.id,
      });

      if (!animation_submission) {
        animation_submission = await new ononAnimationSubmission({
          _id: interaction.user.id,
          type: "",
          animation: "",
          title: animation_title,
          description: animation_description,
        });
      } else {
        animation_submission.title = animation_title;
        animation_submission.description = animation_description;
      }

      if (interaction.options.getSubcommand() === "attachment") {
        const attachment = interaction.options.getAttachment("attachment");

        animation_submission.type = "attachment";
        animation_submission.animation = attachment.url;
      }
      if (interaction.options.getSubcommand() === "link") {
        const link = interaction.options.getString("link");

        animation_submission.type = "link";
        animation_submission.animation = link;
      }

      animation_submission.save().catch(console.error);

      interaction.editReply(
        `Successfully submitted animation: ${animation_title}`
      );
      return;
    }

    if (interaction.options.getSubcommand() === "reset") {
      if (
        !interaction.member.permissions.has(PermissionFlagsBits.Administrator)
      ) {
        interaction.editReply("YOU CANT YOU ARE NOT ALLOWED BACK OFF");

        return;
      }

      const ononAnimateData = await ononanimate.findOne({
        _id: interaction.guild.id,
      });

      if (!ononAnimateData.inProgress) {
        interaction.editReply("Onon animate is not in progress");

        return;
      }

      ononAnimateData.inProgress = false;
      await ononAnimateData.save().catch(console.error);
      await ononAnimationSubmission.deleteMany({});

      interaction.editReply("all onon data deleted :P");
      return;
    }
  },
};
