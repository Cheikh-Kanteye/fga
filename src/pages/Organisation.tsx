import axios from "axios";
import DataTable from "../components/DataTable";
import { useAuth } from "../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Person } from "../assets/MOCK_DATA";
import { AddOrganisateurForm } from "../components/AddOrganisateurForm";
import { columns } from "../components/Columns";

const BASE_URL = "http://51.77.215.159:8000/v3";

const Organisation = () => {
  const { user } = useAuth(); // Utilisation de useAuth pour récupérer user

  const fetchData = async () => {
    const token = user?.token;
    if (!token) {
      throw new Error("Token utilisateur non disponible.");
    }

    const response = await axios.get(
      `${BASE_URL}/organisations/organisations/`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );
    return response.data as Person[];
  };

  const {
    isLoading,
    isError,
    data: participants,
    error,
  } = useQuery({
    queryKey: ["organisations"],
    queryFn: fetchData,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Erreur : {error.message}</div>;
  }

  return (
    <div>
      <DataTable
        columns={columns}
        data={participants || []}
        type="organisations"
        form={<AddOrganisateurForm />}
      />
    </div>
  );
};

export default Organisation;
