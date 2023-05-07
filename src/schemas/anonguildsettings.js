const { Schema, model } = require("mongoose");
const anonGuildSchema = new Schema({
  _id: String,
  anonChannelId: String,
});

module.exports = new model(
  "AnonGuildSettings",
  anonGuildSchema,
  "anonGuildGettings"
);
// my lack of understanding of this may result in another rewrite :P
