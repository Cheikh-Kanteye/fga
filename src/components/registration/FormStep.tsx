import { CheckCircle } from "lucide-react";
import React from "react";

const FormStep: React.FC<{
  getMaxSteps: () => number;
  step: number;
  currentType: string;
}> = ({ getMaxSteps, step, currentType }) => {
  return getMaxSteps() > 1 ? (
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
  ) : null;
};

export default FormStep;
