import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Badge } from "../components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { useToast } from "../components/ui/use-toast"; // Import toast component

interface User {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  is_administrateur: boolean;
  is_secretaire: boolean;
  is_guest: boolean;
}

const Administrateur = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      if (user) {
        try {
          const response = await axios.get<User[]>(
            "http://51.77.215.159:8000/v3/accounts/users/",
            {
              headers: {
                Authorization: `token ${user.token}`,
              },
            }
          );
          setUsers(response.data);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des utilisateurs :",
            error
          );
        } finally {
          setLoading(false);
        }
      }
    };

    fetchUsers();
  }, [user]);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setModalOpen(false);
  };

  const handleSaveChanges = async () => {
    if (!selectedUser) return;

    if (newPassword !== confirmPassword) {
      toast({
        title: "Erreur",
        description: "Les nouveaux mots de passe ne correspondent pas.",
        status: "error",
      });
      return;
    }

    try {
      await axios.put(
        `http://51.77.215.159:8000/v3/accounts/users/${selectedUser.id}/`,
        {
          ...selectedUser,
          password: newPassword,
        },
        {
          headers: {
            Authorization: `token ${user?.token}`,
          },
        }
      );
      // Mettre à jour l'état des utilisateurs après modification
      const updatedUsers = users.map((u) =>
        u.id === selectedUser.id ? selectedUser : u
      );
      setUsers(updatedUsers);
      handleCloseModal();
      toast({
        title: "Succès",
        description: "Les informations de l'utilisateur ont été mises à jour.",
        status: "success",
      });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'utilisateur :", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la mise à jour.",
        status: "error",
      });
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <section className="p-4 gap-2 grid admins">
      {users.map((user) => (
        <Card
          key={user.id}
          className="min-w-[300px] p-4 gap-3 flex flex-col justify-center items-center cursor-pointer"
          onClick={() => handleUserClick(user)}
        >
          <Badge className="bg-red-50 text-red-950 self-start">
            {user.is_administrateur && "Admin"}
            {user.is_secretaire && "Secrétaire"}
            {user.is_guest && "Invité"}
          </Badge>
          <Avatar className="w-[60px] h-[60px]">
            <AvatarFallback>
              {user.first_name.charAt(0)}
              {user.last_name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <CardContent className="text-center">
            <CardTitle>
              {user.first_name} {user.last_name}
            </CardTitle>
            <CardDescription className="text-base mt-1">
              <a href={`mailto:${user.username}`}>{user.username}</a>
            </CardDescription>
          </CardContent>
        </Card>
      ))}
      <Card className="min-w-[300px] cursor-pointer p-4 gap-3 flex flex-col justify-center items-center">
        <Avatar className="w-[60px] h-[60px]">
          <AvatarFallback>
            <FaPlus size={24} className="text-slate-400" />
          </AvatarFallback>
        </Avatar>
      </Card>

      {/* Dialog pour afficher et modifier les détails de l'utilisateur sélectionné */}
      {selectedUser && (
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="bg-white">
            <DialogHeader>
              <DialogTitle>
                Modifier les informations de l'utilisateur
              </DialogTitle>
              <DialogDescription>
                Faites les changements nécessaires et cliquez sur Enregistrer
                lorsque vous avez terminé.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Prénom
                </Label>
                <Input
                  id="name"
                  value={selectedUser.first_name}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      first_name: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="lastname" className="text-right">
                  Nom de famille
                </Label>
                <Input
                  id="lastname"
                  value={selectedUser.last_name}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      last_name: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Nom d'utilisateur
                </Label>
                <Input
                  id="username"
                  value={selectedUser.username}
                  onChange={(e) =>
                    setSelectedUser({
                      ...selectedUser,
                      username: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="oldPassword" className="text-right">
                  Ancien mot de passe
                </Label>
                <Input
                  id="oldPassword"
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="newPassword" className="text-right">
                  Nouveau mot de passe
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="confirmPassword" className="text-right">
                  Confirmer le nouveau mot de passe
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleCloseModal}>Annuler</Button>
              <Button onClick={handleSaveChanges} variant="default">
                Enregistrer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </section>
  );
};

export default Administrateur;
