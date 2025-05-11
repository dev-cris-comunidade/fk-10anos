import React from "react";
import { Familia } from "@shared/schema";
import { staticImages } from "@/lib/utils";

interface FamiliaCardProps {
  familia: Familia;
}

const FamiliaCard: React.FC<FamiliaCardProps> = ({ familia }) => {
  // Choose appropriate image if not provided
  const getImageSrc = () => {
    if (familia.imageUrl) return familia.imageUrl;
    return familia.type === "Casal" ? staticImages.couple1 : staticImages.community2;
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="md:w-1/3">
        <img
          src={getImageSrc()}
          alt={familia.title}
          className="w-full h-auto rounded-lg shadow-md"
        />
      </div>
      <div className="md:w-2/3">
        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full mb-2 inline-block">
          {familia.type}
        </span>
        <h3 className="font-heading font-bold text-xl text-primary mb-2">{familia.title}</h3>
        <p className="text-sm text-gray-600 mb-4">
          {familia.year && `Juntos desde ${familia.year}`}
          {familia.year && familia.eventName && ` • `}
          {familia.eventName && familia.eventName}
        </p>
        <p className="mb-4">{familia.description}</p>
        <div className="flex space-x-3">
          <button className="text-sm flex items-center text-gray-600 hover:text-secondary transition-colors">
            <i className="far fa-heart mr-1"></i> {Math.floor(Math.random() * 50) + 10}
          </button>
          {familia.type === "Casal" ? (
            <button className="emoji-reaction">💍</button>
          ) : (
            <button className="emoji-reaction">✨</button>
          )}
          <button className="emoji-reaction">❤️</button>
        </div>
      </div>
    </div>
  );
};

export default FamiliaCard;
