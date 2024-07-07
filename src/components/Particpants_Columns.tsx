"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "./ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import { Participant } from "../assets/MOCK_DATA";
import Actions from "./Actions";

export const columns: ColumnDef<Participant>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        <span className="mr-1">ID</span> <ArrowUpDown size={14} />
      </Button>
    ),
    accessorKey: "id",
  },
  {
    header: "Civilite",
    accessorKey: "civilite",
  },
  {
    header: "Prenom",
    accessorKey: "prenom",
  },
  {
    header: "Nom",
    accessorKey: "nom",
  },
  {
    header: "Organisme",
    accessorKey: "organisme",
  },
  {
    header: "Fonction",
    accessorKey: "fonction",
  },
  {
    header: "Email 1",
    accessorKey: "email1",
  },
  {
    header: "Telephone",
    accessorKey: "telephone",
  },
  {
    header: "En Attente",
    accessorKey: "enAttente",
    cell: ({ row }) => (row.getValue("enAttente") ? "Oui" : "Non"),
  },
  {
    id: "actions",
    cell: (props) => <Actions {...props} />,
  },
];
