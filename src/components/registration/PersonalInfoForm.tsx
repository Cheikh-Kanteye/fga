import { PersonalInfoProps } from "@/types";
import { memo } from "react";

const PersonalInfoForm: React.FC<PersonalInfoProps> = memo(
  ({ register, errors }) => {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="form-label">
              Prénom*
            </label>
            <input
              {...register("firstName")}
              id="firstName"
              className="form-input"
              required
            />
            {errors.firstName && <p>{errors.firstName.message}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="form-label">
              Nom*
            </label>
            <input
              {...register("lastName")}
              id="lastName"
              className="form-input"
              required
            />
            {errors.lastName && <p>{errors.lastName.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="form-label">
              Email*
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className="form-input"
              required
            />
            {errors.email && <p>{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="form-label">
              Téléphone*
            </label>
            <input
              {...register("phone")}
              type="tel"
              id="phone"
              className="form-input"
              required
            />
            {errors.phone && <p>{errors.phone.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="country" className="form-label">
              Pays*
            </label>
            <input
              {...register("country")}
              id="country"
              className="form-input"
              required
            />
            {errors.country && <p>{errors.country.message}</p>}
          </div>
          <div>
            <label htmlFor="city" className="form-label">
              Ville*
            </label>
            <input
              {...register("city")}
              id="city"
              className="form-input"
              required
            />
            {errors.city && <p>{errors.city.message}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="organization" className="form-label">
              Organisation / Institution*
            </label>
            <input
              {...register("organization")}
              id="organization"
              className="form-input"
              required
            />
            {errors.organization && <p>{errors.organization.message}</p>}
          </div>
          <div>
            <label htmlFor="position" className="form-label">
              Fonction / Position*
            </label>
            <input
              {...register("position")}
              id="position"
              className="form-input"
              required
            />
            {errors.position && <p>{errors.position.message}</p>}
          </div>
        </div>
      </div>
    );
  }
);

export default PersonalInfoForm;
