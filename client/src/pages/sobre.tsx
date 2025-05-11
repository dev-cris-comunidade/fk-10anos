import React from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { staticImages } from "@/lib/utils";

const Sobre = () => {
  return (
    <>
      <Helmet>
        <title>Sobre a FK | FK 10 Anos</title>
        <meta
          name="description"
          content="Conheça a história da FK, nossos valores e como construímos uma comunidade baseada em liberdade, consenso e respeito ao longo de 10 anos."
        />
      </Helmet>

      <section className="py-20 bg-white">
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

          <div className="mt-16">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-6 text-center">
              Nossa Jornada
            </h3>
            
            <div className="space-y-8 mt-8">
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                <h4 className="font-heading font-bold text-xl text-primary mb-3">
                  <i className="fas fa-star mr-2 text-secondary"></i>
                  Os Primórdios (2014-2015)
                </h4>
                <p>
                  O que começou como uma pequena reunião entre amigos rapidamente se transformou 
                  em um espaço onde pessoas podiam explorar suas conexões de forma livre e respeitosa. 
                  As primeiras edições da FK estabeleceram as bases de uma comunidade que valorizava 
                  a autenticidade e o respeito mútuo acima de tudo.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                <h4 className="font-heading font-bold text-xl text-primary mb-3">
                  <i className="fas fa-heart mr-2 text-secondary"></i>
                  Consolidação (2016-2018)
                </h4>
                <p>
                  Com o crescimento da comunidade, a FK expandiu seus formatos, criando as Social Teóricas 
                  e os Lounges, espaços dedicados a conversas profundas e conexões além das festas. 
                  Este período viu o fortalecimento dos laços comunitários e o estabelecimento 
                  de tradições que perdurariam pelos anos seguintes.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                <h4 className="font-heading font-bold text-xl text-primary mb-3">
                  <i className="fas fa-users mr-2 text-secondary"></i>
                  Uma Família (2019-2021)
                </h4>
                <p>
                  Mais do que eventos, a FK se tornou uma verdadeira família para muitos. 
                  Relações que começaram nos nossos espaços evoluíram para casamentos, 
                  amizades profundas e grupos de apoio. Mesmo durante os desafios do período 
                  de isolamento, a comunidade permaneceu conectada através de encontros virtuais.
                </p>
              </div>
              
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm">
                <h4 className="font-heading font-bold text-xl text-primary mb-3">
                  <i className="fas fa-glass-cheers mr-2 text-secondary"></i>
                  Celebrando Uma Década (2022-2024)
                </h4>
                <p>
                  Retornando com força total após um período de pausa, a FK se prepara para 
                  celebrar uma década de existência. Com a energia renovada e carregando 
                  o legado de anos de conexões autênticas, olhamos para o futuro com a certeza 
                  de que continuaremos sendo um espaço de liberdade, consenso e respeito.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h3 className="text-2xl md:text-3xl font-heading font-bold text-primary mb-6">
              Faça Parte Dessa História
            </h3>
            <p className="text-lg max-w-3xl mx-auto mb-8">
              Seja você parte da comunidade FK desde o início ou alguém que está descobrindo agora, 
              convidamos você a se juntar a nós nesta celebração de uma década de conexões verdadeiras.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/timeline">
                <Button variant="primary" size="lg" className="rounded-md">
                  Explorar Nossa História
                </Button>
              </Link>
              <Link href="/participe">
                <Button variant="secondary" size="lg" className="rounded-md">
                  Participar da Celebração
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sobre;
