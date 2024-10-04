import React from "react";

const ImageCard = ({ image, onClick }) => {
  return (
    <div className="cursor-pointer aspect-[3/4]" onClick={onClick}>
      <img
        src={image.url}
        alt={image.prompt}
        className="rounded-lg object-cover w-full h-full"
      />
    </div>
  );
};

export default ImageCard;
