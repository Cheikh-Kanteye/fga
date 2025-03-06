import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

type ParticipantType = 'panelist' | 'student' | 'press' | 'participant' | 'international';

interface RegisterFormProps {
  defaultType?: ParticipantType;
  onSuccess?: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ defaultType = 'participant', onSuccess }) => {
  const [participantType, setParticipantType] = useState<ParticipantType>(defaultType);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const location = useLocation();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    organization: '',
    position: '',
    
    isInternational: false,
    flightDetails: '',
    accommodationNeeded: false,
    accommodationDates: '',
    dietaryRestrictions: '',
    
    university: '',
    studyField: '',
    studyLevel: '',
    studentId: '',
    
    mediaOutlet: '',
    pressCardNumber: '',
    coverageType: '',
    
    bio: '',
    expertise: '',
    previousParticipation: false,
    speakingLanguages: '',
    
    agreeToTerms: false,
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const typeParam = params.get('type') as ParticipantType | null;
    if (typeParam && ['panelist', 'student', 'press', 'participant', 'international'].includes(typeParam)) {
      setParticipantType(typeParam);
      if (typeParam === 'international') {
        setFormData(prev => ({ ...prev, isInternational: true }));
      }
    }
  }, [location]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleTypeChange = (type: ParticipantType) => {
    setParticipantType(type);
    if (type === 'international') {
      setFormData(prev => ({ ...prev, isInternational: true }));
    } else if (formData.isInternational) {
      setFormData(prev => ({ ...prev, isInternational: false }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step < getMaxSteps()) {
      setStep(prev => prev + 1);
      return;
    }
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setIsSubmitting(false);
      setIsSuccess(true);
      
      if (onSuccess) {
        onSuccess();
      }
    }, 1500);
  };

  const getMaxSteps = () => {
    switch (participantType) {
      case 'international':
        return 3;
      case 'panelist':
        return 2;
      case 'press':
      case 'student':
        return 2;
      default:
        return 1;
    }
  };

  const renderPersonalInfoForm = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="firstName" className="form-label">Prénom*</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            className="form-input"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="form-label">Nom*</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            className="form-input"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email" className="form-label">Email*</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-input"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className="form-label">Téléphone*</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-input"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="country" className="form-label">Pays*</label>
          <input
            type="text"
            id="country"
            name="country"
            className="form-input"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="city" className="form-label">Ville*</label>
          <input
            type="text"
            id="city"
            name="city"
            className="form-input"
            value={formData.city}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="organization" className="form-label">Organisation / Institution*</label>
          <input
            type="text"
            id="organization"
            name="organization"
            className="form-input"
            value={formData.organization}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="position" className="form-label">Fonction / Position*</label>
          <input
            type="text"
            id="position"
            name="position"
            className="form-input"
            value={formData.position}
            onChange={handleChange}
            required
          />
        </div>
      </div>
    </div>
  );

  const renderSpecificFields = () => {
    switch (participantType) {
      case 'student':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="university" className="form-label">Université / École*</label>
                <input
                  type="text"
                  id="university"
                  name="university"
                  className="form-input"
                  value={formData.university}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="studyField" className="form-label">Domaine d'études*</label>
                <input
                  type="text"
                  id="studyField"
                  name="studyField"
                  className="form-input"
                  value={formData.studyField}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="studyLevel" className="form-label">Niveau d'études*</label>
                <select
                  id="studyLevel"
                  name="studyLevel"
                  className="form-input"
                  value={formData.studyLevel}
                  onChange={handleChange}
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
                <label htmlFor="studentId" className="form-label">Numéro d'étudiant*</label>
                <input
                  type="text"
                  id="studentId"
                  name="studentId"
                  className="form-input"
                  value={formData.studentId}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>
        );
      
      case 'press':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="mediaOutlet" className="form-label">Média*</label>
                <input
                  type="text"
                  id="mediaOutlet"
                  name="mediaOutlet"
                  className="form-input"
                  value={formData.mediaOutlet}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label htmlFor="pressCardNumber" className="form-label">Numéro de carte de presse*</label>
                <input
                  type="text"
                  id="pressCardNumber"
                  name="pressCardNumber"
                  className="form-input"
                  value={formData.pressCardNumber}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="coverageType" className="form-label">Type de couverture*</label>
              <select
                id="coverageType"
                name="coverageType"
                className="form-input"
                value={formData.coverageType}
                onChange={handleChange}
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
      
      case 'panelist':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="bio" className="form-label">Biographie (max. 300 mots)*</label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                className="form-input"
                value={formData.bio}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="expertise" className="form-label">Domaines d'expertise*</label>
              <input
                type="text"
                id="expertise"
                name="expertise"
                className="form-input"
                value={formData.expertise}
                onChange={handleChange}
                required
                placeholder="Ex: Santé publique, Innovation médicale, Politique de santé"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="speakingLanguages" className="form-label">Langues parlées*</label>
                <input
                  type="text"
                  id="speakingLanguages"
                  name="speakingLanguages"
                  className="form-input"
                  value={formData.speakingLanguages}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Français, Anglais, Arabe"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="previousParticipation"
                  name="previousParticipation"
                  className="h-5 w-5 rounded-md border-galien-secondary mr-2"
                  checked={formData.previousParticipation}
                  onChange={handleChange}
                />
                <label htmlFor="previousParticipation" className="form-label m-0">
                  J'ai déjà participé à une édition précédente du Forum Galien
                </label>
              </div>
            </div>
          </div>
        );
      
      case 'international':
        return (
          <div className="space-y-4">
            <div>
              <label htmlFor="bio" className="form-label">Biographie (max. 300 mots)*</label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                className="form-input"
                value={formData.bio}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <div>
              <label htmlFor="expertise" className="form-label">Domaines d'expertise*</label>
              <input
                type="text"
                id="expertise"
                name="expertise"
                className="form-input"
                value={formData.expertise}
                onChange={handleChange}
                required
                placeholder="Ex: Santé publique, Innovation médicale, Politique de santé"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="speakingLanguages" className="form-label">Langues parlées*</label>
                <input
                  type="text"
                  id="speakingLanguages"
                  name="speakingLanguages"
                  className="form-input"
                  value={formData.speakingLanguages}
                  onChange={handleChange}
                  required
                  placeholder="Ex: Français, Anglais, Arabe"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="previousParticipation"
                  name="previousParticipation"
                  className="h-5 w-5 rounded-md border-galien-secondary mr-2"
                  checked={formData.previousParticipation}
                  onChange={handleChange}
                />
                <label htmlFor="previousParticipation" className="form-label m-0">
                  J'ai déjà participé à une édition précédente du Forum Galien
                </label>
              </div>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderInternationalFields = () => (
    <div className="space-y-4">
      <div>
        <label htmlFor="flightDetails" className="form-label">Informations de vol (si connues)</label>
        <textarea
          id="flightDetails"
          name="flightDetails"
          rows={2}
          className="form-input"
          value={formData.flightDetails}
          onChange={handleChange}
          placeholder="Numéro de vol, date et heure d'arrivée"
        ></textarea>
      </div>
      
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="accommodationNeeded"
          name="accommodationNeeded"
          className="h-5 w-5 rounded-md border-galien-secondary mr-2"
          checked={formData.accommodationNeeded}
          onChange={handleChange}
        />
        <label htmlFor="accommodationNeeded" className="form-label m-0">
          J'ai besoin d'un hébergement
        </label>
      </div>
      
      {formData.accommodationNeeded && (
        <div>
          <label htmlFor="accommodationDates" className="form-label">Dates d'hébergement requises*</label>
          <input
            type="text"
            id="accommodationDates"
            name="accommodationDates"
            className="form-input"
            value={formData.accommodationDates}
            onChange={handleChange}
            placeholder="Ex: 14-18 novembre 2024"
            required={formData.accommodationNeeded}
          />
        </div>
      )}
      
      <div>
        <label htmlFor="dietaryRestrictions" className="form-label">Restrictions alimentaires ou besoins spécifiques</label>
        <input
          type="text"
          id="dietaryRestrictions"
          name="dietaryRestrictions"
          className="form-input"
          value={formData.dietaryRestrictions}
          onChange={handleChange}
          placeholder="Ex: Végétarien, allergies, etc."
        />
      </div>
    </div>
  );

  const renderTermsAndSubmit = () => (
    <div className="space-y-4">
      <div className="flex items-start mt-6">
        <input
          type="checkbox"
          id="agreeToTerms"
          name="agreeToTerms"
          className="h-5 w-5 rounded-md border-galien-secondary mt-1 mr-2"
          checked={formData.agreeToTerms}
          onChange={handleChange}
          required
        />
        <label htmlFor="agreeToTerms" className="text-sm text-gray-600">
          J'accepte les conditions d'utilisation et la politique de confidentialité du Forum Galien Afrique. 
          Je comprends que mes données personnelles seront utilisées uniquement dans le cadre de cet événement.*
        </label>
      </div>
      
      <div className="flex justify-between pt-6">
        {step > 1 && (
          <button
            type="button"
            className="px-6 py-2 border border-galien-blue text-galien-blue rounded-md transition-colors hover:bg-galien-blue/5"
            onClick={() => setStep(prev => prev - 1)}
          >
            Précédent
          </button>
        )}
        <button
          type="submit"
          className={`btn-primary ${(isSubmitting || (step === getMaxSteps() && !formData.agreeToTerms)) ? 'opacity-70 cursor-not-allowed' : ''}`}
          disabled={isSubmitting || (step === getMaxSteps() && !formData.agreeToTerms)}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Traitement en cours...
            </span>
          ) : step < getMaxSteps() ? (
            'Continuer'
          ) : (
            'Soumettre ma demande'
          )}
        </button>
      </div>
    </div>
  );

  if (isSuccess) {
    return (
      <div className="glass-card p-8 text-center bg-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-galien-blue">Inscription reçue avec succès !</h2>
          <p className="text-gray-600 max-w-md">
            Nous avons bien reçu votre demande d'inscription au Forum Galien Afrique. 
            Un email de confirmation a été envoyé à {formData.email}.
          </p>
          <p className="text-gray-600 mt-2">
            Votre demande sera examinée par notre équipe et vous recevrez une confirmation 
            avec votre badge personnalisé dans les plus brefs délais.
          </p>
          <div className="mt-8">
            <a href="/" className="btn-secondary">
              Retour à l'accueil
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-8 bg-white">
      <div className="mb-8">
        <h3 className="text-lg font-medium text-galien-blue mb-4">Type de participation</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
          <button
            type="button"
            className={`px-4 py-3 rounded-lg text-sm font-medium border transition-colors ${
              participantType === 'participant'
                ? 'border-galien-blue bg-galien-blue text-white'
                : 'border-galien-secondary text-galien-blue hover:bg-galien-secondary/30'
            }`}
            onClick={() => handleTypeChange('participant')}
          >
            Participant
          </button>
          <button
            type="button"
            className={`px-4 py-3 rounded-lg text-sm font-medium border transition-colors ${
              participantType === 'student'
                ? 'border-galien-blue bg-galien-blue text-white'
                : 'border-galien-secondary text-galien-blue hover:bg-galien-secondary/30'
            }`}
            onClick={() => handleTypeChange('student')}
          >
            Étudiant
          </button>
          <button
            type="button"
            className={`px-4 py-3 rounded-lg text-sm font-medium border transition-colors ${
              participantType === 'press'
                ? 'border-galien-blue bg-galien-blue text-white'
                : 'border-galien-secondary text-galien-blue hover:bg-galien-secondary/30'
            }`}
            onClick={() => handleTypeChange('press')}
          >
            Presse
          </button>
          <button
            type="button"
            className={`px-4 py-3 rounded-lg text-sm font-medium border transition-colors ${
              participantType === 'panelist'
                ? 'border-galien-blue bg-galien-blue text-white'
                : 'border-galien-secondary text-galien-blue hover:bg-galien-secondary/30'
            }`}
            onClick={() => handleTypeChange('panelist')}
          >
            Paneliste
          </button>
          <button
            type="button"
            className={`px-4 py-3 rounded-lg text-sm font-medium border transition-colors ${
              participantType === 'international'
                ? 'border-galien-blue bg-galien-blue text-white'
                : 'border-galien-secondary text-galien-blue hover:bg-galien-secondary/30'
            }`}
            onClick={() => handleTypeChange('international')}
          >
            Paneliste international
          </button>
        </div>
      </div>

      {getMaxSteps() > 1 && (
        <div className="mb-8">
          <div className="flex justify-between items-center">
            {Array.from({ length: getMaxSteps() }).map((_, index) => (
              <React.Fragment key={index}>
                <div className={`flex flex-col items-center ${index + 1 === step ? 'text-galien-blue' : 'text-gray-400'}`}>
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                      index + 1 === step
                        ? 'bg-galien-blue text-white'
                        : index + 1 < step
                          ? 'bg-green-100 text-green-600 border border-green-600'
                          : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {index + 1 < step ? (
                      <CheckCircle size={18} />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="text-xs mt-2">
                    {index === 0 
                      ? 'Informations personnelles' 
                      : index === 1 && participantType === 'international'
                        ? 'Informations supplémentaires'
                        : index === 1
                          ? 'Informations spécifiques'
                          : 'Prise en charge'}
                  </span>
                </div>
                {index < getMaxSteps() - 1 && (
                  <div 
                    className={`flex-1 h-1 mx-2 ${
                      index + 1 < step ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  ></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {step === 1 && renderPersonalInfoForm()}
        
        {step === 2 && participantType !== 'international' && renderSpecificFields()}
        
        {step === 2 && participantType === 'international' && renderSpecificFields()}
        
        {step === 3 && participantType === 'international' && renderInternationalFields()}
        
        {renderTermsAndSubmit()}
      </form>
    </div>
  );
};

export default RegisterForm;
