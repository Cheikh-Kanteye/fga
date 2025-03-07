import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { SpecificFieldsProps } from "@/types";

const SpecificFields: React.FC<SpecificFieldsProps> = memo(
  ({ currentType, register }) => {
    const { t } = useTranslation();

    switch (currentType) {
      case "student":
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="university" className="form-label">
                  {t("register.university_school")}*
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
                  {t("register.field_of_study")}*
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
                  {t("register.level_of_study")}*
                </label>
                <select
                  {...register("studyLevel")}
                  id="studyLevel"
                  className="form-input"
                  required
                >
                  <option value="">{t("register.select")}</option>
                  <option value="licence">{t("register.bachelor")}</option>
                  <option value="master">{t("register.master")}</option>
                  <option value="doctorat">{t("register.phd")}</option>
                  <option value="autre">{t("register.other")}</option>
                </select>
              </div>
              <div>
                <label htmlFor="studentId" className="form-label">
                  {t("register.student_number")}*
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
                  {t("register.media")}*
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
                  {t("register.press_card_number")}*
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
                {t("register.coverage_type")}*
              </label>
              <select
                {...register("coverageType")}
                id="coverageType"
                className="form-input"
                required
              >
                <option value="">{t("register.select")}</option>
                <option value="print">{t("register.print_press")}</option>
                <option value="online">{t("register.online_press")}</option>
                <option value="radio">{t("register.radio")}</option>
                <option value="tv">{t("register.television")}</option>
                <option value="photo">{t("register.photography")}</option>
                <option value="autre">{t("register.other")}</option>
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
                {t("register.biography")} (max. 300 {t("register.words")})*
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
                {t("register.areas_of_expertise")}*
              </label>
              <input
                {...register("expertise")}
                id="expertise"
                className="form-input"
                required
                placeholder={t("register.expertise_placeholder")}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="speakingLanguages" className="form-label">
                  {t("register.spoken_languages")}*
                </label>
                <input
                  {...register("speakingLanguages")}
                  id="speakingLanguages"
                  className="form-input"
                  required
                  placeholder={t("register.languages_placeholder")}
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
                  {t("register.previous_participation")}
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
