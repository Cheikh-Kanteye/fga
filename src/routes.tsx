import React from "react";
import { useRoutes, RouteObject } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Connexion from "./pages/Connexion";
import NotFound from "./components/NotFound";
import Administrateur from "./pages/Administrateur";
import Etudiants from "./pages/Etudiants";
import Organisation from "./pages/Organisation";
import Panelistes from "./pages/Panelistes";
import Presse from "./pages/Presse";
import Root from "./components/Root";
import Participants from "./pages/Particpants";
import ParticipantsDetails from "./pages/ParticipantsDetails";

const Routes: React.FC = () => {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Root />
        </ProtectedRoute>
      ),
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "admin", element: <Administrateur /> },
        { path: "etudiants", element: <Etudiants /> },
        { path: "organisation", element: <Organisation /> },
        { path: "panelistes", element: <Panelistes /> },
        { path: "participants", element: <Participants /> },
        { path: "presse", element: <Presse /> },
        {
          path: "details/:type/:id",
          element: <ParticipantsDetails />,
        },
      ],
    },
    { path: "connexion", element: <Connexion /> },
    { path: "*", element: <NotFound /> },
  ];

  const routing = useRoutes(routes);
  return routing;
};

export default Routes;
