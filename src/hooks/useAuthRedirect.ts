import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

export const useAuthRedirect = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("overview");

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";

    if (!loggedIn) {
      toast({
        title: "Accès non autorisé",
        description: "Veuillez vous connecter pour accéder au tableau de bord.",
        variant: "destructive",
      });
      navigate("/login");
    } else {
      setIsLoggedIn(true);
    }
  }, [navigate, toast]);

  return { activeSection, setActiveSection };
};
