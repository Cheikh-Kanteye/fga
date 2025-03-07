import { PersonalInfoProps } from "@/types";
import { memo } from "react";
import { useTranslation } from "react-i18next";

const PersonalInfoForm: React.FC<PersonalInfoProps> = memo(
  ({ register, errors }) => {
    const { t } = useTranslation();

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="form-label">
              {t("register.first_name")}*
            </label>
            <input
              {...register("firstName")}
              id="firstName"
              className="form-input"
              required
            />
            {errors.firstName && (
              <p>{t(`register.${errors.firstName.message}`)}</p>
            )}
          </div>
          <div>
            <label htmlFor="lastName" className="form-label">
              {t("register.last_name")}*
            </label>
            <input
              {...register("lastName")}
              id="lastName"
              className="form-input"
              required
            />
            {errors.lastName && (
              <p>{t(`register.${errors.lastName.message}`)}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="form-label">
              {t("register.email")}*
            </label>
            <input
              {...register("email")}
              type="email"
              id="email"
              className="form-input"
              required
            />
            {errors.email && <p>{t(`register.${errors.email.message}`)}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="form-label">
              {t("register.phone")}*
            </label>
            <input
              {...register("phone")}
              type="tel"
              id="phone"
              className="form-input"
              required
            />
            {errors.phone && <p>{t(`register.${errors.phone.message}`)}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="country" className="form-label">
              {t("register.country")}*
            </label>
            <input
              {...register("country")}
              id="country"
              className="form-input"
              required
            />
            {errors.country && <p>{t(`register.${errors.country.message}`)}</p>}
          </div>
          <div>
            <label htmlFor="city" className="form-label">
              {t("register.city")}*
            </label>
            <input
              {...register("city")}
              id="city"
              className="form-input"
              required
            />
            {errors.city && <p>{t(`register.${errors.city.message}`)}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="organization" className="form-label">
              {t("register.organization")}*
            </label>
            <input
              {...register("organization")}
              id="organization"
              className="form-input"
              required
            />
            {errors.organization && (
              <p>{t(`register.${errors.organization.message}`)}</p>
            )}
          </div>
          <div>
            <label htmlFor="position" className="form-label">
              {t("register.position")}*
            </label>
            <input
              {...register("position")}
              id="position"
              className="form-input"
              required
            />
            {errors.position && (
              <p>{t(`register.${errors.position.message}`)}</p>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default PersonalInfoForm;
