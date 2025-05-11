import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import GalleryItem from "@/components/galeria/gallery-item";
import GalleryModal from "@/components/galeria/gallery-modal";
import { TypeFilter, YearFilter } from "@/lib/types";
import { yearsList } from "@/lib/utils";

const Galeria = () => {
  const [yearFilter, setYearFilter] = useState<YearFilter>("all");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");
  const [visibleCount, setVisibleCount] = useState(12);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: galleryImages = [], isLoading } = useQuery({
    queryKey: ["/api/gallery"],
  });

  const filteredImages = galleryImages.filter((image) => {
    const matchesYear = yearFilter === "all" || image.year === yearFilter;
    const matchesType = typeFilter === "all" || image.eventType === typeFilter;
    return matchesYear && matchesType;
  });

  const displayedImages = filteredImages.slice(0, visibleCount);
  const hasMoreImages = visibleCount < filteredImages.length;

  const loadMoreImages = () => {
    setVisibleCount((prev) => prev + 8);
  };

  const openImageModal = (index: number) => {
    setCurrentImageIndex(index);
    setModalOpen(true);
  };

  const eventTypes = [
    { id: "all", label: "Todos", value: "all" },
    { id: "Festa", label: "Festas", value: "Festa" },
    { id: "Social Teórica", label: "Social Teórica", value: "Social Teórica" },
    { id: "Lounge", label: "Lounge", value: "Lounge" },
    { id: "Festa Junina", label: "Festa Junina", value: "Festa Junina" },
  ];

  return (
    <>
      <Helmet>
        <title>Galeria de Memórias | FK 10 Anos</title>
        <meta
          name="description"
          content="Galeria de fotos da FK ao longo dos anos. Reviva momentos especiais e celebrações que marcaram nossa história."
        />
      </Helmet>

      <section className="py-20 bg-gradient-to-bl from-neutral-dark to-primary text-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
            Galeria de Memórias
          </h2>
          <p className="text-lg text-center mb-12 max-w-2xl mx-auto">
            Uma coleção de momentos que contam nossa história visual. 
            Dez anos de sorrisos, abraços e celebrações.
          </p>

          {/* Gallery filters */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {eventTypes.map((type) => (
              <Button
                key={type.id}
                variant={typeFilter === type.value ? "default" : "outline"}
                size="sm"
                onClick={() => setTypeFilter(type.value)}
                className={
                  type.value === "all"
                    ? typeFilter === "all"
                      ? "bg-white text-primary hover:bg-white/90"
                      : "bg-white/20 hover:bg-white/30 text-white"
                    : typeFilter === type.value
                    ? "bg-white text-primary hover:bg-white/90"
                    : "bg-white/20 hover:bg-white/30 text-white"
                }
              >
                {type.label}
              </Button>
            ))}
          </div>

          {/* Year filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <Button
              variant={yearFilter === "all" ? "secondary" : "outline"}
              size="sm"
              onClick={() => setYearFilter("all")}
              className="rounded-full text-sm"
            >
              Todos os Anos
            </Button>
            
            {yearsList.map((year) => (
              <Button
                key={year}
                variant={yearFilter === year ? "secondary" : "outline"}
                size="sm"
                onClick={() => setYearFilter(year)}
                className={
                  yearFilter === year
                    ? "bg-secondary/80 hover:bg-secondary text-white rounded-full text-sm"
                    : "bg-white/10 hover:bg-white/20 text-white rounded-full text-sm"
                }
              >
                {year}
              </Button>
            ))}
          </div>

          {/* Photo gallery */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-white border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              <p className="mt-4 text-white">Carregando galeria...</p>
            </div>
          ) : displayedImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {displayedImages.map((image, index) => (
                <GalleryItem
                  key={image.id}
                  image={image}
                  onClick={() => openImageModal(index)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white/10 rounded-lg">
              <i className="fas fa-images text-4xl mb-4"></i>
              <h3 className="text-xl font-bold mb-2">Nenhuma imagem encontrada</h3>
              <p>Tente ajustar os filtros para ver mais fotos.</p>
            </div>
          )}

          {/* "Load More" button */}
          {hasMoreImages && (
            <div className="flex justify-center mt-10">
              <Button
                onClick={loadMoreImages}
                className="bg-white text-primary hover:bg-white/90 font-bold py-2 px-6 rounded-full transition-all"
              >
                Ver Mais Fotos
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Gallery Modal */}
      <GalleryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        images={filteredImages}
        currentIndex={currentImageIndex}
        setCurrentIndex={setCurrentImageIndex}
      />
    </>
  );
};

export default Galeria;
