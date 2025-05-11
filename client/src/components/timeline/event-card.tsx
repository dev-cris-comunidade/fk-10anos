import React from "react";
import { Card } from "@/components/ui/card";
import { cn, eventTypeColors, eventTypeIcon, staticImages } from "@/lib/utils";
import { Event } from "@shared/schema";

interface EventCardProps {
  event: Event;
  onViewPhotos?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onViewPhotos }) => {
  // Map event types to images
  const getEventImage = () => {
    if (event.imageUrl) return event.imageUrl;
    
    switch (event.eventType) {
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
    <Card className="event-card bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all">
      <div className="h-40 bg-secondary/30 relative">
        <img
          src={getEventImage()}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className={cn("absolute top-0 right-0 text-xs font-bold px-2 py-1 m-2 rounded", eventTypeColors[event.eventType] || "bg-secondary text-white")}>
          {event.eventType}
        </div>
        <div className="absolute bottom-0 left-0 bg-black/60 text-white text-xs px-2 py-1 m-2 rounded">
          {event.date}
        </div>
      </div>
      <div className="p-4 text-white">
        <h3 className="text-xl font-heading font-bold mb-2">{event.title}</h3>
        <div className="flex space-x-2 mb-4">
          <span className="text-xs bg-white/20 px-2 py-1 rounded">{event.year}</span>
          <span className={cn("text-xs px-2 py-1 rounded", `bg-${eventTypeColors[event.eventType]}` || "bg-secondary/40")}>
            {event.eventType}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <button
            className="text-white hover:text-secondary transition-colors"
            onClick={onViewPhotos}
          >
            <i className="far fa-images mr-1"></i> Ver Fotos
          </button>
          <div className="flex space-x-2">
            <button className="emoji-reaction text-lg" title="Curtir">
              ❤️
            </button>
            <button className="emoji-reaction text-lg" title="Beijo">
              💋
            </button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EventCard;
