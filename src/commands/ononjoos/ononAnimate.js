const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");
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
        .addSubcommand((subcommand) =>
          subcommand
            .setName("another")
            .setDescription("for testing purposes")
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
            .addUserOption((option) =>
              option
                .setName("user")
                .setDescription("target of your misdeeds")
                .setRequired(true)
            )
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("reveal")
        .setDescription("reveal the animations on the day of finishing")
    ),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    if (interaction.options.getSubcommand() === "help") {
      interaction.editReply("helping u rn :P");
      return;
    }

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
      interaction.editReply("submitting le submission");

      const animation_title = interaction.options.getString("title");
      const animation_description =
        interaction.options.getString("description");

      let animation_submission;

      if (interaction.options.getSubcommand() === "another") {
        const user = interaction.options.getUser("user");
        animation_submission = await ononAnimationSubmission.findOne({
          _id: user.id,
        });

        if (!animation_submission) {
          animation_submission = await new ononAnimationSubmission({
            _id: user.id,
            type: "",
            animation: "",
            title: animation_title,
            description: animation_description,
          });
        } else {
          animation_submission.title = animation_title;
          animation_submission.description = animation_description;
        }

        const link = interaction.options.getString("link");

        animation_submission.type = "link";
        animation_submission.animation = link;
      } else {
        animation_submission = await ononAnimationSubmission.findOne({
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

    if (interaction.options.getSubcommand() === "reveal") {
      const submissions = await ononAnimationSubmission.find({});
      console.log(submissions);
    }

    interaction.editReply("command under construction");
  },
};
