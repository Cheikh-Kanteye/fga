import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Participant } from "@/types";

interface ParticipantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (participant: Participant) => void;
  participant: Participant | null;
  isEditing: boolean;
  participantType: "participant" | "panelist" | "student" | "press";
}

const ParticipantModal: React.FC<ParticipantModalProps> = ({
  isOpen,
  onClose,
  onSave,
  participant,
  isEditing,
  participantType,
}) => {
  const [formData, setFormData] = useState<
    Omit<Participant, "id" | "registrationDate" | "type" | "status">
  >({
    firstName: "",
    lastName: "",
    email: "",
    organization: "",
    country: "",
    phone: "",
  });

  useEffect(() => {
    if (participant) {
      setFormData({
        firstName: participant.firstName,
        lastName: participant.lastName,
        email: participant.email,
        organization: participant.organization,
        country: participant.country,
        phone: participant.phone,
      });
    }
  }, [participant]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedParticipant: Participant = {
      id: participant?.id || "",
      ...formData,
      registrationDate:
        participant?.registrationDate || new Date().toISOString().split("T")[0],
      type: participantType,
      status: participant?.status || "pending",
    };
    onSave(updatedParticipant);
  };

  if (!isOpen) return null;

  const getTitle = () => {
    const type = {
      participant: "Participant",
      panelist: "Panéliste",
      student: "Étudiant",
      press: "Presse",
    }[participantType];

    return isEditing
      ? `Modifier le ${type.toLowerCase()}`
      : `Ajouter un nouveau ${type.toLowerCase()}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4">
        <div
          className="fixed inset-0 bg-black bg-opacity-50"
          onClick={onClose}
        ></div>
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md z-10">
          <div className="flex justify-between items-center p-6 border-b">
            <h3 className="text-xl font-bold text-galien-blue">{getTitle()}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="firstName" className="form-label">
                  Prénom
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className="form-input"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="lastName" className="form-label">
                  Nom
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className="form-input"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="organization" className="form-label">
                Organisation
              </label>
              <input
                type="text"
                id="organization"
                name="organization"
                className="form-input"
                value={formData.organization}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label htmlFor="country" className="form-label">
                  Pays
                </label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  className="form-input"
                  value={formData.country}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="form-label">
                  Téléphone
                </label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className="form-input"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button type="button" onClick={onClose} className="btn-secondary">
                Annuler
              </button>
              <button type="submit" className="btn-primary">
                {isEditing ? "Mettre à jour" : "Ajouter"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ParticipantModal;
