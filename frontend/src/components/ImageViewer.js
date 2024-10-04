import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";

const ImageViewer = ({ images }) => {
  const { id } = useParams();
  const history = useHistory();
  const currentIndex = images.findIndex((image) => image._id === id);

  const handlePrevious = () => {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    history.push(`/image/${images[prevIndex]._id}`);
  };

  const handleNext = () => {
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    history.push(`/image/${images[nextIndex]._id}`);
  };

  if (currentIndex === -1) {
    return <div>Image not found.</div>;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black flex items-center justify-center z-50">
      <button
        className="absolute top-4 left-4 text-white text-3xl hover:text-gray-400"
        onClick={handlePrevious}>
        &lt;
      </button>
      <img
        src={images[currentIndex].url}
        alt={images[currentIndex].prompt}
        className="max-w-full max-h-full object-contain"
      />
      <button
        className="absolute top-4 right-4 text-white text-3xl hover:text-gray-400"
        onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
};

export default ImageViewer;
