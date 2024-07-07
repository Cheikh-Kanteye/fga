// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectPath?: string; // Optionnel: chemin de redirection personnalisé pour les utilisateurs non authentifiés
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectPath = "/connexion",
}) => {
  const auth = useAuth();

  if (!auth.isAuthenticated) {
    return <Navigate to={redirectPath} />;
  }

  return <>{children}</>; // Rendu des composants enfants protégés
};

export default ProtectedRoute;
