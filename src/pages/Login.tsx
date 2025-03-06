import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { useToast } from "@/hooks/use-toast";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulated login - in a real app, you would call an API
    setTimeout(() => {
      setIsLoading(false);

      // For demo purposes, let's hardcode admin and participant credentials
      if (email === "admin@example.com" && password === "password") {
        // Store the login state
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userRole", "admin");

        toast({
          title: "Connexion réussie",
          description: "Bienvenue dans votre espace administrateur.",
        });

        navigate("/dashboard");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-32 pb-20 bg-galien-bg">
        <div className="container-custom max-w-md">
          <div className="text-center mb-8">
            <div className="badge-primary inline-block mb-4">Connexion</div>
            <h1 className="heading-md mb-4">Accédez à votre espace</h1>
            <p className="text-gray-600">
              Connectez-vous pour accéder à votre espace administrateur.
            </p>
          </div>

          <div className="glass-card p-8 bg-white">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700">
                <p>{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div>
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="form-label">
                    Mot de passe
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-galien-blue hover:text-galien-gold"
                  >
                    Mot de passe oublié?
                  </Link>
                </div>
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Connexion...
                  </span>
                ) : (
                  "Se connecter"
                )}
              </button>
            </form>

            <div className="mt-8 text-center text-sm text-gray-600">
              <p>
                Pour l'accès à la démo: <br />
                <strong>Administrateur:</strong> admin@example.com / password{" "}
                <br />
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
