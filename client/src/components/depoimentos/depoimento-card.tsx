import React from "react";
import { Card } from "@/components/ui/card";
import { Depoimento } from "@shared/schema";

interface DepoimentoCardProps {
  depoimento: Depoimento;
}

const DepoimentoCard: React.FC<DepoimentoCardProps> = ({ depoimento }) => {
  const getInitial = () => {
    return depoimento.name ? depoimento.name.charAt(0).toUpperCase() : "A";
  };

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-primary/10 p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary text-xl font-bold mr-3">
            {getInitial()}
          </div>
          <div>
            <h4 className="font-heading font-bold">{depoimento.name || "Anônimo"}</h4>
            {depoimento.memberSince && (
              <p className="text-sm text-gray-600">
                Membro desde {depoimento.memberSince}
              </p>
            )}
          </div>
        </div>
        {depoimento.year && (
          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
            {depoimento.year}
          </span>
        )}
      </div>

      <p className="mb-4 italic">{depoimento.content}</p>

      <div className="flex justify-between items-center">
        <div className="flex space-x-3">
          <button className="text-sm flex items-center text-gray-600 hover:text-secondary transition-colors">
            <i className="far fa-heart mr-1"></i> 24
          </button>
          <button className="text-sm flex items-center text-gray-600 hover:text-secondary transition-colors">
            <i className="far fa-comment mr-1"></i> 3
          </button>
        </div>
        <div className="flex space-x-2">
          <button className="emoji-reaction">❤️</button>
          <button className="emoji-reaction">💋</button>
          <button className="emoji-reaction">✨</button>
        </div>
      </div>
    </Card>
  );
};

export default DepoimentoCard;
