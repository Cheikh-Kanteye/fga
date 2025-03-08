import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormData, formSchema } from "@/lib/schema";
import PersonalInfoForm from "./PersonalInfoForm";
import InternationalFields from "./InternationalField";
import { ParticipantType, RegisterFormProps } from "@/types";
import SpecificFields from "./SpecificFields";
import TermsAndSubmit from "./TermAndSubmit";
import FormStep from "./FormStep";
import FormTab from "./FormTab";
import SuccessAlert from "./SuccessAlert";
import { defaultRegisterFormValue } from "@/lib/dummy";
import prepareFormData from "@/utils/prepareFormData";

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
    defaultValues: defaultRegisterFormValue(defaultType),
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
    const formatedData = prepareFormData(data);

    if (step < getMaxSteps()) {
      setStep((prev) => prev + 1);
      return;
    }
    setIsSubmittingState(true);
    setTimeout(() => {
      console.log("Form submitted:", formatedData);
      setIsSubmittingState(false);
      setIsSuccess(true);
      if (onSuccess) onSuccess();
    }, 1500);
  };

  const onPrev = () => setStep((prev) => prev - 1);

  if (isSuccess) {
    return <SuccessAlert />;
  }

  return (
    <div className="glass-card p-8 bg-white">
      <FormTab handleTypeChange={handleTypeChange} currentType={currentType} />

      <FormStep {...{ currentType, step, getMaxSteps }} />

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

        <TermsAndSubmit {...{ getMaxSteps, onPrev, isSubmittingState, step }} />
      </form>
    </div>
  );
};

export default RegisterForm;
