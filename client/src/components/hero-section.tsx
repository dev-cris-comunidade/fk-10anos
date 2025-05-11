import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import LogoSVG from "./logo-svg";
import { staticImages } from "@/lib/utils";

const HeroSection = () => {
  return (
    <header className="relative">
      <div className="relative hero-section flex items-center justify-center overflow-hidden">
        {/* Background overlay */}
        <div className="absolute inset-0 bg-gradient-primary opacity-90 z-10"></div>
        
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src={staticImages.party3}
            alt="Celebração com luzes"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center">
          <div className="flex flex-col items-center mb-8 animate-pulse-slow">
            <LogoSVG className="w-40 md:w-56 mb-4" />
            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-2">
              10 ANOS DE FK
            </h1>
            <p className="text-xl md:text-2xl font-script text-white">
              Liberdade, Consenso, Respeito
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 text-white">
            <p className="text-xl md:text-2xl italic mb-6">
              "A FK faz 10 anos. E nada disso teria sentido sem você. 
              Esse site é um presente coletivo — feito para lembrar, honrar, rir, chorar e, claro… beijar."
            </p>
            <p className="mb-8 text-lg">
              Navegue pelos anos, envie seu depoimento, veja quem fez história com a gente. 
              Esse amor é de todxs nós.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/timeline">
                <Button
                  variant="secondary" 
                  size="lg" 
                  className="w-full sm:w-auto rounded-full py-3 px-6 font-bold"
                >
                  Explorar a Timeline
                </Button>
              </Link>
              <Link href="/depoimentos">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto rounded-full py-3 px-6 font-bold bg-white hover:bg-white/90 text-primary"
                >
                  Deixe seu Depoimento
                </Button>
              </Link>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <a href="#sobre" className="text-white">
              <i className="fas fa-chevron-down text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default HeroSection;
