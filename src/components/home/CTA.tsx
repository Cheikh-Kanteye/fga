import React from "react";
import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="py-16 bg-galien-blue text-white">
      <div className="container-custom text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-8">
          Prêt à participer au Forum Galien Afrique?
        </h2>
        <p className="text-xl mb-10 max-w-2xl mx-auto">
          Inscrivez-vous dès maintenant pour réserver votre place et participer
          à cet événement exceptionnel.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register" className="btn-secondary">
            Inscription générale
          </Link>
          <Link to="/register?type=panelist" className="btn-secondary">
            Inscription panéliste
          </Link>
          <Link to="/register?type=student" className="btn-secondary">
            Inscription étudiant
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTA;
