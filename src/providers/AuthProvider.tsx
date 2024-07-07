import { createContext, useState, PropsWithChildren } from "react";
import axios from "axios";
import useLocalStorage from "../hooks/useLocalStorage";

export type User = {
  id?: number;
  username: string;
  first_name?: string;
  last_name?: string;
  is_guest?: boolean;
  is_administrateur?: boolean;
  is_secretaire?: boolean;
  token?: string;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

const BASE_URL = "http://51.77.215.159:8000/v3";

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem("authToken");
  });

  const [user, setUser] = useLocalStorage<User | null>("user", null);

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post(`${BASE_URL}/accounts/login/`, {
        username,
        password,
      });

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("authToken", data.token);
        setIsAuthenticated(true);
        setUser(data);
      } else {
        throw new Error(
          "Échec de la connexion. Veuillez vérifier vos identifiants."
        );
      }
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
