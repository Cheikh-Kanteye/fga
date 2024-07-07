import * as React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { cn } from "../lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { PhoneInput } from "./ui/phone-input";
import CountrySelector from "./ui/country-input";

const PROVENANCE = ["national", "internationnal"];
const PRISE_EN_CHARGE = [
  { id: "billet", label: "Billet d'avion" },
  { id: "hebergement", label: "Hebergement" },
  { id: "aucune_p_charge", label: "Aucune prise en charge" },
];
const FORUMS = [
  { id: "jeunes", label: "Jeunes" },
  { id: "femmes", label: "Femmes" },
  { id: "science", label: "Scientifiques" },
];

export function AddEtudiantForm({ className }: React.ComponentProps<"form">) {
  const [provenance, setProvenance] = React.useState("national");
  // const [chargeBillet, setChargeBillet] = React.useState(false);
  const isIntl = provenance != "national";
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid md:grid-cols-2 gap-2">
        <Input id="prenom" name="prenom" placeholder="Prenom" />
        <Input
          id="deuxiemeprenom"
          name="deuxiemeprenom"
          placeholder="Deuxieme prenom"
        />
        <Input id="nom" name="nom" placeholder="Nom" />
        <Input id="email1" placeholder="Email 1" type="email" />
        <Input id="email2" placeholder="Email 2" type="email" />
        <PhoneInput placeholder="Telephone" />
        <Input id="organisme" placeholder="Organisme" />
        <Input id="fonction" placeholder="Fonction" />
        <Input id="addresse" placeholder="Addresse" />
        <Input id="ville" placeholder="Ville" />
        <CountrySelector />
        <Select onValueChange={setProvenance}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Provenance" />
          </SelectTrigger>
          <SelectContent>
            {PROVENANCE.map((item, i) => (
              <SelectItem key={i} value={item} className="capitalize">
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <h3 className="text-lg font-semibold">Documents</h3>
        <div className="flex items-center space-x-2">
          <Checkbox id={"lettre"} />
          <label
            htmlFor={"lettre"}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Lettre d'invitation
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox id={"autres"} />
          <label
            htmlFor={"autres"}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Autres documents
          </label>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <h3 className="text-lg font-semibold">Forums</h3>
          {FORUMS.map((p) => (
            <div key={p.id} className="flex items-center space-x-2">
              <Checkbox id={p.id} />
              <label
                htmlFor={p.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {p.label}
              </label>
            </div>
          ))}
        </div>

        {isIntl && (
          <div className="grid gap-2">
            <h3 className="text-lg font-semibold">Prise en charge</h3>
            {PRISE_EN_CHARGE.map((p) => (
              <div key={p.id} className="flex items-center space-x-2">
                <Checkbox id={p.id} onChange={() => console.log(p.id)} />
                <label
                  htmlFor={p.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {p.label}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <Button type="submit">Ajouter</Button>
    </form>
  );
}
