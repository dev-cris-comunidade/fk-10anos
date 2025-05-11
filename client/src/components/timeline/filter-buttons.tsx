import React from "react";
import { cn, eventTypeIcon } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { TypeFilter } from "@/lib/types";

interface FilterButtonsProps {
  activeType: TypeFilter;
  onChange: (type: TypeFilter) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ activeType, onChange }) => {
  const eventTypes = [
    { id: "all", label: "Todos os Eventos", value: "all" },
    { id: "Festa", label: "Festas", value: "Festa", icon: "fas fa-music" },
    { id: "Social Teórica", label: "Social Teórica", value: "Social Teórica", icon: "fas fa-comment" },
    { id: "Lounge", label: "Lounge", value: "Lounge", icon: "fas fa-glass-cheers" },
    { id: "Festa Junina", label: "Festa Junina", value: "Festa Junina", icon: "fas fa-hat-cowboy" },
  ];

  return (
    <div className="flex justify-center flex-wrap gap-4 mb-10">
      {eventTypes.map((type) => (
        <Button
          key={type.id}
          variant="outline"
          size="sm"
          onClick={() => onChange(type.value)}
          className={cn(
            "rounded-full transition-all",
            type.value === "all"
              ? activeType === "all"
                ? "bg-secondary text-white hover:bg-secondary/90"
                : "bg-secondary/80 hover:bg-secondary text-white"
              : activeType === type.value
              ? "bg-white text-primary hover:bg-white/90"
              : "bg-white/10 hover:bg-white/20 text-white"
          )}
        >
          {type.icon && <i className={`${type.icon} mr-1`}></i>}
          {type.label}
        </Button>
      ))}
    </div>
  );
};

export default FilterButtons;
