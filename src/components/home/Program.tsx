
import React, { useState } from 'react';
import { Calendar, MapPin, Clock, Users, Award } from 'lucide-react';

interface ProgramDay {
  day: string;
  date: string;
  events: ProgramEvent[];
}

interface ProgramEvent {
  time: string;
  title: string;
  description?: string;
  location?: string;
  speaker?: string;
  type: 'keynote' | 'panel' | 'workshop' | 'break' | 'ceremony';
}

const programData: ProgramDay[] = [
  {
    day: "Jour 1",
    date: "15 Novembre 2024",
    events: [
      {
        time: "08:30 - 09:00",
        title: "Accueil et enregistrement",
        location: "Hall principal",
        type: "break"
      },
      {
        time: "09:00 - 10:30",
        title: "Cérémonie d'ouverture",
        description: "Discours officiels et présentation du programme",
        location: "Auditorium Principal",
        speaker: "Dr. Amadou Sall, Pr. Roland Beugré Mambo",
        type: "ceremony"
      },
      {
        time: "11:00 - 12:30",
        title: "Panel: Innovations en santé en Afrique",
        description: "Impact des nouvelles technologies sur les systèmes de santé africains",
        location: "Salle de conférence A",
        speaker: "Panel d'experts internationaux",
        type: "panel"
      },
      {
        time: "12:30 - 14:00",
        title: "Déjeuner networking",
        location: "Espace restauration",
        type: "break"
      },
      {
        time: "14:00 - 16:00",
        title: "Sessions thématiques parallèles",
        description: "Plusieurs sessions au choix sur différentes thématiques",
        location: "Salles A, B et C",
        type: "workshop"
      }
    ]
  },
  {
    day: "Jour 2",
    date: "16 Novembre 2024",
    events: [
      {
        time: "09:00 - 10:30",
        title: "Table ronde: Accès aux soins",
        description: "Stratégies pour améliorer l'accès aux soins de santé en Afrique",
        location: "Auditorium Principal",
        speaker: "Représentants OMS, ministères de la santé",
        type: "panel"
      },
      {
        time: "11:00 - 12:30",
        title: "Présentations scientifiques",
        description: "Présentation des recherches innovantes sélectionnées",
        location: "Salle de conférence B",
        speaker: "Chercheurs et universitaires",
        type: "keynote"
      },
      {
        time: "14:00 - 17:00",
        title: "Ateliers pratiques",
        description: "Ateliers sur l'entrepreneuriat en santé et l'innovation",
        location: "Espaces ateliers",
        type: "workshop"
      },
      {
        time: "19:00 - 22:00",
        title: "Dîner de gala & Remise des Prix Galien",
        description: "Cérémonie de remise des prix aux innovations exceptionnelles",
        location: "Grand Ballroom, Hôtel Pullman",
        type: "ceremony"
      }
    ]
  },
  {
    day: "Jour 3",
    date: "17 Novembre 2024",
    events: [
      {
        time: "09:00 - 10:30",
        title: "Ateliers collaboratifs",
        description: "Sessions de travail sur les défis de santé en Afrique",
        location: "Salles A, B et C",
        type: "workshop"
      },
      {
        time: "11:00 - 12:30",
        title: "Forum des jeunes chercheurs",
        description: "Présentation des travaux de recherche des jeunes talents",
        location: "Auditorium Principal",
        speaker: "Jeunes chercheurs africains",
        type: "keynote"
      },
      {
        time: "14:00 - 15:30",
        title: "Panel de clôture: Perspectives futures",
        description: "Réflexions sur l'avenir de la santé en Afrique",
        location: "Auditorium Principal",
        speaker: "Leaders d'opinion et experts",
        type: "panel"
      },
      {
        time: "15:30 - 16:00",
        title: "Cérémonie de clôture",
        description: "Discours de clôture et perspectives pour l'édition suivante",
        location: "Auditorium Principal",
        type: "ceremony"
      }
    ]
  }
];

const Program: React.FC = () => {
  const [activeDay, setActiveDay] = useState(0);

  // Function to render the icon based on event type
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'keynote':
        return <Award className="h-5 w-5 text-galien-gold" />;
      case 'panel':
        return <Users className="h-5 w-5 text-galien-blue" />;
      case 'workshop':
        return <Clock className="h-5 w-5 text-green-500" />;
      case 'ceremony':
        return <Award className="h-5 w-5 text-purple-500" />;
      default:
        return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  // Function to render the event type badge
  const getEventTypeBadge = (type: string) => {
    switch (type) {
      case 'keynote':
        return <span className="badge inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-galien-gold/20 text-galien-blue">Keynote</span>;
      case 'panel':
        return <span className="badge inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-galien-blue/20 text-galien-blue">Panel</span>;
      case 'workshop':
        return <span className="badge inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">Atelier</span>;
      case 'ceremony':
        return <span className="badge inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">Cérémonie</span>;
      case 'break':
        return <span className="badge inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Pause</span>;
      default:
        return null;
    }
  };

  return (
    <section className="section bg-galien-bg" id="program">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="badge-secondary inline-block mb-4">Programme</div>
          <h2 className="heading-lg mb-6">Les temps forts de l'événement</h2>
          <p className="text-gray-600">
            Découvrez le programme complet du Forum Galien Afrique 2024 et planifiez votre participation
            aux sessions qui vous intéressent.
          </p>
        </div>
        
        <div className="glass-card p-8 rounded-xl mb-16">
          {/* Day selector */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {programData.map((day, index) => (
              <button
                key={index}
                onClick={() => setActiveDay(index)}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  activeDay === index
                    ? 'bg-galien-blue text-white shadow-md'
                    : 'bg-white hover:bg-galien-secondary/50 text-galien-blue'
                }`}
              >
                <span className="hidden md:inline">{day.day} - </span>{day.date}
              </button>
            ))}
          </div>

          {/* Timeline */}
          <div className="space-y-6">
            {programData[activeDay].events.map((event, index) => (
              <div 
                key={index} 
                className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md transition-all border-l-4 border-galien-blue"
              >
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <div className="flex-shrink-0 w-32">
                    <div className="text-sm font-medium text-galien-gold">{event.time}</div>
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        {getEventIcon(event.type)}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <h3 className="font-semibold text-galien-blue">
                            {event.title}
                          </h3>
                          {getEventTypeBadge(event.type)}
                        </div>
                        
                        {event.description && (
                          <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                        )}
                        
                        <div className="flex flex-col sm:flex-row gap-3 text-xs text-gray-500 mt-2">
                          {event.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              <span>{event.location}</span>
                            </div>
                          )}
                          
                          {event.speaker && (
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              <span>{event.speaker}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-500 mb-4">
            Note: Ce programme est susceptible de modifications. Veuillez consulter régulièrement cette page pour les mises à jour.
          </p>
          <a href="/program-pdf" className="inline-flex items-center text-galien-blue hover:text-galien-gold transition-colors">
            <Calendar className="h-4 w-4 mr-2" />
            Télécharger le programme complet (PDF)
          </a>
        </div>
      </div>
    </section>
  );
};

export default Program;
