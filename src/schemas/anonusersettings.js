const { Schema, model } = require("mongoose");
const anonUserSettings = new Schema({
  _id: String,
  defaultAnonServerId: String,
  blockAll: Boolean,
  blockedUsers: [],
});

module.exports = new model("AnonUserSettings", anonUserSettings, "anonUserSettings");
