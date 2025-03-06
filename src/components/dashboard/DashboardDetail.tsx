import DashboardSidebar from "./DashboardSidebar";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import ParticipantDetails from "./PartcipantDetails";

const DashboardDetail = () => {
  const { activeSection, setActiveSection } = useAuthRedirect();

  return (
    <main className="container-custom pt-4 h-screen overflow-hidden">
      <div className="flex flex-col md:flex-row gap-8">
        <DashboardSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        <div className="flex-1 h-screen hover:overflow-y-auto pb-10 scrollbar">
          <ParticipantDetails />
        </div>
      </div>
    </main>
  );
};

export default DashboardDetail;
