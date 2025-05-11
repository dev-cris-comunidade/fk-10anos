import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { YearFilter } from "@/lib/types";
import { yearsList } from "@/lib/utils";

interface TimelineYearProps {
  activeYear: YearFilter;
  onChange: (year: YearFilter) => void;
}

const TimelineYear: React.FC<TimelineYearProps> = ({ activeYear, onChange }) => {
  return (
    <div className="flex justify-center flex-wrap gap-4 mb-10">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onChange("all")}
        className={cn(
          "rounded-full bg-white/10 hover:bg-white/20 text-white transition-all",
          activeYear === "all" && "bg-white text-primary hover:bg-white"
        )}
      >
        Todos
      </Button>
      
      {yearsList.map((year) => (
        <Button
          key={year}
          variant="outline"
          size="sm"
          onClick={() => onChange(year)}
          className={cn(
            "rounded-full bg-white/10 hover:bg-white/20 text-white transition-all",
            activeYear === year && "bg-white text-primary hover:bg-white"
          )}
        >
          {year}
        </Button>
      ))}
    </div>
  );
};

export default TimelineYear;
