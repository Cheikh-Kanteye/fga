import { CheckCircle } from "lucide-react";

const SuccessAlert = () => {
  return (
    <div className="glass-card p-8 text-center bg-white">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
          <CheckCircle size={32} />
        </div>
        <h2 className="text-2xl font-bold text-galien-blue">
          Inscription reçue avec succès !
        </h2>
        <p className="text-gray-600 max-w-md">
          Nous avons bien reçu votre demande d'inscription au Forum Galien
          Afrique. Un email de confirmation a été envoyé.
        </p>
        <p className="text-gray-600 mt-2">
          Votre demande sera examinée par notre équipe et vous recevrez une
          confirmation dans les plus brefs délais.
        </p>
        <div className="mt-8">
          <a href="/" className="btn-secondary">
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
};

export default SuccessAlert;
