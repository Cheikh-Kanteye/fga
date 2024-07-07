import * as React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { cn } from "../lib/utils";
import { PhoneInput } from "./ui/phone-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ToastAction } from "./ui/toast";
import { useToast } from "./ui/use-toast";
import { useAuth } from "../hooks/useAuth";

const BASE_URL = "http://51.77.215.159:8000/v3";

const COMMISSION = [
  "scientifique",
  "logistique",
  "communication",
  "secretariat",
  "equipe technique",
  "interpretes",
];

const validationSchema = Yup.object().shape({
  prenom: Yup.string().required("Prénom est requis"),
  deuxiemeprenom: Yup.string(),
  nom: Yup.string().required("Nom est requis"),
  email: Yup.string()
    .email("Adresse email invalide")
    .required("Email est requis"),
  telephone: Yup.string().required("Téléphone est requis"),
  commission: Yup.string().required("Commission est requise"),
});

interface FormValues {
  prenom: string;
  deuxiemeprenom: string;
  nom: string;
  email: string;
  telephone: string;
  commission: string;
  reference?: string;
}

interface APIError {
  response?: {
    data?: {
      [key: string]: string[];
    };
  };
}

export function AddOrganisateurForm({
  className,
}: React.ComponentProps<"form">) {
  const { toast } = useToast();
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const generateReference = (): string => {
    return `ORG-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
  };

  const mutation = useMutation({
    mutationFn: (newOrganisateur: FormValues) =>
      axios.post(`${BASE_URL}/organisations/organisations/`, newOrganisateur, {
        headers: {
          Authorization: `token ${user?.token}`,
        },
      }),
    onError: (error: AxiosError<APIError>) => {
      if (error.response?.data) {
        const { data } = error.response;
        const errorMessages = Object.values(data).flat();
        toast({
          variant: "destructive",
          title: "Erreur de validation",
          description: errorMessages.join(" "),
          action: <ToastAction altText="Réessayer">Réessayer</ToastAction>,
          className: "bg-white",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Oh non ! Une erreur est survenue.",
          description: "Il y a eu un problème avec votre demande.",
          action: <ToastAction altText="Réessayer">Réessayer</ToastAction>,
          className: "bg-white",
        });
      }
      console.log(error);
    },
    onSuccess: () => {
      toast({
        title: "Succès",
        description: "Organisateur ajouté avec succès !",
        className: "bg-white",
      });
      queryClient.invalidateQueries({ queryKey: ["organisations"] });
      formik.resetForm(); // Réinitialiser le formulaire
    },
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      prenom: "",
      deuxiemeprenom: "",
      nom: "",
      email: "",
      telephone: "",
      commission: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const newValues = { ...values, reference: generateReference() };
      mutation.mutate(newValues);
    },
  });

  const getInputClassName = (field: keyof FormValues): string => {
    return cn({
      "border-red-500": formik.touched[field] && formik.errors[field],
      "border-green-500": formik.touched[field] && !formik.errors[field],
    });
  };

  return (
    <form
      className={cn("grid items-start gap-2", className)}
      onSubmit={formik.handleSubmit}
    >
      <div className="grid gap-2">
        <Label htmlFor="prenom">Prénom</Label>
        <Input
          id="prenom"
          name="prenom"
          type="text"
          placeholder="Serigne"
          className={getInputClassName("prenom")}
          value={formik.values.prenom}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.prenom && formik.errors.prenom && (
          <small className="text-red-500">{formik.errors.prenom}</small>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="deuxiemeprenom">Deuxième Prénom</Label>
        <Input
          id="deuxiemeprenom"
          name="deuxiemeprenom"
          defaultValue={" "}
          type="text"
          placeholder="Saliou"
          className={getInputClassName("deuxiemeprenom")}
          value={formik.values.deuxiemeprenom}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="nom">Nom</Label>
        <Input
          id="nom"
          name="nom"
          type="text"
          placeholder="Seck"
          className={getInputClassName("nom")}
          value={formik.values.nom}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.nom && formik.errors.nom && (
          <small className="text-red-500">{formik.errors.nom}</small>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="saliouseck@gmail.com"
          className={getInputClassName("email")}
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email && (
          <small className="text-red-500">{formik.errors.email}</small>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="telephone">Téléphone</Label>
        <PhoneInput
          id="telephone"
          name="telephone"
          placeholder="77 000 00 00"
          className={getInputClassName("telephone")}
          value={formik.values.telephone}
          onChange={(value) => formik.setFieldValue("telephone", value)}
          onBlur={formik.handleBlur}
        />
        {formik.touched.telephone && formik.errors.telephone && (
          <small className="text-red-500">{formik.errors.telephone}</small>
        )}
      </div>
      <div className="grid gap-2">
        <Label htmlFor="commission">Commission</Label>
        <Select
          name="commission"
          value={formik.values.commission}
          onValueChange={(value) => formik.setFieldValue("commission", value)}
        >
          <SelectTrigger
            className={`w-full ${getInputClassName("commission")}`}
          >
            <SelectValue placeholder="Commission" />
          </SelectTrigger>
          <SelectContent>
            {COMMISSION.map((item, i) => (
              <SelectItem key={i} value={item} className="capitalize">
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {formik.touched.commission && formik.errors.commission && (
          <small className="text-red-500">{formik.errors.commission}</small>
        )}
      </div>
      <Button type="submit">Ajouter</Button>
    </form>
  );
}
