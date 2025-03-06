import { FormData } from "@/lib/schema";
import { FieldErrors, UseFormRegister } from "react-hook-form";

export interface Participant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  organization: string;
  country: string;
  phone: string;
  registrationDate: string;
  type: "participant" | "panelist" | "student" | "press";
  status: "pending" | "approved" | "rejected";
}

export type ParticipantType =
  | "panelist"
  | "student"
  | "press"
  | "participant"
  | "international";

export interface RegisterFormProps {
  defaultType?: ParticipantType;
  onSuccess?: () => void;
}

// Specific fields component
export interface SpecificFieldsProps {
  currentType: ParticipantType;
  register: UseFormRegister<FormData>;
}

// Terms and Submit component
export interface TermsAndSubmitProps {
  step: number;
  getMaxSteps: () => number;
  isSubmittingState: boolean;
  onPrev: () => void;
}

// International fields component
export interface InternationalFieldsProps {
  register: UseFormRegister<FormData>;
  accommodationNeeded: boolean;
}

// Personal info component
export interface PersonalInfoProps {
  register: UseFormRegister<FormData>;
  errors: FieldErrors<FormData>;
}
