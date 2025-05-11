import React from "react";
import { Helmet } from "react-helmet";
import HeroSection from "@/components/hero-section";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { staticImages } from "@/lib/utils";

const Home = () => {
  const { data: events } = useQuery({
    queryKey: ["/api/events"],
  });

  const { data: depoimentos } = useQuery({
    queryKey: ["/api/depoimentos"],
  });

  const { data: homenagens } = useQuery({
    queryKey: ["/api/homenagens"],
  });

  return (
    <>
      <Helmet>
        <title>FK | 10 Anos de Histórias</title>
        <meta name="description" content="Site comemorativo dos 10 anos da FK. Uma década de liberdade, consenso e respeito. Explore nossa história, depoimentos e galeria de memórias." />
      </Helmet>

      <HeroSection />

      <section id="sobre" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-6">
                Sobre a FK
              </h2>
              <p className="text-lg mb-4">
                A FK nasceu em 2014 como um espaço de liberdade, onde pessoas podiam se expressar livremente, 
                criar vínculos significativos e celebrar a vida juntas, sempre com base em três pilares fundamentais:
              </p>
              <div className="flex flex-col space-y-4 mb-6">
                <div className="flex items-center">
                  <div className="bg-primary rounded-full p-2 mr-4">
                    <i className="fas fa-heart text-white"></i>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl">Liberdade</h3>
                    <p>Espaço para expressão autêntica, sem julgamentos</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-primary rounded-full p-2 mr-4">
                    <i className="fas fa-handshake text-white"></i>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl">Consenso</h3>
                    <p>Respeito mútuo e consentimento como base de todas as interações</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="bg-primary rounded-full p-2 mr-4">
                    <i className="fas fa-users text-white"></i>
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-xl">Respeito</h3>
                    <p>Valorização da diversidade e das diferentes formas de se relacionar</p>
                  </div>
                </div>
              </div>
              <p className="text-lg">
                Ao longo de uma década, a FK construiu muito mais que festas — construímos uma comunidade, 
                uma família escolhida, um espaço de acolhimento e transformação.
              </p>
            </div>

            <div className="md:w-1/2">
              <img
                src={staticImages.community1}
                alt="Comunidade FK reunida"
                className="rounded-xl shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-center text-primary mb-4">
            Explore Nossa História
          </h2>
          <p className="text-lg text-center mb-12 max-w-2xl mx-auto">
            Uma década de momentos inesquecíveis, pessoas incríveis e transformações profundas
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-white hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl mb-4 mx-auto">
                  <i className="fas fa-clock"></i>
                </div>
                <h3 className="font-heading font-bold text-xl text-primary text-center mb-4">
                  Linha do Tempo
                </h3>
                <p className="text-center mb-6">
                  Navegue por todos os eventos da FK ao longo dos anos, desde a primeira edição até hoje.
                </p>
                <div className="flex justify-center">
                  <Link href="/timeline">
                    <Button variant="primary" className="rounded-md">
                      Explorar Timeline
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl mb-4 mx-auto">
                  <i className="fas fa-comment-alt"></i>
                </div>
                <h3 className="font-heading font-bold text-xl text-primary text-center mb-4">
                  Depoimentos
                </h3>
                <p className="text-center mb-6">
                  Leia histórias de quem viveu a FK e compartilhe suas próprias experiências transformadoras.
                </p>
                <div className="flex justify-center">
                  <Link href="/depoimentos">
                    <Button variant="primary" className="rounded-md">
                      Ver Depoimentos
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center text-primary text-2xl mb-4 mx-auto">
                  <i className="fas fa-images"></i>
                </div>
                <h3 className="font-heading font-bold text-xl text-primary text-center mb-4">
                  Galeria de Fotos
                </h3>
                <p className="text-center mb-6">
                  Reviva os momentos mais marcantes através de nossa galeria de imagens cuidadosamente selecionadas.
                </p>
                <div className="flex justify-center">
                  <Link href="/galeria">
                    <Button variant="primary" className="rounded-md">
                      Ver Galeria
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-primary text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-6">
            Celebre Conosco
          </h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            Junte-se a nós nesta celebração de 10 anos. Compartilhe suas memórias,
            envie fotos ou simplesmente venha celebrar este marco importante.
          </p>
          <Link href="/participe">
            <Button
              variant="secondary"
              size="lg"
              className="rounded-full font-bold text-lg px-8"
            >
              Quero Participar
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Home;
