
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import { Mail, MapPin, Phone } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-galien-blue text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-6">
            <Logo type="full" />
            <p className="text-galien-secondary/80 max-w-xs">
              Le Forum Galien Afrique rassemble les leaders et innovateurs du secteur de la santé pour façonner l'avenir des soins en Afrique.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-galien-gold hover:text-galien-blue transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-galien-gold hover:text-galien-blue transition-colors"
                aria-label="Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-galien-gold hover:text-galien-blue transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C22 8.746 22 12 22 12s0 3.255-.42 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-galien-gold">Liens rapides</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/" className="hover:text-galien-gold transition-colors">Accueil</Link>
              </li>
              <li>
                <Link to="/#about" className="hover:text-galien-gold transition-colors">À propos</Link>
              </li>
              <li>
                <Link to="/#program" className="hover:text-galien-gold transition-colors">Programme</Link>
              </li>
              <li>
                <Link to="/register" className="hover:text-galien-gold transition-colors">S'inscrire</Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-galien-gold transition-colors">Connexion</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-galien-gold">Types d'inscription</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/register?type=panelist" className="hover:text-galien-gold transition-colors">Paneliste</Link>
              </li>
              <li>
                <Link to="/register?type=student" className="hover:text-galien-gold transition-colors">Étudiant</Link>
              </li>
              <li>
                <Link to="/register?type=press" className="hover:text-galien-gold transition-colors">Presse</Link>
              </li>
              <li>
                <Link to="/register?type=participant" className="hover:text-galien-gold transition-colors">Participant simple</Link>
              </li>
              <li>
                <Link to="/register?type=international" className="hover:text-galien-gold transition-colors">Paneliste international</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6 text-galien-gold">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="mr-3 h-5 w-5 text-galien-gold flex-shrink-0" />
                <span>123 Avenue de l'Innovation, Dakar, Sénégal</span>
              </li>
              <li className="flex items-start">
                <Mail className="mr-3 h-5 w-5 text-galien-gold flex-shrink-0" />
                <a href="mailto:contact@forumgalienafrique.org" className="hover:text-galien-gold transition-colors">
                  contact@forumgalienafrique.org
                </a>
              </li>
              <li className="flex items-start">
                <Phone className="mr-3 h-5 w-5 text-galien-gold flex-shrink-0" />
                <a href="tel:+221123456789" className="hover:text-galien-gold transition-colors">
                  +221 12 345 6789
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 text-center text-galien-secondary/70">
          <p>© {currentYear} Forum Galien Afrique. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
