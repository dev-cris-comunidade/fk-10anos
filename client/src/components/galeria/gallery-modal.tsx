import React from "react";
import { GalleryImage } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { staticImages } from "@/lib/utils";

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: GalleryImage[];
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
}

const GalleryModal: React.FC<GalleryModalProps> = ({
  isOpen,
  onClose,
  images,
  currentIndex,
  setCurrentIndex
}) => {
  if (!isOpen) return null;

  const currentImage = images[currentIndex];

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  // Get appropriate image based on type if imageUrl is not provided
  const getImageSrc = () => {
    if (currentImage.imageUrl) return currentImage.imageUrl;
    
    switch (currentImage.eventType) {
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
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="relative max-w-4xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
        <button 
          className="absolute -top-10 right-0 text-white text-2xl"
          onClick={onClose}
        >
          <i className="fas fa-times"></i>
        </button>
        
        <img 
          src={getImageSrc()}
          alt={currentImage.title || `Imagem ${currentIndex + 1}`}
          className="w-full h-auto rounded-lg"
        />
        
        <div className="mt-4 bg-white/10 backdrop-blur-sm p-4 rounded-lg">
          <h3 className="text-white text-xl font-heading font-bold mb-1">
            {currentImage.title || `${currentImage.eventType} (${currentImage.year})`}
          </h3>
          <p className="text-white/80">
            {currentImage.description || `${currentImage.eventType} • ${currentImage.year}`}
          </p>
        </div>
        
        <div className="flex justify-between mt-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white text-2xl"
            onClick={handlePrevImage}
          >
            <i className="fas fa-chevron-left"></i>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-white text-2xl"
            onClick={handleNextImage}
          >
            <i className="fas fa-chevron-right"></i>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GalleryModal;
