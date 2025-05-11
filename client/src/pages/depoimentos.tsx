import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import DepoimentoForm from "@/components/depoimentos/depoimento-form";
import DepoimentoCard from "@/components/depoimentos/depoimento-card";
import { Input } from "@/components/ui/input";

const Depoimentos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);

  const { data: depoimentos = [], isLoading } = useQuery({
    queryKey: ["/api/depoimentos"],
  });

  const filteredDepoimentos = depoimentos.filter((depoimento) => {
    if (!searchTerm) return true;
    
    const content = depoimento.content.toLowerCase();
    const name = depoimento.name?.toLowerCase() || "";
    
    return content.includes(searchTerm.toLowerCase()) || name.includes(searchTerm.toLowerCase());
  });

  const displayedDepoimentos = filteredDepoimentos.slice(0, visibleCount);
  const hasMoreDepoimentos = visibleCount < filteredDepoimentos.length;

  const loadMoreDepoimentos = () => {
    setVisibleCount((prev) => prev + 4);
  };

  return (
    <>
      <Helmet>
        <title>Depoimentos | FK 10 Anos</title>
        <meta
          name="description"
          content="Leia depoimentos emocionantes de quem viveu a FK ao longo dos anos e compartilhe sua própria história."
        />
      </Helmet>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-primary mb-4">
            Depoimentos
          </h2>
          <p className="text-lg text-center mb-12 max-w-2xl mx-auto">
            Histórias de quem viveu a FK. Momentos que transformaram vidas, 
            criaram amizades e deixaram marcas inesquecíveis.
          </p>

          <div className="flex flex-col-reverse md:flex-row gap-10">
            <div className="md:w-1/2">
              <DepoimentoForm />
            </div>

            <div className="md:w-1/2">
              <div className="mb-6">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Buscar depoimentos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <i className="fas fa-search"></i>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                    <p className="mt-4 text-primary">Carregando depoimentos...</p>
                  </div>
                ) : displayedDepoimentos.length > 0 ? (
                  displayedDepoimentos.map((depoimento) => (
                    <DepoimentoCard key={depoimento.id} depoimento={depoimento} />
                  ))
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <i className="far fa-comment-alt text-4xl text-gray-400 mb-4"></i>
                    <h3 className="text-xl font-bold mb-2">Nenhum depoimento encontrado</h3>
                    {searchTerm ? (
                      <p>Tente ajustar sua pesquisa.</p>
                    ) : (
                      <p>Seja o primeiro a compartilhar sua história.</p>
                    )}
                  </div>
                )}

                {hasMoreDepoimentos && (
                  <div className="text-center mt-8">
                    <Button
                      onClick={loadMoreDepoimentos}
                      variant="outline"
                      className="bg-primary hover:bg-primary/90 text-white font-bold py-2 px-6 rounded-full transition-all"
                    >
                      Ver Mais Depoimentos
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Depoimentos;
