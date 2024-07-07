import { useFormik } from "formik";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { PhoneInput } from "./ui/phone-input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useState } from "react";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Checkbox } from "./ui/checkbox";
import { CountrySelect } from "./ui/CountrySelect";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useAuth } from "../hooks/useAuth";
import { Participant } from "../assets/MOCK_DATA";
import { generateReference } from "../utils";
import { useToast } from "./ui/use-toast";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { validationSchema } from "../schema/participants_schema";

const BASE_URL = "http://51.77.215.159:8000/v3";
const fileMaxSize = 2 * 1024 * 1024; // 2MB

const PROVENANCE = ["national", "international"];

const Require = () => <sup className="text-[14px] text-red-500">*</sup>;

interface APIError {
  response?: {
    data?: {
      [key: string]: string[];
    };
  };
}

const EditParticipantForm = ({
  type,
  participant,
}: {
  type: string;
  participant: Participant;
}) => {
  const isSpeakers = type === "speaker";
  const isEtudiants = type === "etudiant";
  const isParticipants = type === "participant";
  const [isPriseEnChargeBillet, setIsPriseEnChargeBillet] =
    useState<CheckedState>(false);
  const [provenance, setProvenance] = useState<
    "national" | "international" | string
  >(participant.provenance ?? "national"); // Default to 'national' if not provided

  const showPriseEnCharge = provenance === "international";
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (formData: Partial<Participant>) => {
      const token = user?.token;
      if (!token) {
        throw new Error("Token utilisateur non disponible.");
      }

      // Extract only the fields that have been changed
      const updatedData: Partial<Participant> = {
        ...formData,
        isEtudiants,
        isSpeakers,
        isParticipants,
        reference: generateReference(type.substring(0, 3)),
      };

      return axios.patch(
        `${BASE_URL}/organisations/allParticipants/${participant.id}/`,
        updatedData,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
    },
    onError: (error: AxiosError<APIError>) => {
      if (error.response?.data) {
        const { data } = error.response;
        const errorMessages = Object.values(data).flat();
        toast({
          variant: "destructive",
          title: "Erreur de validation",
          description: errorMessages.join(" "),
          className: "bg-white",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Oh non ! Une erreur est survenue.",
          description: "Il y a eu un problème avec votre demande.",
          className: "bg-white",
        });
      }
      console.log(error);
    },
    onSuccess: () => {
      toast({
        title: "Succès",
        description: "Organisateur modifié avec succès !",
        className: "bg-white",
      });
      queryClient.invalidateQueries({ queryKey: ["organisation"] });
    },
  });

  const formik = useFormik({
    initialValues: {
      civilite: participant.civilite || "M.",
      nom: participant.nom || "",
      prenom: participant.prenom || "",
      deuxiemeprenom: participant.deuxiemeprenom || "",
      organisme: participant.organisme || "",
      fonction: participant.fonction || "",
      email1: participant.email1 || "",
      email2: participant.email2 || "",
      telephone: participant.telephone || "",
      adresse: participant.adresse || "",
      ville: participant.ville || "",
      pays: participant.pays || "",
      provenance: participant.provenance || "national",
      forumDesJeunes: participant.forumDesFemmes || false,
      forumDesFemmes: participant.forumDesFemmes || false,
      forumScientifiques: participant.forumScientifiques || false,
      autreDocument: participant.autreDocument || false,
      lettreInvitation: participant.lettreInvitation || false,
      priseChargeBillet: participant.priseChargeBillet || false,
      priseChargeComplete: participant.priseChargeComplete || false,
      priseChargeHebergement: participant.priseChargeHebergement || false,
      reservationHotel: participant.reservationHotel || false,
      priseChargetransUrbain: participant.priseChargetransUrbain || false,
      autrePrecision: participant.autrePrecision || "",
      autrePrecisionCharge: participant.autrePrecisionCharge || "",
      dateDepart: participant.dateDepart || "2024-06-20",
      dateRetour: participant.dateRetour || "2024-06-20",
      villeDepart: participant.villeDepart || "",
      villeRetour: participant.villeRetour || "",
      passport: participant.passport || "null",
      biographie: participant.biographie || "",
      photo: participant.photo || "",
      isSpeakers: participant.isSpeakers,
      isParticipants: participant.isParticipants,
      isEtudiants: participant.isEtudiants,
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      mutation.mutate(values);
      resetForm();
    },
  });
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    maxSize: number,
    allowedTypes: string[],
    fieldName: string
  ): void => {
    const files = event.currentTarget.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (file.size > maxSize) {
        formik.setFieldError(
          fieldName,
          "Le fichier doit être inférieur à 2 Mo"
        );
      } else if (!allowedTypes.includes(file.type)) {
        formik.setFieldError(
          fieldName,
          "Le fichier doit être au format JPEG ou JPG"
        );
      } else {
        const objectUrl = URL.createObjectURL(file);
        formik.setFieldValue(fieldName, objectUrl);

        setTimeout(() => {
          URL.revokeObjectURL(objectUrl);
        }, 0);
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit(e);
      }}
      className="grid grid-cols-1 gap-4 md:grid-cols-2"
    >
      {/* Groupe 1 */}

      <div className="col-span-2">
        <Label htmlFor="civilite">
          Civilité
          <Require />
        </Label>
        <RadioGroup
          onValueChange={(v) => formik.setFieldValue("civilite", v)}
          name="civilite"
          className="flex"
          defaultValue="comfortable"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="M." id="r1" />
            <Label htmlFor="r1">M.</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Mme." id="r2" />
            <Label htmlFor="r2">Mme.</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Pr." id="r3" />
            <Label htmlFor="r3">Pr.</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Dr." id="r4" />
            <Label htmlFor="r4">Dr.</Label>
          </div>
        </RadioGroup>
        {formik.touched.civilite && formik.errors.civilite && (
          <small className="text-red-500">{formik.errors.civilite}</small>
        )}
      </div>

      <div>
        <Label htmlFor="prenom">
          Prénom
          <Require />
        </Label>
        <Input
          id="prenom"
          name="prenom"
          type="text"
          value={formik.values.prenom}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.prenom && formik.errors.prenom && (
          <small className="text-red-500">{formik.errors.prenom}</small>
        )}
      </div>

      <div>
        <Label htmlFor="deuxiemeprenom">Deuxième Prénom</Label>
        <Input
          id="deuxiemeprenom"
          name="deuxiemeprenom"
          type="text"
          value={formik.values.deuxiemeprenom}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.deuxiemeprenom && formik.errors.deuxiemeprenom && (
          <small className="text-red-500">{formik.errors.deuxiemeprenom}</small>
        )}
      </div>

      <div>
        <Label htmlFor="nom">
          Nom
          <Require />
        </Label>
        <Input
          id="nom"
          name="nom"
          type="text"
          value={formik.values.nom}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.nom && formik.errors.nom && (
          <small className="text-red-500">{formik.errors.nom}</small>
        )}
      </div>

      <div>
        <Label htmlFor="email1">
          Email Principal
          <Require />
        </Label>
        <Input
          id="email1"
          name="email1"
          type="email"
          value={formik.values.email1}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email1 && formik.errors.email1 && (
          <small className="text-red-500">{formik.errors.email1}</small>
        )}
      </div>

      <div>
        <Label htmlFor="email2">Deuxième Email</Label>
        <Input
          id="email2"
          name="email2"
          type="email"
          value={formik.values.email2}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email2 && formik.errors.email2 && (
          <small className="text-red-500">{formik.errors.email2}</small>
        )}
      </div>

      <div>
        <Label htmlFor="telephone">
          Téléphone
          <Require />
        </Label>
        <PhoneInput
          id="telephone"
          name="telephone"
          value={formik.values.telephone}
          onChange={(value) => formik.setFieldValue("telephone", value)}
          onBlur={formik.handleBlur}
        />
        {formik.touched.telephone && formik.errors.telephone && (
          <small className="text-red-500">{formik.errors.telephone}</small>
        )}
      </div>

      {/* Groupe 2 */}
      <div>
        <Label htmlFor="organisme">
          Organisme
          <Require />
        </Label>
        <Input
          id="organisme"
          name="organisme"
          type="text"
          value={formik.values.organisme}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.organisme && formik.errors.organisme && (
          <small className="text-red-500">{formik.errors.organisme}</small>
        )}
      </div>

      <div>
        <Label htmlFor="fonction">
          Fonction
          <Require />
        </Label>
        <Input
          id="fonction"
          name="fonction"
          type="text"
          value={formik.values.fonction}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.fonction && formik.errors.fonction && (
          <small className="text-red-500">{formik.errors.fonction}</small>
        )}
      </div>

      <div>
        <Label htmlFor="adresse">
          Adresse
          <Require />
        </Label>
        <Input
          id="adresse"
          name="adresse"
          type="text"
          value={formik.values.adresse}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.adresse && formik.errors.adresse && (
          <small className="text-red-500">{formik.errors.adresse}</small>
        )}
      </div>

      <div>
        <Label htmlFor="ville">
          Ville
          <Require />
        </Label>
        <Input
          id="ville"
          name="ville"
          type="text"
          value={formik.values.ville}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        {formik.touched.ville && formik.errors.ville && (
          <small className="text-red-500">{formik.errors.ville}</small>
        )}
      </div>

      <div>
        <Label htmlFor="pays">
          Pays
          <Require />
        </Label>
        <CountrySelect
          name="pays"
          value={formik.values.pays}
          onValueChange={(v) => {
            formik.setFieldValue("pays", v);
          }}
        />
      </div>

      {/* Provenance */}
      <div>
        <Label htmlFor="provenance">
          Provenance
          <Require />
        </Label>
        <Select
          name="provenance"
          value={formik.values.provenance}
          onValueChange={(v) => {
            formik.setFieldValue("provenance", v);
            setProvenance(v);
          }}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={"Choisir votre provenance"} />
          </SelectTrigger>
          <SelectContent id="provenance">
            {PROVENANCE.map((item, i) => (
              <SelectItem key={i} value={item} className="capitalize">
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Biographie */}
      {isSpeakers && (
        <>
          <div className="col-span-2">
            <Label htmlFor="biographie">
              Biographie
              <Require />
            </Label>
            <Textarea
              id="biographie"
              name="biographie"
              value={formik.values.biographie}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.biographie && formik.errors.biographie && (
              <small className="text-red-500">{formik.errors.biographie}</small>
            )}
          </div>

          {/* Photo speaker */}
          <div className="col-span-2">
            <Label htmlFor="photo">
              Photo
              <Require />
            </Label>
            <Input
              id="photo"
              name="photo"
              type="file"
              accept=".jpeg,.jpg"
              onChange={(event) =>
                handleFileChange(
                  event,
                  fileMaxSize,
                  ["image/jpeg", "image/jpg"],
                  "photo"
                )
              }
              onBlur={formik.handleBlur}
            />
            {formik.touched.photo && formik.errors.photo && (
              <small className="text-red-500">{formik.errors.photo}</small>
            )}
          </div>
        </>
      )}

      {/* Forums */}
      <div className="flex flex-col gap-2">
        <h4>
          Forums
          <Require />
        </h4>
        <div className="flex items-center space-x-4">
          <Checkbox
            id="forumDesJeunes"
            name="forumDesJeunes"
            checked={formik.values.forumDesJeunes}
            onCheckedChange={(v) => {
              formik.setFieldValue("forumDesJeunes", v);
            }}
            onBlur={formik.handleBlur}
            className="w-4 h-4 text-white"
          />
          <Label htmlFor="forumDesJeunes">Jeunes</Label>
        </div>

        <div className="flex items-center space-x-4">
          <Checkbox
            className="w-4 h-4 text-white"
            id="forumDesFemmes"
            name="forumDesFemmes"
            checked={formik.values.forumDesFemmes}
            onCheckedChange={(v) => {
              formik.setFieldValue("forumDesFemmes", v);
            }}
            onBlur={formik.handleBlur}
          />
          <Label htmlFor="forumDesFemmes">Femmes</Label>
        </div>

        <div className="flex items-center space-x-4">
          <Checkbox
            className="w-4 h-4 text-white"
            id="forumScientifiques"
            name="forumScientifiques"
            checked={formik.values.forumScientifiques}
            onCheckedChange={(v) => {
              formik.setFieldValue("forumScientifiques", v);
            }}
          />
          <Label htmlFor="forumScientifiques">Scientifiques</Label>
        </div>
      </div>

      {/* Documents */}
      <div className="flex flex-col gap-2">
        <h4>Documents</h4>
        <div className="flex items-center space-x-4">
          <Checkbox
            className="w-4 h-4 text-white"
            id="autreDocument"
            name="autreDocument"
            checked={formik.values.autreDocument}
            onCheckedChange={(v) => {
              formik.setFieldValue("autreDocument", v);
            }}
            onBlur={formik.handleBlur}
          />
          <Label htmlFor="autreDocument">Autre Document</Label>
        </div>

        <div className="flex items-center space-x-4">
          <Checkbox
            className="w-4 h-4 text-white"
            id="lettreInvitation"
            name="lettreInvitation"
            checked={formik.values.lettreInvitation}
            onCheckedChange={(v) => {
              formik.setFieldValue("lettreInvitation", v);
            }}
            onBlur={formik.handleBlur}
          />
          <Label htmlFor="lettreInvitation">Lettre d'Invitation</Label>
        </div>
      </div>

      {/* Autre precision */}
      <div className="col-span-2">
        <Label htmlFor="autrePrecision">Autre Précision</Label>
        <Textarea
          id="autrePrecision"
          name="autrePrecision"
          value={formik.values.autrePrecision}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
      </div>

      {/* Groupe 3 */}
      {/* Prise en charge */}
      {showPriseEnCharge && (
        <>
          <div className="flex flex-col gap-2 col-span-2">
            <h4>Prise en charge</h4>
            <div className="flex items-center space-x-4">
              <Checkbox
                className="w-4 h-4 text-white"
                id="priseChargeBillet"
                name="priseChargeBillet"
                checked={formik.values.priseChargeBillet}
                onCheckedChange={(v) => {
                  setIsPriseEnChargeBillet(v);
                  formik.setFieldValue("priseChargeBillet", v);
                }}
                onBlur={formik.handleBlur}
              />
              <Label htmlFor="priseChargeBillet">
                Prise en Charge du Billet
              </Label>
            </div>

            <div className="flex items-center space-x-4">
              <Checkbox
                className="w-4 h-4 text-white"
                id="priseChargeComplete"
                name="priseChargeComplete"
                checked={formik.values.priseChargeComplete}
                onCheckedChange={(v) => {
                  formik.setFieldValue("priseChargeComplete", v);
                }}
                onBlur={formik.handleBlur}
              />
              <Label htmlFor="priseChargeComplete">Complète</Label>
            </div>

            <div className="flex items-center space-x-4">
              <Checkbox
                className="w-4 h-4 text-white"
                id="priseChargeHebergement"
                checked={formik.values.priseChargeHebergement}
                name="priseChargeHebergement"
                onCheckedChange={(v) => {
                  formik.setFieldValue("priseChargeHebergement", v);
                }}
                onBlur={formik.handleBlur}
              />
              <Label htmlFor="priseChargeHebergement">Hébergement</Label>
            </div>

            {(isSpeakers || isEtudiants) && (
              <div className="flex items-center space-x-4">
                <Checkbox
                  className="w-4 h-4"
                  id="priseChargetransUrbain"
                  name="priseChargetransUrbain"
                  checked={formik.values.priseChargetransUrbain}
                  onCheckedChange={(v) => {
                    formik.setFieldValue("priseChargetransUrbain", v);
                  }}
                  onBlur={formik.handleBlur}
                />
                <Label htmlFor="priseChargetransUrbain">
                  Transports Urbains
                </Label>
              </div>
            )}
          </div>

          {isPriseEnChargeBillet && (
            <>
              <div>
                <Label htmlFor="dateDepart">
                  Date de Départ
                  <Require />
                </Label>
                <Input
                  id="dateDepart"
                  name="dateDepart"
                  type="date"
                  value={formik.values.dateDepart}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.dateDepart && formik.errors.dateDepart && (
                  <small className="text-red-500">
                    {formik.errors.dateDepart}
                  </small>
                )}
              </div>

              <div>
                <Label htmlFor="dateRetour">
                  Date de Retour
                  <Require />
                </Label>
                <Input
                  id="dateRetour"
                  name="dateRetour"
                  type="date"
                  value={formik.values.dateRetour}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.dateRetour && formik.errors.dateRetour && (
                  <small className="text-red-500">
                    {formik.errors.dateRetour}
                  </small>
                )}
              </div>

              <div>
                <Label htmlFor="villeDepart">
                  Ville de Départ
                  <Require />
                </Label>
                <Input
                  id="villeDepart"
                  name="villeDepart"
                  type="text"
                  value={formik.values.villeDepart}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.villeDepart && formik.errors.villeDepart && (
                  <small className="text-red-500">
                    {formik.errors.villeDepart}
                  </small>
                )}
              </div>

              <div>
                <Label htmlFor="villeRetour">
                  Ville de Retour
                  <Require />
                </Label>
                <Input
                  id="villeRetour"
                  name="villeRetour"
                  type="text"
                  value={formik.values.villeRetour}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.villeRetour && formik.errors.villeRetour && (
                  <small className="text-red-500">
                    {formik.errors.villeRetour}
                  </small>
                )}
              </div>

              <div className="col-span-2">
                <Label htmlFor="passport">
                  Copie du Passeport
                  <Require />
                </Label>
                <Input
                  id="passport"
                  name="passport"
                  type="file"
                  accept=".jpeg,.jpg"
                  onChange={(event) =>
                    handleFileChange(
                      event,
                      fileMaxSize,
                      ["image/jpeg", "image/jpg"],
                      "passport"
                    )
                  }
                  onBlur={formik.handleBlur}
                />
                {formik.touched.passport && formik.errors.passport && (
                  <small className="text-red-500">
                    {formik.errors.passport}
                  </small>
                )}
              </div>
            </>
          )}

          <div className="col-span-2">
            <Label htmlFor="autrePrecisionCharge">
              Autre Précision sur la prise en Charge
            </Label>
            <Textarea
              id="autrePrecisionCharge"
              name="autrePrecisionCharge"
              value={formik.values.autrePrecisionCharge}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </>
      )}

      <div className="col-span-2">
        <Button className="w-full" disabled={mutation.isPending} type="submit">
          Soumettre
        </Button>
      </div>
    </form>
  );
};

export default EditParticipantForm;
