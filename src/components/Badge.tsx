import { forwardRef } from "react";
import QRCode from "react-qr-code";
import logo from "../assets/images/logo.png";

interface BadgeProps {
  current: {
    reference?: string;
    civilite?: string;
    prenom?: string;
    nom?: string;
    fonction?: string;
    commission?: string;
    organisme?: string;
  };
  type:
    | "participant"
    | "speaker"
    | "etudiant"
    | "organisation"
    | "presse"
    | string;
}

const Badge = forwardRef<HTMLDivElement, BadgeProps>(
  ({ current, type }, ref) => {
    const bg =
      type === "participant"
        ? "#0453e7"
        : type === "speaker"
        ? "#249b03"
        : type === "etudiant"
        ? "#04a29a"
        : type === "organisation"
        ? "#d7410a"
        : "#e2ea43";

    const fg = type === "presse" ? "#070c1c" : "#fff";

    return (
      <div
        ref={ref}
        className="bg-white rounded-lg h-fit justify-end shadow-sm overflow-hidden"
        style={{ width: 300 }}
      >
        <div className="w-full h-60 relative">
          <div
            className="absolute"
            style={{
              width: 300,
              height: 300,
              top: -150,
            }}
          >
            <div
              style={{ left: -40 }}
              className="w-full z-0 absolute top-0 h-full rounded-3xl bg-secondary rotate-45"
            />
            <div
              style={{ right: -40 }}
              className="w-full z-0 absolute top-0 h-full rounded-3xl bg-secondary rotate-45"
            />
            <div className="w-full h-full rounded-3xl bg-primary rotate-45" />
          </div>
          <div className="absolute z-50 left-1/2 -translate-x-1/2 gap-3 flex flex-col justify-center items-center">
            <img src={logo} style={{ width: 150, padding: 20 }} />
            <div
              style={{ width: 110, height: 110 }}
              className="shadow-sm rounded-lg flex items-center justify-center bg-white"
            >
              <QRCode className="w-24 h-24" value={current?.reference ?? ""} />
            </div>
          </div>
        </div>

        <div className="h-fit">
          <div className="flex flex-col p-3 h-28 text-center justify-center items-center">
            <h1 className="text-lg uppercase font-semibold text-primary">
              {(current?.civilite ? current?.civilite : "") +
                " " +
                current?.prenom +
                " " +
                current?.nom}
            </h1>
            {(current?.fonction || current?.commission) && (
              <p className="text-sm text-center uppercase text-slate-600">
                {type !== "organisation"
                  ? current?.fonction
                  : "commission " + current?.commission}
              </p>
            )}
            {current?.organisme && (
              <p className="text-sm text-center uppercase text-slate-600">
                {current?.organisme}
              </p>
            )}
          </div>
          <div
            style={{ background: bg }}
            className="py-2 grid place-items-center"
          >
            <h1
              style={{ textTransform: "uppercase", color: fg }}
              className="text-2xl font-bold"
            >
              {type}
            </h1>
          </div>
        </div>
      </div>
    );
  }
);

export default Badge;
