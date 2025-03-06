import React, { memo } from "react";
import { InternationalFieldsProps } from "@/types";

const InternationalFields: React.FC<InternationalFieldsProps> = memo(
  ({ register, accommodationNeeded }) => {
    return (
      <div className="space-y-4">
        <div>
          <label htmlFor="flightDetails" className="form-label">
            Informations de vol (si connues)
          </label>
          <textarea
            {...register("flightDetails")}
            id="flightDetails"
            rows={2}
            className="form-input"
            placeholder="Numéro de vol, date et heure d'arrivée"
          ></textarea>
        </div>
        <div className="flex items-center mb-4">
          <input
            {...register("accommodationNeeded")}
            type="checkbox"
            id="accommodationNeeded"
            className="h-5 w-5 rounded-md border-galien-secondary mr-2"
          />
          <label htmlFor="accommodationNeeded" className="form-label m-0">
            J'ai besoin d'un hébergement
          </label>
        </div>
        {accommodationNeeded && (
          <div>
            <label htmlFor="accommodationDates" className="form-label">
              Dates d'hébergement requises*
            </label>
            <input
              {...register("accommodationDates")}
              id="accommodationDates"
              className="form-input"
              placeholder="Ex: 14-18 novembre 2024"
              required
            />
          </div>
        )}
        <div>
          <label htmlFor="dietaryRestrictions" className="form-label">
            Restrictions alimentaires ou besoins spécifiques
          </label>
          <input
            {...register("dietaryRestrictions")}
            id="dietaryRestrictions"
            className="form-input"
            placeholder="Ex: Végétarien, allergies, etc."
          />
        </div>
      </div>
    );
  }
);

export default InternationalFields;
