
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
const initialStudents: Participant[] = [
  {
    id: '201',
    firstName: 'Fatou',
    lastName: 'Diop',
    email: 'fatou.diop@student.example.com',
    organization: 'Université Cheikh Anta Diop',
    country: 'Sénégal',
    phone: '+221 77 345 67 89',
    registrationDate: '2023-10-02',
    type: 'student',
    status: 'approved'
  },
  {
    id: '202',
    firstName: 'Kofi',
    lastName: 'Mensah',
    email: 'kofi.mensah@student.example.com',
    organization: 'University of Ghana',
    country: 'Ghana',
    phone: '+233 24 123 4567',
    registrationDate: '2023-10-05',
    type: 'student',
    status: 'pending'
  }
];

const StudentsList: React.FC = () => {
  const [students, setStudents] = useState<Participant[]>(initialStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState<Participant | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const filteredStudents = students.filter(
    student => 
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = () => {
    setCurrentStudent(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditStudent = (student: Participant) => {
    setCurrentStudent(student);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteStudent = (id: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet étudiant ?')) {
      setStudents(students.filter(s => s.id !== id));
      toast({
        title: "Étudiant supprimé",
        description: "L'étudiant a été supprimé avec succès.",
      });
    }
  };

  const handleStatusChange = (id: string, newStatus: 'approved' | 'rejected' | 'pending') => {
    setStudents(
      students.map(s => 
        s.id === id ? { ...s, status: newStatus } : s
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

  const handleSaveStudent = (student: Participant) => {
    if (isEditing) {
      setStudents(
        students.map(s => s.id === student.id ? student : s)
      );
      toast({
        title: "Étudiant modifié",
        description: "Les informations de l'étudiant ont été mises à jour.",
      });
    } else {
      const newStudent = {
        ...student,
        id: Date.now().toString(),
        registrationDate: new Date().toISOString().split('T')[0],
        type: 'student' as const,
        status: 'pending' as const
      };
      setStudents([...students, newStudent]);
      toast({
        title: "Étudiant ajouté",
        description: "Le nouvel étudiant a été ajouté avec succès.",
      });
    }
    setIsModalOpen(false);
  };

  const downloadCSV = () => {
    const headers = ['Prénom', 'Nom', 'Email', 'Organisation', 'Pays', 'Téléphone', 'Date inscription', 'Statut'];
    const dataRows = students.map(s => [
      s.firstName,
      s.lastName,
      s.email,
      s.organization,
      s.country,
      s.phone,
      s.registrationDate,
      s.status
    ]);
    
    const csvContent = [
      headers.join(','),
      ...dataRows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'students.csv');
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
        <h2 className="text-2xl font-bold text-galien-blue">Gestion des Étudiants</h2>
        <div className="flex gap-2">
          <button 
            onClick={downloadCSV}
            className="btn-secondary py-2 px-4 flex items-center text-sm"
          >
            <Download className="h-4 w-4 mr-2" />
            Exporter CSV
          </button>
          <button 
            onClick={handleAddStudent}
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
          placeholder="Rechercher un étudiant..."
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
            {filteredStudents.length > 0 ? (
              filteredStudents.map((student) => (
                <tr key={student.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {student.firstName} {student.lastName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{student.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{student.organization}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{student.country}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(student.status)}`}>
                      {student.status === 'approved' ? 'Approuvé' : 
                       student.status === 'rejected' ? 'Rejeté' : 'En attente'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex gap-2 justify-end">
                      {student.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => handleStatusChange(student.id, 'approved')}
                            className="text-green-600 hover:text-green-900"
                            title="Approuver"
                          >
                            <Check className="h-5 w-5" />
                          </button>
                          <button 
                            onClick={() => handleStatusChange(student.id, 'rejected')}
                            className="text-red-600 hover:text-red-900"
                            title="Rejeter"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </>
                      )}
                      <button 
                        onClick={() => handleEditStudent(student)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Modifier"
                      >
                        <PenSquare className="h-5 w-5" />
                      </button>
                      <button 
                        onClick={() => handleDeleteStudent(student.id)}
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
                  Aucun étudiant trouvé
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
          onSave={handleSaveStudent}
          participant={currentStudent}
          isEditing={isEditing}
          participantType="student"
        />
      )}
    </div>
  );
};

export default StudentsList;
