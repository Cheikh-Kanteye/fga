import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home,
  Users,
  Calendar,
  FileText,
  Settings,
  User,
  LogOut,
  GraduationCap,
  Newspaper,
  Menu,
  X,
} from "lucide-react";

interface DashboardSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({
  activeSection,
  onSectionChange,
}) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  const menuItems = [
    { id: "overview", label: "Vue d'ensemble", icon: Home },
    { id: "participants", label: "Participants", icon: Users },
    { id: "panelists", label: "Panélistes", icon: User },
    { id: "students", label: "Étudiants", icon: GraduationCap },
    { id: "press", label: "Presse", icon: Newspaper },
    { id: "program", label: "Programme", icon: Calendar },
    { id: "documents", label: "Documents", icon: FileText },
    { id: "settings", label: "Paramètres", icon: Settings },
  ];

  return (
    <>
      {/* Mobile Header with hamburger toggle */}
      <div className="md:hidden p-4 bg-white shadow">
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Overlay for mobile sidebar */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${
          sidebarOpen ? "block" : "hidden"
        } md:hidden`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full min-w-[150px] bg-white rounded-lg shadow-lg z-50 transform transition-transform duration-300
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:static md:block`}
      >
        <div className="p-4 border-b border-gray-100">
          <div className="text-lg font-bold text-galien-blue">
            Admin Dashboard
          </div>
          <div className="text-sm text-gray-500">
            Tableau de bord administrateur
          </div>
        </div>

        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => {
                    onSectionChange(item.id);
                    setSidebarOpen(false); // close sidebar on mobile
                  }}
                  className={`w-full flex items-center py-2 px-3 rounded-md transition-colors ${
                    activeSection === item.id
                      ? "bg-galien-secondary/50 text-galien-blue font-medium"
                      : "text-gray-700 hover:bg-galien-secondary/30"
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}

            <li className="pt-4 border-t border-gray-100 mt-4">
              <button
                onClick={handleLogout}
                className="w-full flex items-center py-2 px-3 rounded-md text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-5 w-5 mr-3" />
                <span>Déconnexion</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default DashboardSidebar;
