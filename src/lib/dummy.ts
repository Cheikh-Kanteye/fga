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

// Sample data for demonstration
export const initialPanelists: Participant[] = [
  {
    id: "101",
    firstName: "Sophie",
    lastName: "Mbengue",
    email: "sophie.mbengue@example.com",
    organization: "Université de Dakar",
    country: "Sénégal",
    phone: "+221 77 234 56 78",
    registrationDate: "2023-09-15",
    type: "panelist",
    status: "approved",
  },
  {
    id: "102",
    firstName: "Marc",
    lastName: "Kouamé",
    email: "marc.kouame@example.com",
    organization: "Institut National de Santé Publique",
    country: "Côte d'Ivoire",
    phone: "+225 07 12 34 56",
    registrationDate: "2023-09-20",
    type: "panelist",
    status: "approved",
  },
];

// Sample data for demonstration
export const initialStudents: Participant[] = [
  {
    id: "201",
    firstName: "Fatou",
    lastName: "Diop",
    email: "fatou.diop@student.example.com",
    organization: "Université Cheikh Anta Diop",
    country: "Sénégal",
    phone: "+221 77 345 67 89",
    registrationDate: "2023-10-02",
    type: "student",
    status: "approved",
  },
  {
    id: "202",
    firstName: "Kofi",
    lastName: "Mensah",
    email: "kofi.mensah@student.example.com",
    organization: "University of Ghana",
    country: "Ghana",
    phone: "+233 24 123 4567",
    registrationDate: "2023-10-05",
    type: "student",
    status: "pending",
  },
];
