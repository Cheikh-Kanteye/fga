import { FormData } from "@/lib/schema";

// Fonction pour préparer les données en fonction du type de participant
const prepareFormData = (formData: FormData) => {
  let entityData = {};

  if (formData.participantType === "panelist") {
    entityData = {
      nom: formData.lastName,
      prenom: formData.firstName,
      email1: formData.email,
      telephone: formData.phone,
      adresse: formData.address,
      ville: formData.city,
      pays: formData.country,
      forumDesJeunes: formData.forumDesJeunes || false,
      forumDesFemmes: formData.forumDesFemmes || false,
      forumScientifiques: formData.forumScientifiques || false,
      autreDocument: formData.autreDocument || "",
      biographie: formData.bio || "",
      isSpeakers: true,
    };
  } else if (formData.participantType === "student") {
    entityData = {
      nom: formData.lastName,
      prenom: formData.firstName,
      email1: formData.email,
      telephone: formData.phone,
      adresse: formData.address,
      ville: formData.city,
      pays: formData.country,
      university: formData.university || "",
      studentId: formData.studentId || "",
      studyField: formData.studyField || "",
    };
  } else if (formData.participantType === "press") {
    entityData = {
      nom: formData.lastName,
      prenom: formData.firstName,
      email1: formData.email,
      telephone: formData.phone,
      provenance: formData.provenance || "",
      organePresse: formData.mediaOutlet || "",
      priseChargeBillet: formData.flightDetails || "",
      pensionComplete: formData.accommodationNeeded || false,
      demiPension: formData.accommodationDates || "",
      selfCharge: formData.dietaryRestrictions || "",
    };
  } else {
    entityData = { ...formData };
  }

  return entityData;
};

export default prepareFormData;
