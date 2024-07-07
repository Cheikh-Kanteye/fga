"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Person } from "../assets/MOCK_DATA";
import { Button } from "./ui/button";
import { ArrowUpDown } from "lucide-react";
import { Checkbox } from "./ui/checkbox";
import Actions from "./Actions";

export const columns: ColumnDef<Person>[] = [
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => {
            column.toggleSorting(column.getIsSorted() === "asc");
          }}
        >
          <span className="mr-1">ID</span> <ArrowUpDown size={14} />
        </Button>
      );
    },
    accessorKey: "id",
  },
  {
    header: "Prénom",
    accessorKey: "prenom",
  },
  {
    header: "Deuxième Prénom",
    accessorKey: "deuxiemeprenom",
  },
  {
    header: "Nom",
    accessorKey: "nom",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Téléphone",
    accessorKey: "telephone",
  },
  {
    header: "Organe",
    accessorKey: "organePresse",
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
