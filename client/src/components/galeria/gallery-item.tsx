import React from "react";
import { cn } from "@/lib/utils";
import { GalleryImage } from "@shared/schema";
import { staticImages } from "@/lib/utils";

interface GalleryItemProps {
  image: GalleryImage;
  onClick?: () => void;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ image, onClick }) => {
  // Get appropriate image based on type if imageUrl is not provided
  const getImageSrc = () => {
    if (image.imageUrl) return image.imageUrl;
    
    switch (image.eventType) {
      case "Festa":
        return staticImages.party1;
      case "Social Teórica":
        return staticImages.social1;
      case "Lounge":
        return staticImages.social2;
      case "Festa Junina":
        return staticImages.festival1;
      default:
        return staticImages.party2;
    }
  };

  return (
    <div 
      className="gallery-item overflow-hidden rounded-lg shadow-md cursor-pointer" 
      data-type={image.eventType.toLowerCase()} 
      data-year={image.year}
      onClick={onClick}
    >
      <img
        src={getImageSrc()}
        alt={image.title || `FK ${image.eventType} ${image.year}`}
        className="w-full h-full object-cover transition-transform hover:scale-105"
      />
    </div>
  );
};

export default GalleryItem;
