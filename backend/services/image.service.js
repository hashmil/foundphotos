const { fal } = require("@fal-ai/serverless-client");
const Image = require("../models/image.model");

async function generateImages() {
  try {
    const response = await fal.generateImage({
      prompt: "A beautiful landscape with mountains and a lake",
      seed: Math.floor(Math.random() * 1000),
      width: 512,
      height: 512,
      enable_safety_checker: true,
    });

    const { url, width, height, contentType } = response.data;

    const image = new Image({
      url,
      width,
      height,
      contentType,
      createdAt: new Date(),
      prompt: "A beautiful landscape with mountains and a lake",
      seed: response.data.seed,
      hasNSFWContent: response.data.has_nsfw_content,
    });

    await image.save();
    console.log("Image saved to database:", image);
  } catch (error) {
    console.error("Error generating image:", error);
  }
}

module.exports = { generateImages };
