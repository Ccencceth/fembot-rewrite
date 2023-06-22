const { Schema, model } = require("mongoose");
const ononanimate = new Schema({
  _id: String,
  inProgress: Boolean,
});

module.exports = new model(
  "ononanimate",
  ononanimate,
  "ononanimate"
);
