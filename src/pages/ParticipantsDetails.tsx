import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { useParams } from "react-router-dom";
import Badge from "../components/Badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { HTMLAttributes, useState } from "react";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import PDFViewer from "../components/PDfViewer";
import filetest from "../assets/filetest.pdf";
import { DrawerDialog } from "../components/AddForm";
import EditParticipantForm from "../components/EditParticipant";
import { Participant } from "../assets/MOCK_DATA";

const BASE_URL = "http://51.77.215.159:8000/v3";

interface CardItemProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  title?: string;
}

const CardItem = ({ label, title, ...props }: CardItemProps) => {
  return (
    title && (
      <div {...props}>
        <p className="text-sm text-muted-foreground capitalize">{label}</p>
        <p className="text-lg font-medium leading-none capitalize">{title}</p>
      </div>
    )
  );
};

const ParticipantsDetails = () => {
  const [viewPdf, setViewPdf] = useState(false);
  const { user } = useAuth();
  const { id, type } = useParams<{ id: string; type: string }>();
  const endPoint =
    type === "presses"
      ? type
      : type === "organisations"
      ? type
      : "allParticipants";

  const fetchData = async () => {
    const { data } = await axios.get(
      `${BASE_URL}/organisations/${endPoint}/${id}/`,
      {
        headers: {
          Authorization: `token ${user?.token}`,
        },
      }
    );

    return data;
  };

  const { isLoading, data } = useQuery({
    queryKey: ["organisation", id],
    queryFn: fetchData,
  });

  if (isLoading) return <div>Loading...</div>;
  console.log(data);

  return (
    <div className="bg-white rounded-md my-4 gap-4 py-4">
      <div className="flex flex-wrap gap-3 items-center  md:justify-center p-4">
        <Badge
          current={data}
          type={type?.substring(0, type.length - 1) as string}
        />
        {data.photo && (
          <img className="w-[300px] h-[400px] rounded-md" src={data.photo} />
        )}
        {data.passport && data.passport !== "null" && (
          <img className="w-[300px] h-[400px] rounded-md" src={data.passport} />
        )}
      </div>
      <div className="grid gap-3 lg:col-span-3 overflow-y-auto lg:px-4">
        {data.biographie && (
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Bio</CardTitle>
              <CardDescription>{data.biographie}</CardDescription>
            </CardHeader>
          </Card>
        )}

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Information Personnel</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-4 gap-5">
            <CardItem label="civilité" title={data.civilite} />
            <CardItem label="prénom" title={data.prenom} />
            <CardItem label="-" title={data.deuxiemeprenom} />
            <CardItem label="nom" title={data.nom} />
            <CardItem
              className="md:col-span-2 lg:col-span-1"
              label="Email Principal"
              title={data.email1}
            />
            <CardItem
              className="md:col-span-2 lg:col-span-1"
              label="Email Secondaire"
              title={data.email2}
            />
            <CardItem
              className="md:col-span-2 lg:col-span-1"
              label="Email"
              title={data.email}
            />
            <CardItem label="telephone" title={data.telephone} />
            <CardItem label="organisme" title={data.organisme} />
            <CardItem label="fonction" title={data.fonction} />
            <CardItem label="ville" title={data.ville} />
            <CardItem label="adresse" title={data.adresse} />
            <CardItem label="pays" title={data.pays} />
            <CardItem label="provenance" title={data.provenance} />
            <CardItem label="commission" title={data.commission} />
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Prise en charge et participation au forum</CardTitle>
          </CardHeader>
          <CardContent className="grid md:grid-cols-4 gap-5">
            <div>
              <p className="text-sm text-muted-foreground capitalize">
                Pressences
              </p>
              {data.forumDesJeunes && (
                <p className="text-lg font-medium leading-none capitalize">
                  Forum des jeunes
                </p>
              )}
              {data.forumDesFemmes && (
                <p className="text-lg font-medium leading-none capitalize">
                  Forum des femmes
                </p>
              )}
              {data.forumDesScientifiques && (
                <p className="text-lg font-medium leading-none capitalize">
                  Forum scientifiques
                </p>
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground capitalize">
                Document
              </p>
              {data.autreDocument && (
                <p className="text-lg font-medium leading-none capitalize">
                  Autres Documents
                </p>
              )}
              {data.lettreInitation && (
                <p className="text-lg font-medium leading-none capitalize">
                  Lettre d'invitation
                </p>
              )}
              {data.lettreAutorisation && (
                <div>
                  <Button
                    variant={"ghost"}
                    className="p-0 text-lg text-black"
                    onClick={() => setViewPdf(true)}
                  >
                    Ouvrir la lettre d'autorisation
                  </Button>
                  <Dialog open={viewPdf} onOpenChange={setViewPdf}>
                    <DialogContent className="w-full bg-white  lg:w-[1000px]">
                      <DialogHeader>
                        <DialogTitle>
                          Visualisation du lettre d'autorisation
                        </DialogTitle>
                        <DialogClose />
                      </DialogHeader>
                      <PDFViewer fileUrl={filetest} />
                    </DialogContent>
                  </Dialog>
                </div>
              )}
            </div>
            {data.provenance?.toLocaleLowerCase() !==
              "NATIONAL".toLocaleLowerCase() && (
              <>
                <div>
                  <p className="text-sm text-muted-foreground capitalize">
                    Prise en charge
                  </p>
                  {data.priseChargeBillet && (
                    <p className="text-lg font-medium leading-none capitalize">
                      Prise en charge billet
                    </p>
                  )}
                  {data.priseChargeComplete && (
                    <p className="text-lg font-medium leading-none capitalize">
                      Prise en charge complète
                    </p>
                  )}
                  {data.priseChargeHebergement && (
                    <p className="text-lg font-medium leading-none capitalize">
                      Prise en charge de l'hébergement
                    </p>
                  )}
                  {data.priseChargetransUrbain && (
                    <p className="text-lg font-medium leading-none capitalize">
                      Prise en charge du transport
                    </p>
                  )}
                </div>
                <CardItem label="Ville de départ" title={data.villeDepart} />
                <CardItem label="Ville de retour" title={data.villeRetour} />
                <CardItem label="Date de départ" title={data.dateDepart} />
                <CardItem label="Date de retour" title={data.dateRetour} />
              </>
            )}
          </CardContent>
        </Card>
        {data.autrePrecision && (
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Précision sur la participation au forum</CardTitle>
              <CardDescription>{data.autrePrecision}</CardDescription>
            </CardHeader>
          </Card>
        )}
        {data.provenance?.toLocaleLowerCase() !==
          "NATIONAL".toLocaleLowerCase() &&
          data.autrePrecisionCharge && (
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Précision sur la prise en charge</CardTitle>
                <CardDescription>{data.autrePrecisionCharge}</CardDescription>
              </CardHeader>
            </Card>
          )}
      </div>

      <div className="p-4 flex gap-3 justify-center">
        <Button className="bg-secondary hover:bg-yellow-500">Supprimer</Button>
        <DrawerDialog
          form={
            <EditParticipantForm
              type={type as string}
              participant={data as Participant}
            />
          }
          label="modifier"
        />
      </div>
    </div>
  );
};

export default ParticipantsDetails;
