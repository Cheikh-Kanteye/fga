import React, { useEffect } from "react";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardOverview from "../components/dashboard/DashboardOverview";
import ParticipantsList from "../components/dashboard/ParticipantsList";
import PanelistsList from "../components/dashboard/PanelistsList";
import StudentsList from "../components/dashboard/StudentsList";
import PressList from "../components/dashboard/PressList";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import { useSearchParams } from "react-router-dom";

const Dashboard: React.FC = () => {
  const { activeSection, setActiveSection } = useAuthRedirect();
  const [searchParams, setSearchParams] = useSearchParams();
  const slug = searchParams.get("slug") ?? "overview";

  useEffect(() => {
    setActiveSection(slug);
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <main className="container-custom pt-4 h-screen md:overflow-hidden">
      <div className="flex flex-col md:flex-row gap-8">
        <DashboardSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        <div className="flex-1 h-screen  md:hover:overflow-y-auto pb-10 scrollbar">
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
