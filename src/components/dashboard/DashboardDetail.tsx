import DashboardSidebar from "./DashboardSidebar";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";
import ParticipantDetails from "./PartcipantDetails";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Participant } from "@/types";
import { AlertCircle, CheckCircle, ChevronLeft, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  initialPanelists,
  initialParticipants,
  initialPress,
  initialStudents,
} from "@/lib/dummy";

const DashboardDetail = () => {
  const { activeSection, setActiveSection } = useAuthRedirect();
  const { slug, id } = useParams<{ slug: string; id: string }>();
  const navigate = useNavigate();
  const [participant, setParticipant] = useState<Participant | undefined>();
  const [data, setData] = useState<Participant[] | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "text-green-600 bg-green-50";
      case "rejected":
        return "text-red-600 bg-red-50";
      default:
        return "text-amber-600 bg-amber-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5" />;
      case "rejected":
        return <XCircle className="h-5 w-5" />;
      default:
        return <AlertCircle className="h-5 w-5" />;
    }
  };

  useEffect(() => {
    if (slug === "participants") {
      setData(initialParticipants);
    } else if (slug === "panelists") {
      setData(initialPanelists);
    } else if (slug === "students") {
      setData(initialStudents);
    } else if (slug === "press") {
      setData(initialPress);
    }
  }, [slug]);

  useEffect(() => {
    if (id && data) {
      const foundParticipant = data.find((p) => p.id === id);
      setParticipant(foundParticipant);
    }
  }, [id, data]);

  return (
    <main className="container-custom pt-4 h-screen md:overflow-hidden">
      <div className="flex flex-col md:flex-row gap-8">
        <DashboardSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />

        {participant ? (
          <>
            {" "}
            <div className="flex-1 md:h-screen md:hover:overflow-y-auto pb-10 scrollbar">
              <div className="min-h-screen bg-[#FFFFFF] pb-12">
                {/* Header */}
                <header className="bg-[#F6F7FB] text-galien-blue border-b border-gray-100">
                  <div className="container mx-auto px-4 py-8">
                    <Link
                      to={`/dashboard?slug=${slug}`}
                      className="text-galien-blue p-0 mb-4 capitalize flex items-center hover:text-blue-600 transition-colors"
                      onClick={() => navigate(-1)}
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Back to {slug}
                      {slug.endsWith("s") ? "" : "s"}
                    </Link>

                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="space-y-1 animate-fade-in">
                        <div className="text-sm font-medium text-gray-500 capitalize">
                          {slug} Details
                        </div>
                        <h1 className="text-3xl md:text-4xl font-display font-bold">
                          {participant.firstName} {participant.lastName}
                        </h1>
                      </div>

                      <div
                        className="flex items-center space-x-2 animate-fade-in"
                        style={{ animationDelay: "100ms" }}
                      >
                        <div
                          className={cn(
                            "flex items-center px-3 py-1 rounded-full text-sm font-medium",
                            getStatusColor(participant.status)
                          )}
                        >
                          {getStatusIcon(participant.status)}
                          <span className="ml-2">
                            {participant.status.charAt(0).toUpperCase() +
                              participant.status.slice(1)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </header>

                <ParticipantDetails participant={participant} />
              </div>
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
};

export default DashboardDetail;
