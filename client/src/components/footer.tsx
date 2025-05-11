import React from "react";
import { Link } from "wouter";
import LogoSVG from "./logo-svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-dark text-white py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <LogoSVG className="h-12 w-auto mb-4" />
            <p className="text-white/70">Liberdade, Consenso, Respeito</p>
          </div>

          <div className="flex space-x-6">
            <a
              href="https://www.instagram.com/fkeventosnm/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-secondary transition-colors"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a
              href="#"
              className="text-white hover:text-secondary transition-colors"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook text-xl"></i>
            </a>
            <a
              href="#"
              className="text-white hover:text-secondary transition-colors"
              aria-label="WhatsApp"
            >
              <i className="fab fa-whatsapp text-xl"></i>
            </a>
            <a
              href="mailto:contato@fk10anos.com.br"
              className="text-white hover:text-secondary transition-colors"
              aria-label="Email"
            >
              <i className="fas fa-envelope text-xl"></i>
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-white/20">
          <p className="text-white/70 text-sm mb-4 md:mb-0">
            © {currentYear} FK - 10 Anos de Histórias. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6">
            <Link href="/privacidade" className="text-white/70 text-sm hover:text-white transition-colors">
              Política de Privacidade
            </Link>
            <Link href="/termos" className="text-white/70 text-sm hover:text-white transition-colors">
              Termos de Uso
            </Link>
            <Link href="/contato" className="text-white/70 text-sm hover:text-white transition-colors">
              Contato
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
