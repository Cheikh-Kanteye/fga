
import React, { useState } from 'react';
import { 
  Search, 
  UserPlus, 
  Trash, 
  PenSquare, 
  Check, 
  X, 
  Download
} from 'lucide-react';
import { Participant } from '@/types/participants';
import ParticipantModal from './ParticipantModal';
import { useToast } from "@/hooks/use-toast";

// Sample data for demonstration
const initialPanelists: Participant[] = [
  {
    id: '101',
    firstName: 'Sophie',
    lastName: 'Mbengue',
    email: 'sophie.mbengue@example.com',
    organization: 'Université de Dakar',
    country: 'Sénégal',
    phone: '+221 77 234 56 78',
    registrationDate: '2023-09-15',
    type: 'panelist',
    status: 'approved'
  },
  {
    id: '102',
    firstName: 'Marc',
    lastName: 'Kouamé',
    email: 'marc.kouame@example.com',
    organization: 'Institut National de Santé Publique',
    country: 'Côte d\'Ivoire',
    phone: '+225 07 12 34 56',
    registrationDate: '2023-09-20',
    type: 'panelist',
    status: 'approved'
  }
];

const PanelistsList: React.FC = () => {
  const [panelists, setPanelists] = useState<Participant[]>(initialPanelists);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPanelist, setCurrentPanelist] = useState<Participant | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const filteredPanelists = panelists.filter(
    panelist => 
      panelist.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      panelist.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      panelist.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      panelist.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPanelist = () => {
    setCurrentPanelist(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditPanelist = (panelist: Participant) => {
    setCurrentPanelist(panelist);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeletePanelist = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce panéliste ?')) {
      setPanelists(panelists.filter(p => p.id !== id));
      toast({
        title: "Panéliste supprimé",
        description: "Le panéliste a été supprimé avec succès.",
      });
    }
  };

  const handleStatusChange = (id: string, newStatus: 'approved' | 'rejected' | 'pending') => {
    setPanelists(
      panelists.map(p => 
        p.id === id ? { ...p, status: newStatus } : p
      )
    );
    
    const statusMessages = {
      approved: "La participation a été approuvée.",
      rejected: "La participation a été rejetée.",
      pending: "La participation est en attente de validation."
    };
    
    toast({
      title: "Statut mis à jour",
      description: statusMessages[newStatus],
    });
  };

  const handleSavePanelist = (panelist: Participant) => {
    if (isEditing) {
      setPanelists(
        panelists.map(p => p.id === panelist.id ? panelist : p)
      );
      toast({
        title: "Panéliste modifié",
        description: "Les informations du panéliste ont été mises à jour.",
      });
    } else {
      const newPanelist = {
        ...panelist,
        id: Date.now().toString(),
        registrationDate: new Date().toISOString().split('T')[0],
        type: 'panelist' as const,
        status: 'pending' as const
      };
      setPanelists([...panelists, newPanelist]);
      toast({
        title: "Panéliste ajouté",
        description: "Le nouveau panéliste a été ajouté avec succès.",
      });
    }
    setIsModalOpen(false);
  };

  const downloadCSV = () => {
    const headers = ['Prénom', 'Nom', 'Email', 'Organisation', 'Pays', 'Téléphone', 'Date inscription', 'Statut'];
    const dataRows = panelists.map(p => [
      p.firstName,
      p.lastName,
      p.email,
      p.organization,
      p.country,
      p.phone,
      p.registrationDate,
      p.status
    ]);
    
    const csvContent = [
      headers.join(','),
      ...dataRows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'panelists.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-galien-blue">Gestion des Panélistes</h2>
        <div className="flex gap-2">
          <button 
            onClick={downloadCSV}
            className="btn-secondary py-2 px-4 flex items-center text-sm"
          >
            <Download className="h-4 w-4 mr-2" />
            Exporter CSV
          </button>
          <button 
            onClick={handleAddPanelist}
            className="btn-primary py-2 px-4 flex items-center text-sm"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Ajouter
          </button>
        </div>
      </div>
      
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Rechercher un panéliste..."
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-galien-blue focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Organisation
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pays
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Statut
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPanelists.length > 0 ? (
              filteredPanelists.map((panelist) => (
                <tr key={panelist.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {panelist.firstName} {panelist.lastName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{panelist.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{panelist.organization}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{panelist.country}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(panelist.status)}`}>
                      {panelist.status === 'approved' ? 'Approuvé' : 
                       panelist.status === 'rejected' ? 'Rejeté' : 'En attente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex gap-2 justify-end">
                      {panelist.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleStatusChange(panelist.id, 'approved')}
                            className="text-green-600 hover:text-green-900"
                            title="Approuver"
                          >
                            <Check className="h-5 w-5" />
                          </button>
                          <button 
                            onClick={() => handleStatusChange(panelist.id, 'rejected')}
                            className="text-red-600 hover:text-red-900"
                            title="Rejeter"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </>
                      )}
                      <button 
                        onClick={() => handleEditPanelist(panelist)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Modifier"
                      >
                        <PenSquare className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDeletePanelist(panelist.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Supprimer"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-sm text-gray-500">
                  Aucun panéliste trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {isModalOpen && (
        <ParticipantModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSavePanelist}
          participant={currentPanelist}
          isEditing={isEditing}
          participantType="panelist"
        />
      )}
    </div>
  );
};

export default PanelistsList;
