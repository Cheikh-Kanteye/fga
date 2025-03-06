import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle } from "lucide-react";
import { FormData, formSchema } from "@/lib/schema";
import PersonalInfoForm from "./PersonalInfoForm";
import InternationalFields from "./InternationalField";
import { ParticipantType, RegisterFormProps } from "@/types";
import SpecificFields from "./SpecificFields";

// Main RegisterForm component
const RegisterForm: React.FC<RegisterFormProps> = ({
  defaultType = "participant",
  onSuccess,
}) => {
  const location = useLocation();
  const [step, setStep] = useState(1);
  const [isSubmittingState, setIsSubmittingState] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      participantType: defaultType,
      isInternational: defaultType === "international",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      organization: "",
      position: "",
      flightDetails: "",
      accommodationNeeded: false,
      accommodationDates: "",
      dietaryRestrictions: "",
      university: "",
      studyField: "",
      studyLevel: "",
      studentId: "",
      mediaOutlet: "",
      pressCardNumber: "",
      coverageType: "",
      bio: "",
      expertise: "",
      previousParticipation: false,
      speakingLanguages: "",
    },
  });

  const currentType = watch("participantType");
  const accommodationNeeded = watch("accommodationNeeded");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const typeParam = params.get("type") as ParticipantType | null;
    if (
      typeParam &&
      ["panelist", "student", "press", "participant", "international"].includes(
        typeParam
      )
    ) {
      setValue("participantType", typeParam);
      setValue("isInternational", typeParam === "international");
    }
  }, [location, setValue]);

  const getMaxSteps = () => {
    switch (currentType) {
      case "international":
        return 3;
      case "panelist":
      case "press":
      case "student":
        return 2;
      default:
        return 1;
    }
  };

  const handleTypeChange = (type: ParticipantType) => {
    setValue("participantType", type);
    setValue("isInternational", type === "international");
  };

  const onSubmit = (data: FormData) => {
    if (step < getMaxSteps()) {
      setStep((prev) => prev + 1);
      return;
    }
    setIsSubmittingState(true);
    setTimeout(() => {
      console.log("Form submitted:", data);
      setIsSubmittingState(false);
      setIsSuccess(true);
      if (onSuccess) onSuccess();
    }, 1500);
  };

  const onPrev = () => setStep((prev) => prev - 1);

  if (isSuccess) {
    return (
      <div className="glass-card p-8 text-center bg-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-galien-blue">
            Inscription reçue avec succès !
          </h2>
          <p className="text-gray-600 max-w-md">
            Nous avons bien reçu votre demande d'inscription au Forum Galien
            Afrique. Un email de confirmation a été envoyé.
          </p>
          <p className="text-gray-600 mt-2">
            Votre demande sera examinée par notre équipe et vous recevrez une
            confirmation dans les plus brefs délais.
          </p>
          <div className="mt-8">
            <a href="/" className="btn-secondary">
              Retour à l'accueil
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-8 bg-white">
      <div className="mb-8">
        <h3 className="text-lg font-medium text-galien-blue mb-4">
          Type de participation
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          {(
            [
              "participant",
              "student",
              "press",
              "panelist",
              "international",
            ] as ParticipantType[]
          ).map((type) => (
            <button
              key={type}
              type="button"
              className={`px-4 py-3 rounded-lg text-sm font-medium border transition-colors ${
                currentType === type
                  ? "border-galien-blue bg-galien-blue text-white"
                  : "border-galien-secondary text-galien-blue hover:bg-galien-secondary/30"
              }`}
              onClick={() => handleTypeChange(type)}
            >
              {type === "international"
                ? "Paneliste international"
                : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {getMaxSteps() > 1 && (
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {Array.from({ length: getMaxSteps() }).map((_, index) => (
              <React.Fragment key={index}>
                <div
                  className={`flex flex-col items-center ${
                    index + 1 === step ? "text-galien-blue" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      index + 1 === step
                        ? "bg-galien-blue text-white"
                        : index + 1 < step
                        ? "bg-green-100 text-green-600 border border-green-600"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {index + 1 < step ? <CheckCircle size={18} /> : index + 1}
                  </div>
                  <span className="text-xs mt-2">
                    {index === 0
                      ? "Informations personnelles"
                      : index === 1 && currentType === "international"
                      ? "Informations supplémentaires"
                      : index === 1
                      ? "Informations spécifiques"
                      : "Prise en charge"}
                  </span>
                </div>
                {index < getMaxSteps() - 1 && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      index + 1 < step ? "bg-green-500" : "bg-gray-200"
                    }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        {step === 1 && <PersonalInfoForm register={register} errors={errors} />}
        {step === 2 && (
          <SpecificFields currentType={currentType} register={register} />
        )}
        {step === 3 && currentType === "international" && (
          <InternationalFields
            register={register}
            accommodationNeeded={!!accommodationNeeded}
          />
        )}

        <button
          type="submit"
          className={`btn-primary w-full mt-6 ${
            isSubmittingState ? "opacity-70 cursor-not-allowed" : ""
          }`}
          disabled={isSubmittingState}
        >
          {isSubmittingState ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Traitement en cours...
            </span>
          ) : step < getMaxSteps() ? (
            "Continuer"
          ) : (
            "Soumettre ma demande"
          )}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
