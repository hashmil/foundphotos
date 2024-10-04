import React from "react";

const ImageViewer = ({ images, currentImage, onClose, onNavigate }) => {
  const currentIndex = images.findIndex((img) => img._id === currentImage._id);

  const handlePrevious = () => {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;
    onNavigate(images[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1;
    onNavigate(images[nextIndex]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <button
        className="absolute right-4 top-4 text-white text-3xl hover:text-gray-400"
        onClick={onClose}>
        &times;
      </button>
      <button
        className="absolute left-4 top-1/2 text-white text-3xl hover:text-gray-400"
        onClick={handlePrevious}>
        &lt;
      </button>
      <div className="relative aspect-[3/4] w-full max-h-[75vh]">
        <img
          src={currentImage.url}
          alt={currentImage.prompt}
          className="object-contain max-w-full max-h-full"
        />
      </div>
      <button
        className="absolute right-4 top-1/2 text-white text-3xl hover:text-gray-400"
        onClick={handleNext}>
        &gt;
      </button>
    </div>
  );
};

export default ImageViewer;
