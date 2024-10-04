const express = require("express");
const router = express.Router();
const Image = require("../models/image.model");
const { generateImage } = require("../services/image.service");

router.get("/", async (req, res) => {
  try {
    console.log("Fetching images from database...");
    const images = await Image.find().sort({ createdAt: -1 });
    console.log(`Found ${images.length} images`);
    res.json(images);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/generate", async (req, res) => {
  try {
    console.log("Received request to generate image");
    const newImage = await generateImage();
    console.log(
      "Image generated successfully:",
      JSON.stringify(newImage, null, 2)
    );
    res.status(201).json(newImage);
  } catch (error) {
    console.error("Error generating image:", error);
    res.status(500).json({
      message: "Failed to generate image",
      error: error.message,
      details: error.response ? error.response.data : null,
    });
  }
});

router.get("/test-fal-key", (req, res) => {
  const falKey = process.env.FAL_KEY;
  if (falKey) {
    res.json({ message: "FAL API key is set", keyLength: falKey.length });
  } else {
    res.status(500).json({ message: "FAL API key is not set" });
  }
});

module.exports = router;
