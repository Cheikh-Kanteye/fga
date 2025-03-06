import { Participant } from "@/types";

// Sample data for demonstration
export const initialParticipants: Participant[] = [
  {
    id: "1",
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@example.com",
    organization: "Université de Paris",
    country: "France",
    phone: "+33 6 12 34 56 78",
    registrationDate: "2023-10-15",
    type: "participant",
    status: "approved",
  },
  {
    id: "2",
    firstName: "Marie",
    lastName: "Martin",
    email: "marie.martin@example.com",
    organization: "Institut Pasteur",
    country: "France",
    phone: "+33 6 23 45 67 89",
    registrationDate: "2023-10-18",
    type: "participant",
    status: "pending",
  },
  {
    id: "3",
    firstName: "Paul",
    lastName: "Diallo",
    email: "paul.diallo@example.com",
    organization: "Université Cheikh Anta Diop",
    country: "Sénégal",
    phone: "+221 77 123 45 67",
    registrationDate: "2023-10-20",
    type: "participant",
    status: "approved",
  },
];
