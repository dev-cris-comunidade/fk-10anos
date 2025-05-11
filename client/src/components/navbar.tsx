import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LogoSVG from "./logo-svg";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { href: "/sobre", label: "Sobre" },
    { href: "/timeline", label: "Linha do Tempo" },
    { href: "/depoimentos", label: "Depoimentos" },
    { href: "/homenagens", label: "Homenagens" },
    { href: "/familias", label: "Famílias FK" },
    { href: "/galeria", label: "Galeria" },
  ];

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      <nav className={cn(
        "sticky top-0 bg-primary shadow-md z-50 transition-all duration-300",
        isScrolled ? "py-2" : "py-3"
      )}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <LogoSVG className="h-8 w-auto" />
              </Link>
              <div className="hidden md:block ml-10">
                <div className="flex items-center space-x-6">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={cn(
                        "text-white hover:text-accent transition-colors duration-200",
                        isActive(link.href) && "text-accent"
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <Link href="/participe">
                <Button variant="secondary" className="rounded-full">
                  Participe
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="text-white focus:outline-none"
                aria-label="Toggle mobile menu"
              >
                <i className="fas fa-bars text-xl"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "mobile-menu fixed top-0 left-0 h-full w-64 bg-primary z-50 shadow-lg p-4",
            isMobileMenuOpen && "active"
          )}
        >
          <div className="flex justify-between items-center mb-6">
            <LogoSVG className="h-8 w-auto" />
            <button
              onClick={closeMobileMenu}
              className="text-white"
              aria-label="Close mobile menu"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-white hover:text-accent py-2 transition-colors duration-200",
                  isActive(link.href) && "text-accent"
                )}
                onClick={closeMobileMenu}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/participe"
              className="bg-secondary text-white px-4 py-2 rounded-full hover:bg-secondary/90 transition-colors text-center mt-4"
              onClick={closeMobileMenu}
            >
              Participe
            </Link>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40"
          onClick={closeMobileMenu}
        ></div>
      )}
    </>
  );
};

export default Navbar;
