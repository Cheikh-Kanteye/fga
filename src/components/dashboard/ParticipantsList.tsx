import React, { useState } from "react";
import {
  Search,
  UserPlus,
  Trash,
  PenSquare,
  Check,
  X,
  Download,
  Eye,
} from "lucide-react";
import { Participant } from "@/types";
import ParticipantModal from "./ParticipantModal";
import { useToast } from "@/hooks/use-toast";
import { initialParticipants } from "@/lib/dummy";
import { Link } from "react-router-dom";

const ParticipantsList: React.FC = () => {
  const [participants, setParticipants] =
    useState<Participant[]>(initialParticipants);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentParticipant, setCurrentParticipant] =
    useState<Participant | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  const filteredParticipants = participants.filter(
    (participant) =>
      participant.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.organization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddParticipant = () => {
    setCurrentParticipant(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditParticipant = (participant: Participant) => {
    setCurrentParticipant(participant);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleDeleteParticipant = (id: string) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce participant ?")) {
      setParticipants(participants.filter((p) => p.id !== id));
      toast({
        title: "Participant supprimé",
        description: "Le participant a été supprimé avec succès.",
      });
    }
  };

  const handleStatusChange = (
    id: string,
    newStatus: "approved" | "rejected" | "pending"
  ) => {
    setParticipants(
      participants.map((p) => (p.id === id ? { ...p, status: newStatus } : p))
    );

    const statusMessages = {
      approved: "La participation a été approuvée.",
      rejected: "La participation a été rejetée.",
      pending: "La participation est en attente de validation.",
    };

    toast({
      title: "Statut mis à jour",
      description: statusMessages[newStatus],
    });
  };

  const handleSaveParticipant = (participant: Participant) => {
    if (isEditing) {
      setParticipants(
        participants.map((p) => (p.id === participant.id ? participant : p))
      );
      toast({
        title: "Participant modifié",
        description: "Les informations du participant ont été mises à jour.",
      });
    } else {
      const newParticipant = {
        ...participant,
        id: Date.now().toString(),
        registrationDate: new Date().toISOString().split("T")[0],
        type: "participant" as const,
        status: "pending" as const,
      };
      setParticipants([...participants, newParticipant]);
      toast({
        title: "Participant ajouté",
        description: "Le nouveau participant a été ajouté avec succès.",
      });
    }
    setIsModalOpen(false);
  };

  const downloadCSV = () => {
    const headers = [
      "Prénom",
      "Nom",
      "Email",
      "Organisation",
      "Pays",
      "Téléphone",
      "Date inscription",
      "Statut",
    ];
    const dataRows = participants.map((p) => [
      p.firstName,
      p.lastName,
      p.email,
      p.organization,
      p.country,
      p.phone,
      p.registrationDate,
      p.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...dataRows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "participants.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-galien-blue">
          Gestion des Participants
        </h2>
        <div className="flex gap-2">
          <button
            onClick={downloadCSV}
            className="btn-secondary py-2 px-4 flex items-center text-sm"
          >
            <Download className="h-4 w-4 mr-2" />
            Exporter CSV
          </button>
          <button
            onClick={handleAddParticipant}
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
          placeholder="Rechercher un participant..."
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-galien-blue focus:border-transparent"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Nom
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Organisation
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Pays
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Statut
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredParticipants.length > 0 ? (
              filteredParticipants.map((participant) => (
                <tr key={participant.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {participant.firstName} {participant.lastName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {participant.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {participant.organization}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {participant.country}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                        participant.status
                      )}`}
                    >
                      {participant.status === "approved"
                        ? "Approuvé"
                        : participant.status === "rejected"
                        ? "Rejeté"
                        : "En attente"}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex gap-2 justify-end">
                      {participant.status === "pending" && (
                        <>
                          <button
                            onClick={() =>
                              handleStatusChange(participant.id, "approved")
                            }
                            className="text-green-600 hover:text-green-900"
                            title="Approuver"
                          >
                            <Check className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() =>
                              handleStatusChange(participant.id, "rejected")
                            }
                            className="text-red-600 hover:text-red-900"
                            title="Rejeter"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => handleEditParticipant(participant)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Modifier"
                      >
                        <PenSquare className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDeleteParticipant(participant.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Supprimer"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                      <Link
                        to={"/dashboard/participants/" + participant.id}
                        className="text-blue-600 hover:text-blue-900"
                        title="Voir infos"
                      >
                        <Eye className="h-5 w-5" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  Aucun participant trouvé
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
          onSave={handleSaveParticipant}
          participant={currentParticipant}
          isEditing={isEditing}
          participantType="participant"
        />
      )}
    </div>
  );
};

export default ParticipantsList;
