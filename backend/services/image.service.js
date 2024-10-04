const generateImage = async () => {
  try {
    console.log("Starting image generation...");
    console.log("FAL API Key:", process.env.FAL_KEY ? "Set" : "Not set");

    const result = await fal.subscribe("fal-ai/flux-pro/v1.1", {
      input: {
        prompt: "IMG_1081.HEIC",
        image_size: "square_hd",
      },
      logs: true,
      onQueueUpdate: (update) => {
        console.log("Queue update:", JSON.stringify(update, null, 2));
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });

    console.log(
      "Image generation completed. Result:",
      JSON.stringify(result, null, 2)
    );

    if (!result.images || result.images.length === 0) {
      throw new Error("No image generated");
    }

    const newImage = new Image({
      url: result.images[0].url,
      prompt: "IMG_1081.HEICe",
    });

    await newImage.save();
    console.log(
      "New image saved to database:",
      JSON.stringify(newImage, null, 2)
    );
    return newImage;
  } catch (error) {
    console.error("Error generating image:", error);
    console.error("Error details:", error.message);
    if (error.response) {
      console.error(
        "Error response:",
        JSON.stringify(error.response.data, null, 2)
      );
    }
    throw error;
  }
};
