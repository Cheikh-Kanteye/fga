import React from "react";
import axios from "axios";
import DataTable from "../components/DataTable";
import { useAuth } from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Participant } from "../assets/MOCK_DATA";
import { ColumnDef } from "@tanstack/react-table";
import AddParticipantForm from "./AddParticipantForm";

interface ParticipantListProps {
  type: "participant" | "speaker" | "etudiant";
  endpoint: string;
  columns: ColumnDef<Participant>[];
}

const BASE_URL = "http://51.77.215.159:8000/v3";

const ParticipantList: React.FC<ParticipantListProps> = ({
  type,
  endpoint,
  columns,
}) => {
  const { user } = useAuth(); // Utilisation de useAuth pour récupérer user

  const fetchData = async () => {
    const token = user?.token;

    if (!token) {
      throw new Error("Token utilisateur non disponible.");
    }

    const response = await axios.get(`${BASE_URL}/organisations/${endpoint}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    return response.data as Participant[];
  };

  const {
    isLoading,
    isError,
    data: participants,
  } = useQuery({
    queryKey: ["participants", endpoint],
    queryFn: fetchData,
    enabled: !!user?.token, // Ne pas exécuter la requête si le token n'est pas disponible
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Une erreur s'est produite. Veuillez réessayer !</div>;
  }

  return (
    <div>
      <DataTable
        type={`${type}s`}
        columns={columns}
        filterId="email1"
        data={participants || []}
        form={<AddParticipantForm type={type} />}
      />
    </div>
  );
};

export default ParticipantList;
