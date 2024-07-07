import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import InitialsAvatar from "react-initials-avatar";
import { MdAdminPanelSettings } from "react-icons/md";
import { HiViewGrid } from "react-icons/hi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { GiPublicSpeaker } from "react-icons/gi";
import { PiStudentBold } from "react-icons/pi";
import { FaNewspaper } from "react-icons/fa6";
import { BsFillPeopleFill } from "react-icons/bs";
import { LogOut } from "lucide-react";

import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useAuth } from "../hooks/useAuth"; // Importer useAuth et AuthContextType depuis "../hooks/useAuth"
import { IconType } from "react-icons/lib";

import logo from "../assets/images/logo.png";

interface MenuItem {
  id: number;
  path: string;
  label: string;
  Icon: IconType;
  secured?: boolean;
}

const MENU: MenuItem[] = [
  { id: 1, path: "dashboard", label: "Dashboard", Icon: HiViewGrid },
  {
    id: 2,
    path: "admin",
    label: "Administrateur",
    Icon: MdAdminPanelSettings,
    secured: true,
  },
  { id: 3, path: "organisation", label: "Organisation", Icon: HiMiniUserGroup },
  { id: 4, path: "etudiants", label: "Etudiants", Icon: PiStudentBold },
  { id: 5, path: "panelistes", label: "Panelistes", Icon: GiPublicSpeaker },
  {
    id: 6,
    path: "participants",
    label: "Participants",
    Icon: BsFillPeopleFill,
  },
  { id: 7, path: "presse", label: "Presse", Icon: FaNewspaper },
];

const Root = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Utiliser useAuth pour accéder à user et logout

  if (location.pathname === "/") navigate("/dashboard");

  const activeClasse = (path: string) => {
    if (location.pathname === "/" && path === "dashboard")
      return "bg-[#0a172f]";
    else
      return location.pathname.replace("/", "") === path ? "bg-[#0a172f]" : "";
  };

  return (
    <main className="flex h-dvh overflow-hidden">
      <aside
        className="flex flex-col gap-6 px-4 py-6 max-w-[230px]
                  bg-primary w-full text-white"
      >
        <Link to="/" className="flex justify-center items-center w-full">
          <img src={logo} className="w-24 h-auto" alt="logo" />
        </Link>
        <nav className="flex-1">
          <ul className="grid gap-2">
            {MENU.map((mn) => {
              const { Icon } = mn;
              if (mn.secured && user?.is_administrateur)
                return (
                  <li
                    onClick={() => navigate(`/${mn.path}`)}
                    key={mn.id}
                    className={`p-2 cursor-pointer transition-all duration-300 text-lg flex gap-1.5 items-center
                          hover:bg-[#0c0631] lg:hover:px-4 rounded-[6px] ${activeClasse(
                            mn.path
                          )}`}
                  >
                    <Icon size={24} />
                    <span>{mn.label}</span>
                  </li>
                );

              return (
                <li
                  onClick={() => navigate(`/${mn.path}`)}
                  key={mn.id}
                  className={`p-2 cursor-pointer transition-all duration-300 text-lg flex gap-1.5 items-center
                          hover:bg-[#0c0631] lg:hover:px-4 rounded-[6px] ${activeClasse(
                            mn.path
                          )}`}
                >
                  <Icon size={24} />
                  <span>{mn.label}</span>
                </li>
              );
            })}
          </ul>
        </nav>
        <Button className="h-16 bg-[#0c0631] justify-start gap-2">
          <Avatar>
            <AvatarFallback className="bg-[#ac9d1932] text-[#ac9d19]">
              <InitialsAvatar name={`${user?.first_name} ${user?.last_name}`} />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-start text-[#ac9d19]">
            <span>
              {user?.first_name && user?.last_name
                ? `${user?.first_name} ${user?.last_name}`
                : user?.username}
            </span>
            <span className="self-start">
              {user?.is_administrateur && "Admin"}
              {user?.is_secretaire && "Secrétaire"}
              {user?.is_guest && "Invité"}
            </span>
          </div>
        </Button>
        <Button
          className="justify-start items-center gap-1.5 bg-[#0c0631]"
          onClick={logout}
        >
          <LogOut size={24} />{" "}
          <span className="text-lg font-normal">Déconnecter</span>
        </Button>
      </aside>
      <section className="flex-1 bg-slate-50 px-4 overflow-y-auto">
        <Outlet />
      </section>
    </main>
  );
};

export default Root;
