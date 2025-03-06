
import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import RegisterForm from '../components/registration/RegisterForm';
import { useLocation } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

const Register: React.FC = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const type = params.get('type') as 'panelist' | 'student' | 'press' | 'participant' | 'international' | null;
  const { toast } = useToast();
  
  // Show toast when registration form is submitted successfully (this will be triggered by the form)
  const handleRegistrationSuccess = () => {
    toast({
      title: "Inscription soumise avec succès",
      description: "Votre demande a été reçue. Vous recevrez un email de confirmation après validation.",
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32 pb-20 bg-galien-bg">
        <div className="container-custom max-w-4xl">
          <div className="text-center mb-10">
            <div className="badge-primary inline-block mb-4">Inscription</div>
            <h1 className="heading-lg mb-4">Rejoignez le Forum Galien Afrique</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Complétez le formulaire ci-dessous pour soumettre votre demande d'inscription. 
              Notre équipe examinera votre demande et vous contactera dans les plus brefs délais.
            </p>
          </div>
          
          <RegisterForm 
            defaultType={type || 'participant'} 
            onSuccess={handleRegistrationSuccess}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
