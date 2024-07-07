import { useContext } from "react";
import { AuthContext } from "./../providers/AuthProvider";
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth doit être utilisé à l'intérieur d'AuthProvider");
  }
  return context;
};
