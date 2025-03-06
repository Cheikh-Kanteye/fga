import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../ui/Logo";
import { Menu, X } from "lucide-react";

interface NavLink {
  name: string;
  path: string;
}

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen((prev) => !prev);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navLinks: NavLink[] = useMemo(
    () => [
      { name: "Accueil", path: "/" },
      // { name: "À propos", path: "#about" },
      // { name: "Programme", path: "#program" },
      { name: "S'inscrire", path: "/register" },
    ],
    []
  );

  const isActive = useCallback(
    (path: string) => {
      if (path.includes("#")) {
        const [routePath, hash] = path.split("#");
        return location.pathname === routePath && location.hash === `#${hash}`;
      }

      if (location.pathname === "/" && location.hash) {
        return false;
      }
      return location.pathname === path;
    },
    [location.pathname, location.hash]
  );

  const renderLink = useCallback(
    (link: NavLink, mobile: boolean = false) => {
      const baseClasses = mobile
        ? "px-4 py-2 rounded-md transition-colors"
        : "text-sm font-medium transition-colors duration-200";
      const activeClasses = mobile
        ? "bg-galien-secondary/50 text-galien-blue font-medium"
        : "text-galien-gold";
      const inactiveClasses = mobile
        ? "text-galien-blue hover:bg-galien-secondary/30"
        : "text-galien-blue hover:text-galien-gold";

      if (link.path.startsWith("#")) {
        return (
          <a
            key={link.name}
            href={link.path}
            className={`${baseClasses} ${
              isActive(link.path) ? activeClasses : inactiveClasses
            }`}
          >
            {link.name}
          </a>
        );
      }

      return (
        <Link
          key={link.name}
          to={link.path}
          className={`${baseClasses} ${
            isActive(link.path) ? activeClasses : inactiveClasses
          }`}
        >
          {link.name}
        </Link>
      );
    },
    [isActive]
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-20">
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => renderLink(link))}
            <Link to="/dashboard" className="btn-primary py-2 text-sm">
              Dashboard
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-galien-blue p-2 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden bg-white/95 backdrop-blur-md overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-screen shadow-md" : "max-h-0"
        }`}
      >
        <nav className="container py-5 flex flex-col space-y-4">
          {navLinks.map((link) => renderLink(link, true))}
          <Link
            to="/dashboard"
            className="px-4 py-2 bg-galien-blue text-white rounded-md"
          >
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
