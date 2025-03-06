import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardOverview from "../components/dashboard/DashboardOverview";
import ParticipantsList from "../components/dashboard/ParticipantsList";
import PanelistsList from "../components/dashboard/PanelistsList";
import StudentsList from "../components/dashboard/StudentsList";
import PressList from "../components/dashboard/PressList";
import { useToast } from "@/hooks/use-toast";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const Dashboard: React.FC = () => {
  const { activeSection, setActiveSection } = useAuthRedirect();

  return (
    <main className="container-custom pt-4 h-screen overflow-hidden">
      <div className="flex flex-col md:flex-row gap-8">
        <DashboardSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        <div className="flex-1 h-screen hover:overflow-y-auto pb-10 scrollbar">
          {activeSection === "overview" && <DashboardOverview />}
          {activeSection === "participants" && <ParticipantsList />}
          {activeSection === "panelists" && <PanelistsList />}
          {activeSection === "students" && <StudentsList />}
          {activeSection === "press" && <PressList />}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
