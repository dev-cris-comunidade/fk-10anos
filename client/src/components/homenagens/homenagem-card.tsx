import React from "react";
import { Homenagem } from "@shared/schema";
import { staticImages } from "@/lib/utils";

interface HomenagemCardProps {
  homenagem: Homenagem;
}

const HomenagemCard: React.FC<HomenagemCardProps> = ({ homenagem }) => {
  const getYearRange = () => {
    if (homenagem.yearStart && homenagem.yearEnd) {
      return `${homenagem.yearStart} - ${homenagem.yearEnd}`;
    } else if (homenagem.yearStart) {
      return `${homenagem.yearStart} - presente`;
    } else {
      return "";
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center">
      <div className="w-24 h-24 rounded-full mx-auto mb-4 overflow-hidden border-4 border-white/30">
        <img
          src={homenagem.imageUrl || staticImages.profile1}
          alt={`Homenagem a ${homenagem.name}`}
          className="w-full h-full object-cover grayscale"
        />
      </div>

      <h3 className="font-heading font-bold text-xl mb-1">{homenagem.name}</h3>
      {getYearRange() && <p className="text-white/70 text-sm mb-4">{getYearRange()}</p>}

      <p className="italic text-white/90 mb-6">{homenagem.content}</p>

      <div className="flex justify-center space-x-3">
        <button className="emoji-reaction text-lg">❤️</button>
        <button className="emoji-reaction text-lg">🕊️</button>
        <button className="emoji-reaction text-lg">✨</button>
      </div>
    </div>
  );
};

export default HomenagemCard;
