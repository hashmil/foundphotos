import React from "react";

const ImageCard = ({ image }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img
        src={image.url}
        alt={image.prompt}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-medium">{image.prompt}</h3>
        <p className="text-gray-600 text-sm">Seed: {image.seed}</p>
      </div>
    </div>
  );
};

export default ImageCard;
