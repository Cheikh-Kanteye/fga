import React, { memo } from "react";
import { SpecificFieldsProps } from "@/types";

const SpecificFields: React.FC<SpecificFieldsProps> = memo(
  ({ currentType, register }) => {
    switch (currentType) {
      case "student":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="university" className="form-label">
                  Université / École*
                </label>
                <input
                  {...register("university")}
                  id="university"
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label htmlFor="studyField" className="form-label">
                  Domaine d'études*
                </label>
                <input
                  {...register("studyField")}
                  id="studyField"
                  className="form-input"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="studyLevel" className="form-label">
                  Niveau d'études*
                </label>
                <select
                  {...register("studyLevel")}
                  id="studyLevel"
                  className="form-input"
                  required
                >
                  <option value="">Sélectionner</option>
                  <option value="licence">Licence</option>
                  <option value="master">Master</option>
                  <option value="doctorat">Doctorat</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div>
                <label htmlFor="studentId" className="form-label">
                  Numéro d'étudiant*
                </label>
                <input
                  {...register("studentId")}
                  id="studentId"
                  className="form-input"
                  required
                />
              </div>
            </div>
          </div>
        );
      case "press":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="mediaOutlet" className="form-label">
                  Média*
                </label>
                <input
                  {...register("mediaOutlet")}
                  id="mediaOutlet"
                  className="form-input"
                  required
                />
              </div>
              <div>
                <label htmlFor="pressCardNumber" className="form-label">
                  Numéro de carte de presse*
                </label>
                <input
                  {...register("pressCardNumber")}
                  id="pressCardNumber"
                  className="form-input"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="coverageType" className="form-label">
                Type de couverture*
              </label>
              <select
                {...register("coverageType")}
                id="coverageType"
                className="form-input"
                required
              >
                <option value="">Sélectionner</option>
                <option value="print">Presse écrite</option>
                <option value="online">Presse en ligne</option>
                <option value="radio">Radio</option>
                <option value="tv">Télévision</option>
                <option value="photo">Photographie</option>
                <option value="autre">Autre</option>
              </select>
            </div>
          </div>
        );
      case "panelist":
      case "international":
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="bio" className="form-label">
                Biographie (max. 300 mots)*
              </label>
              <textarea
                {...register("bio")}
                id="bio"
                rows={4}
                className="form-input"
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="expertise" className="form-label">
                Domaines d'expertise*
              </label>
              <input
                {...register("expertise")}
                id="expertise"
                className="form-input"
                required
                placeholder="Ex: Santé publique, Innovation médicale, Politique de santé"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="speakingLanguages" className="form-label">
                  Langues parlées*
                </label>
                <input
                  {...register("speakingLanguages")}
                  id="speakingLanguages"
                  className="form-input"
                  required
                  placeholder="Ex: Français, Anglais, Arabe"
                />
              </div>
              <div className="flex items-center">
                <input
                  {...register("previousParticipation")}
                  type="checkbox"
                  id="previousParticipation"
                  className="h-5 w-5 rounded-md border-galien-secondary mr-2"
                />
                <label
                  htmlFor="previousParticipation"
                  className="form-label m-0"
                >
                  J'ai déjà participé à une édition précédente du Forum Galien
                </label>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  }
);

export default SpecificFields;
