import { ParticipantType } from "@/types";
import React from "react";

const FormTab: React.FC<{
  currentType: string;
  handleTypeChange: (type: string) => void;
}> = ({ currentType, handleTypeChange }) => {
  return (
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
  );
};

export default FormTab;
