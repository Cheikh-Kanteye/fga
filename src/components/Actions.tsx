import Badge from "./Badge";
import { useRef } from "react";
import { Button } from "./ui/button";
import { Row } from "@tanstack/react-table";
import { toPng } from "html-to-image";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "./ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

const BASE_URL = "http://51.77.215.159:8000/v3";

interface GenericType {
  id: number;
  enAttente: boolean;
  reference: string;
  isEtudiants?: boolean;
  isParticipants?: boolean;
  isSpeakers?: boolean;
}

interface ActionsProps<T> {
  row: Row<T>;
}

const Actions = <T extends GenericType>({ row }: ActionsProps<T>) => {
  const { user } = useAuth();
  const ref = useRef<HTMLDivElement>(null);
  const person = row.original;
  const enAttente = person.enAttente;
  const type = person.isEtudiants
    ? "etudiant"
    : person.isParticipants
    ? "participant"
    : "speakers";

  const confirmeRegistration = async () => {
    const badgeUrl = await toPng(ref?.current as HTMLElement);
    const badge = badgeUrl?.split(",")[1];
    const data = {
      reference: person?.reference,
      badge,
    };

    try {
      await axios.post(`${BASE_URL}/organisations/confirmation`, data, {
        headers: {
          Authorization: `token ${user?.token}`,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return enAttente ? (
    <div className="relative overflow-hidden">
      <div className="absolute top-0 left-0 -z-10">
        <Badge ref={ref} current={person} type={type} />
      </div>
      <Button onClick={confirmeRegistration}>Confirmer</Button>
    </div>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="ghost" className="w-8 h-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            alert("supprimer");
          }}
        >
          supprimer
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            alert("modifier");
          }}
        >
          modifier
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Actions;
