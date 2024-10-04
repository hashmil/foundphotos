import React, { useState, useEffect } from "react";
import ImageCard from "./ImageCard";
import ImageViewer from "./ImageViewer";
import axios from "axios";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [generating, setGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/images");
      setImages(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching images:", error);
      setError("Failed to fetch images");
    } finally {
      setLoading(false);
    }
  };

  const generateImage = async () => {
    try {
      setGenerating(true);
      setGenerationProgress("Starting image generation...");
      console.log("Sending request to generate image...");
      const response = await axios.post("/api/images/generate");
      console.log("Image generation response:", response.data);
      setImages((prevImages) => [...prevImages, response.data]);
      setGenerationProgress(null);
    } catch (error) {
      console.error("Error generating image:", error);
      setError(
        `Failed to generate image: ${
          error.response?.data?.message || error.message
        }`
      );
      setGenerationProgress(null);
    } finally {
      setGenerating(false);
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-white">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-gray-900">
      <h1 className="text-2xl font-bold mb-4 text-white">
        FoundPhotos Gallery
      </h1>
      <button
        onClick={generateImage}
        disabled={generating}
        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 ${
          generating ? "opacity-50 cursor-not-allowed" : ""
        }`}>
        {generating ? "Generating..." : "Generate New Image"}
      </button>
      {generationProgress && (
        <div className="text-white mb-4">{generationProgress}</div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {images.map((image) => (
          <ImageCard
            key={image._id}
            image={image}
            onClick={() => setSelectedImage(image)}
          />
        ))}
      </div>
      {selectedImage && (
        <ImageViewer
          images={images}
          currentImage={selectedImage}
          onClose={() => setSelectedImage(null)}
          onNavigate={(newImage) => setSelectedImage(newImage)}
        />
      )}
    </div>
  );
};

export default Gallery;
