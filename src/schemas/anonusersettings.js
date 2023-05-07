const { Schema, model } = require("mongoose");
const anonUserSettings = new Schema({
  _id: Schema.Types.ObjectId,
  userId: String,
  blockAll: Boolean,
  blockedUsers: [],
});

module.exports = new model("AnonUserSettings", guildSchema, "anonUserSettings");
