import * as React from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "../lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Checkbox } from "./ui/checkbox";

const PROVENANCE = ["national", "internationnal"];
const PRISE_EN_CHARGE = [
  { id: 1, label: "Billet d'avion" },
  { id: 2, label: "Hebergement" },
  { id: 3, label: "Aucune prise en charge" },
];

export function AddPresseForm({ className }: React.ComponentProps<"form">) {
  return (
    <form className={cn("grid items-start gap-4", className)}>
      <div className="grid gap-2">
        <Label htmlFor="prenom">Prénom</Label>
        <Input id="prenom" name="prenom" placeholder="Serigne" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="deuxiemeprenom">Deuxieme</Label>
        <Input id="deuxiemeprenom" name="deuxiemeprenom" placeholder="Cheikh" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="nom">Nom</Label>
        <Input id="nom" name="nom" placeholder="Kanteye" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">Lettre d'autorisation</Label>
        <Input id="autorisation" type="file" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="username">Email</Label>
        <Input id="email" type="email" placeholder="cheikh@gmail.com" />
      </div>
      <Select name="provenance">
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
      <h3 className="text-lg font-semibold">Prise en charge</h3>
      {PRISE_EN_CHARGE.map((p) => (
        <div className="flex items-center space-x-2">
          <Checkbox id="billet" />
          <label
            htmlFor="billet"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {p.label}
          </label>
        </div>
      ))}

      <Button type="submit">Ajouter</Button>
    </form>
  );
}
