import z from "zod";

export const formSchema = z.object({
  participantType: z.enum([
    "panelist",
    "student",
    "press",
    "participant",
    "international",
  ]),
  firstName: z.string().min(1, "Required"),
  lastName: z.string().min(1, "Required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(1, "Required"),
  country: z.string().min(1, "Required"),
  city: z.string().min(1, "Required"),
  organization: z.string().min(1, "Required"),
  position: z.string().min(1, "Required"),
  // international fields
  isInternational: z.boolean().optional(),
  flightDetails: z.string().optional(),
  accommodationNeeded: z.boolean().optional(),
  accommodationDates: z.string().optional(),
  dietaryRestrictions: z.string().optional(),
  // student fields
  university: z.string().optional(),
  studyField: z.string().optional(),
  studyLevel: z.string().optional(),
  studentId: z.string().optional(),
  // press fields
  mediaOutlet: z.string().optional(),
  pressCardNumber: z.string().optional(),
  coverageType: z.string().optional(),
  // panelist / international fields
  bio: z.string().optional(),
  expertise: z.string().optional(),
  previousParticipation: z.boolean().optional(),
  speakingLanguages: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;
