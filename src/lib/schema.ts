import z from "zod";

export const formSchema = z.object({
  participantType: z.enum([
    "panelist",
    "student",
    "press",
    "participant",
    "international",
  ]),
  firstName: z.string().min(1, "Le prénom est requis"),
  lastName: z.string().min(1, "Le nom est requis"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(1, "Le téléphone est requis"),
  country: z.string().min(1, "Le pays est requis"),
  city: z.string().min(1, "La ville est requise"),
  address: z.string().optional(),
  organization: z.string().min(1, "L'organisation est requise"),
  position: z.string().min(1, "Le poste est requis"),
  // Champs optionnels pour les participants internationaux
  isInternational: z.boolean().optional(),
  flightDetails: z.string().optional(),
  accommodationNeeded: z.boolean().optional(),
  accommodationDates: z.string().optional(),
  dietaryRestrictions: z.string().optional(),
  flightDepartureDate: z.string().date().optional(),
  flightArrivalDate: z.string().date().optional(),
  flightArrivalTime: z.string().time().optional(),
  // Champs étudiants
  university: z.string().optional(),
  studyField: z.string().optional(),
  studyLevel: z.string().optional(),
  studentId: z.string().optional(),
  // Champs presse
  mediaOutlet: z.string().optional(),
  pressCardNumber: z.string().optional(),
  coverageType: z.string().optional(),
  // Champs spécifiques panelistes/international
  bio: z.string().optional(),
  expertise: z.string().optional(),
  previousParticipation: z.boolean().optional(),
  speakingLanguages: z.string().optional(),
  // Champs supplémentaires
  forumDesJeunes: z.boolean().optional(),
  forumDesFemmes: z.boolean().optional(),
  forumScientifiques: z.boolean().optional(),
  autreDocument: z.string().optional(),
  provenance: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;
