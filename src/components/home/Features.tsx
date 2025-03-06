
import React from 'react';
import { Award, Users, Landmark, Globe, Microscope, Heart } from 'lucide-react';

const features = [
  {
    icon: <Users size={24} />,
    title: 'Networking d\'excellence',
    description: 'Connectez-vous avec des professionnels de la santé, décideurs et innovateurs du continent africain.'
  },
  {
    icon: <Award size={24} />,
    title: 'Sessions de haut niveau',
    description: 'Assistez à des conférences et tables rondes animées par des experts internationaux.'
  },
  {
    icon: <Landmark size={24} />,
    title: 'Reconnaissance et prix',
    description: 'Découvrez les lauréats du Prix Galien qui récompense l\'innovation en santé en Afrique.'
  },
  {
    icon: <Globe size={24} />,
    title: 'Coopération internationale',
    description: 'Développez des partenariats avec des organisations et institutions du monde entier.'
  },
  {
    icon: <Microscope size={24} />,
    title: 'Innovation et recherche',
    description: 'Explorez les dernières avancées scientifiques et technologiques dans le domaine de la santé.'
  },
  {
    icon: <Heart size={24} />,
    title: 'Impact social',
    description: 'Contribuez à améliorer l\'accès aux soins de santé et le bien-être des populations africaines.'
  }
];

const Features: React.FC = () => {
  return (
    <section className="section py-20 bg-galien-bg" id="features">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-secondary inline-block mb-4">Pourquoi participer</div>
          <h2 className="heading-lg mb-6">Une plateforme unique d'échange et d'innovation</h2>
          <p className="text-gray-600">
            Le Forum Galien Afrique offre une opportunité exceptionnelle de participer à la transformation 
            des systèmes de santé africains à travers l'innovation et la collaboration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="glass-card p-6 rounded-xl transition-all duration-300 hover:shadow-lg hover:translate-y-[-5px]"
            >
              <div className="w-12 h-12 bg-galien-blue/10 rounded-lg flex items-center justify-center text-galien-blue mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-galien-blue mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-galien-blue to-galien-blue/80 rounded-2xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-galien-gold/30 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
          
          <div className="relative z-10 md:max-w-2xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Prêt à participer à cette expérience unique?</h3>
            <p className="text-white/80 mb-8">
              Les places sont limitées, assurez-vous de réserver la vôtre dès maintenant pour ne pas manquer 
              cet événement majeur du secteur de la santé en Afrique.
            </p>
            <a href="/register" className="bg-white text-galien-blue px-6 py-3 rounded-md font-medium inline-flex items-center transition-all duration-300 hover:bg-galien-gold">
              S'inscrire maintenant
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
