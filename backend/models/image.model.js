const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
  contentType: { type: String, required: true },
  createdAt: { type: Date, required: true },
  prompt: { type: String, required: true },
  seed: { type: Number, required: true },
  hasNSFWContent: { type: Boolean, required: true },
});

module.exports = mongoose.model("Image", imageSchema);
