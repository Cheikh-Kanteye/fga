
import React from 'react';

const About: React.FC = () => {
  return (
    <section className="section bg-white" id="about">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden bg-galien-secondary/30 relative z-10">
                {/* Replace with actual image in production */}
                <div className="absolute inset-0 flex items-center justify-center text-galien-blue/50">
                  <span>Image Forum Galien</span>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 rounded-2xl bg-galien-gold/20 z-0"></div>
              <div className="absolute -top-4 -left-4 w-32 h-32 rounded-full bg-galien-blue/10 z-0"></div>
            </div>
          </div>

          <div className="order-1 lg:order-2 space-y-6">
            <div className="badge-primary inline-block">À propos</div>
            <h2 className="heading-lg">Le Forum Galien Afrique</h2>
            
            <p className="text-gray-600">
              Créé en 2018, le Forum Galien Afrique est une plateforme prestigieuse dédiée à la promotion de l'innovation en santé 
              et au développement de solutions adaptées aux défis sanitaires du continent africain.
            </p>
            
            <p className="text-gray-600">
              S'inspirant du modèle du Forum Galien international, cet événement rassemble des panelistes de renommée mondiale, 
              des chercheurs, des décideurs politiques, des professionnels de santé et des étudiants pour partager leurs 
              connaissances et contribuer à l'amélioration des systèmes de santé en Afrique.
            </p>
            
            <div className="grid grid-cols-2 gap-6 pt-4">
              <div>
                <div className="text-3xl font-bold text-galien-blue">7<span className="text-galien-gold">+</span></div>
                <p className="text-gray-500">Éditions réussies</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-galien-blue">30<span className="text-galien-gold">+</span></div>
                <p className="text-gray-500">Pays représentés</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-galien-blue">500<span className="text-galien-gold">+</span></div>
                <p className="text-gray-500">Participants par édition</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-galien-blue">50<span className="text-galien-gold">+</span></div>
                <p className="text-gray-500">Projets innovants récompensés</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
