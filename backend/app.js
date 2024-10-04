const express = require("express");
const mongoose = require("mongoose");
const cron = require("node-cron");
const { generateImages } = require("./services/image.service");
require("dotenv").config();

const fetch = require("node-fetch");
global.fetch = fetch;

const fal = require("@fal-ai/serverless-client");
fal.config({
  credentials: process.env.FAL_KEY,
});

const app = express();

// Set up CORS middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// Set up basic middleware
app.use(express.json());

const connectWithRetry = (retries = 5, interval = 5000) => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => {
      console.log(
        `MongoDB connection unsuccessful, retry attempt ${6 - retries}`,
        err
      );
      if (retries > 0) {
        setTimeout(() => connectWithRetry(retries - 1, interval), interval);
      } else {
        console.error("MongoDB connection failed after 5 attempts");
        process.exit(1);
      }
    });
};

connectWithRetry();

// Schedule image generation
cron.schedule("0 9,12,15,18,21,0 * * *", generateImages);

// Define routes here
const imageRoutes = require("./routes/images.routes");
app.use("/api/images", imageRoutes);

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working" });
});

const imagesRoutes = require("./routes/images.routes");
app.use("/api/images", imagesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
