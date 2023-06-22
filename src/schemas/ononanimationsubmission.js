const { Schema, model } = require("mongoose");
const ononAnimationSubmission = new Schema({
  _id: String,
  type: String,
  animation: String,
  title: String,
  description: String,
});

module.exports = new model(
  "ononAnimationSubmission",
  ononAnimationSubmission,
  "ononAnimationSubmission"
);
