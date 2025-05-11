import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import TimelineYear from "@/components/timeline/timeline-year";
import FilterButtons from "@/components/timeline/filter-buttons";
import EventCard from "@/components/timeline/event-card";
import { YearFilter, TypeFilter } from "@/lib/types";
import { yearsList, staticImages } from "@/lib/utils";

const Timeline = () => {
  const [yearFilter, setYearFilter] = useState<YearFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [visibleCount, setVisibleCount] = useState(6);

  const { data: events = [], isLoading } = useQuery({
    queryKey: ["/api/events"],
  });

  const filteredEvents = events.filter((event) => {
    const matchesYear = yearFilter === "all" || event.year === yearFilter;
    const matchesType = typeFilter === "all" || event.eventType === typeFilter;
    return matchesYear && matchesType;
  });

  const displayedEvents = filteredEvents.slice(0, visibleCount);
  const hasMoreEvents = visibleCount < filteredEvents.length;

  const loadMoreEvents = () => {
    setVisibleCount((prev) => prev + 6);
  };

  return (
    <>
      <Helmet>
        <title>Linha do Tempo | FK 10 Anos</title>
        <meta
          name="description"
          content="Navegue pela história da FK em uma linha do tempo interativa, com todos os eventos desde 2015 até 2024."
        />
      </Helmet>

      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
            Nossa Linha do Tempo
          </h2>
          <p className="text-lg text-center mb-12 max-w-2xl mx-auto">
            Navegue pela história da FK e reviva momentos especiais ao longo dos anos.
            Uma jornada de festas, conversas, encontros e muitas memórias.
          </p>

          {/* Timeline year navigation */}
          <TimelineYear activeYear={yearFilter} onChange={setYearFilter} />

          {/* Event type filter */}
          <FilterButtons activeType={typeFilter} onChange={setTypeFilter} />

          {/* Timeline visualization */}
          <div className="relative mt-16">
            {/* Interactive timeline visualization */}
            <div className="timeline-visual h-4 bg-white/30 rounded-full mx-auto mb-10 relative">
              <div className="absolute top-0 left-0 w-full h-full flex justify-between px-4">
                {yearsList.map((year) => (
                  <div 
                    key={year}
                    className="timeline-dot w-6 h-6 bg-secondary rounded-full -mt-1 cursor-pointer" 
                    onClick={() => setYearFilter(year)}
                  ></div>
                ))}
              </div>
              <div className="absolute -mt-10 w-full flex justify-between px-4 text-sm">
                {yearsList.map((year) => (
                  <span key={year}>{year}</span>
                ))}
              </div>
            </div>

            {/* Timeline events grid */}
            {isLoading ? (
              <div className="text-center py-12">
                <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                <p className="mt-4">Carregando eventos...</p>
              </div>
            ) : displayedEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" id="timelineEvents">
                {displayedEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white/10 rounded-lg">
                <i className="fas fa-calendar-times text-4xl mb-4"></i>
                <h3 className="text-xl font-bold mb-2">Nenhum evento encontrado</h3>
                <p>Tente ajustar os filtros para ver mais eventos.</p>
              </div>
            )}

            {/* "Load More" button */}
            {hasMoreEvents && (
              <div className="flex justify-center mt-8">
                <Button
                  onClick={loadMoreEvents}
                  variant="secondary"
                  className="bg-white text-primary hover:bg-white/90 font-bold py-2 px-6 rounded-full transition-all"
                >
                  Ver Mais Eventos
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Timeline;
