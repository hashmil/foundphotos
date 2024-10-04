const express = require("express");
const mongoose = require("mongoose");
const { fal } = require("@fal-ai/serverless-client");
const cron = require("node-cron");
const { generateImages } = require("./services/image.service");
require("dotenv").config();

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

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

// Configure FAL.AI API client
fal.config({
  apiKey: process.env.FAL_KEY,
});

// Schedule image generation
cron.schedule("0 9,12,15,18,21,0 * * *", generateImages);

// Define routes here

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
