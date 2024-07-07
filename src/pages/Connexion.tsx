import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useAuth } from "../hooks/useAuth";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useToast } from "../components/ui/use-toast";
import { ToastAction } from "../components/ui/toast";

const Connexion = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      await login(values.username, values.password);
      toast({
        title: "Connexion réussie!",
        description: "Vous êtes maintenant connecté.",
        action: <ToastAction altText="Masquer">masquer</ToastAction>,
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Échec de la connexion",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-expect-error
        description: error.message,
        action: <ToastAction altText="Masquer">masquer</ToastAction>,
        variant: "destructive",
      });
    }
  };

  return (
    <section className="grid place-content-center w-dvw h-dvh">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Connexion</CardTitle>
          <CardDescription>Bienvenue au forum Galien Afrique!</CardDescription>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{ username: "", password: "" }}
            validationSchema={Yup.object({
              username: Yup.string().required(
                "Nom d'utilisateur ou email est requis"
              ),
              password: Yup.string().required("Mot de passe est requis"),
            })}
            onSubmit={(values, { setSubmitting }) => {
              handleLogin(values).finally(() => setSubmitting(false));
            }}
          >
            {({ isSubmitting }) => (
              <Form className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="username">Email/Nom utilisateur</Label>
                  <Field
                    name="username"
                    type="text"
                    as={Input}
                    placeholder="exemple@gmail.com"
                    id="username"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Mot de passe</Label>
                  <Field
                    name="password"
                    type="password"
                    as={Input}
                    placeholder="********"
                    id="password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <CardFooter className="flex">
                  <Button
                    type="submit"
                    className="flex-1"
                    disabled={isSubmitting}
                  >
                    Connecter
                  </Button>
                </CardFooter>
              </Form>
            )}
          </Formik>
        </CardContent>
      </Card>
    </section>
  );
};

export default Connexion;
