
import React from 'react';
import { Calendar, Users, FileText, Clock } from 'lucide-react';

const DashboardOverview: React.FC = () => {
  const userRole = localStorage.getItem('userRole') || 'participant';
  const isAdmin = userRole === 'admin';
  
  // Get current date in French format
  const date = new Date();
  const options: Intl.DateTimeFormatOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const formattedDate = date.toLocaleDateString('fr-FR', options);
  
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-galien-blue mb-4">
          Tableau de bord
        </h2>
        <p className="text-gray-600 mb-2">
          {formattedDate}
        </p>
        <p className="mb-6">
          Bienvenue sur votre espace personnel du Forum Galien Afrique.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-galien-secondary/30 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Calendar className="h-5 w-5 text-galien-blue mr-2" />
              <h3 className="font-medium">Prochain événement</h3>
            </div>
            <p className="text-sm">Forum Galien Afrique 2023</p>
            <p className="text-sm">18-21 Novembre 2023</p>
          </div>
          
          <div className="bg-galien-secondary/30 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <Clock className="h-5 w-5 text-galien-blue mr-2" />
              <h3 className="font-medium">Statut d'inscription</h3>
            </div>
            <p className="text-sm">Confirmée</p>
          </div>
          
          <div className="bg-galien-secondary/30 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <FileText className="h-5 w-5 text-galien-blue mr-2" />
              <h3 className="font-medium">Documents</h3>
            </div>
            <p className="text-sm">3 documents disponibles</p>
          </div>
          
          {isAdmin && (
            <div className="bg-galien-secondary/30 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <Users className="h-5 w-5 text-galien-blue mr-2" />
                <h3 className="font-medium">Participants</h3>
              </div>
              <p className="text-sm">247 inscrits</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-xl font-bold text-galien-blue mb-4">
          Annonces importantes
        </h3>
        <div className="space-y-4">
          <div className="border-l-4 border-galien-gold pl-4 py-2">
            <p className="font-medium">Modification du programme</p>
            <p className="text-sm text-gray-600">
              Le panel sur l'innovation en santé a été déplacé au 19 novembre à 14h.
            </p>
          </div>
          <div className="border-l-4 border-galien-blue pl-4 py-2">
            <p className="font-medium">Documents disponibles</p>
            <p className="text-sm text-gray-600">
              Les présentations des intervenants sont désormais accessibles dans la section Documents.
            </p>
          </div>
        </div>
      </div>
      
      {isAdmin && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-xl font-bold text-galien-blue mb-4">
            Actions rapides (Admin)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <button className="btn-secondary py-2 text-sm">
              Gérer les inscriptions
            </button>
            <button className="btn-secondary py-2 text-sm">
              Modifier le programme
            </button>
            <button className="btn-secondary py-2 text-sm">
              Envoyer une annonce
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardOverview;
