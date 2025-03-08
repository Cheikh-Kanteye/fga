import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="relative min-h-screen flex items-center pt-20">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute right-0 top-20 w-1/4 h-1/3 bg-galien-gold/20 rounded-full blur-3xl transform -translate-y-1/2"></div>
        <div className="absolute left-0 bottom-0 w-1/3 h-1/4 bg-galien-blue/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-up">
            <div className="badge-primary inline-block">
              Forum Galien Afrique {new Date().getFullYear()}
            </div>

            <h1 className="heading-xl">{t("hero.title")}</h1>

            <p className="text-lg md:text-xl text-gray-600 max-w-xl">
              {t("hero.subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="btn-primary flex items-center justify-center gap-2"
              >
                {t("hero.cta_register")} <ArrowRight size={18} />
              </Link>
              <a
                href="https://forumgalienafrique.com/"
                target="blank"
                className="btn-secondary flex items-center justify-center gap-2"
              >
                {t("hero.cta_program")}
              </a>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500 pt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span>{t("hero.open_registrations")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-galien-blue"></div>
                <span>{t("hero.limited_seats")}</span>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in">
            <div className="glass-card p-6 md:p-8 rounded-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-galien-gold/30 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>

              <div className="relative z-10 aspect-video bg-gray-200 rounded-xl overflow-hidden">
                {/* This would be an image or video in production */}
                <div className="absolute inset-0 flex items-center justify-center text-galien-blue">
                  <img
                    src="/banner.jpg"
                    alt="banner"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium text-galien-blue">
                    {t("hero.date")}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Lieu</p>
                  <p className="font-medium text-galien-blue">
                    {t("hero.location")}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Participants</p>
                  <p className="font-medium text-galien-blue">
                    {t("hero.participants")}
                  </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-sm">
                  <p className="text-sm text-gray-500">Speakers</p>
                  <p className="font-medium text-galien-blue">
                    {t("hero.speakers")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
