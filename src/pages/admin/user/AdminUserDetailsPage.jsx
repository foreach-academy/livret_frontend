import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserServices from "../../../services/UserServices";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";
import AdminLayout from "../../../components/pages/admin/AdminLayout";
import Button from "../../../components/shared/Button";
import AdminBodyTitle from "../../../components/shared/AdminBodyTitle";
import Input from "../../../components/shared/form/Input";


function UserDetailsPage() {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState({});

  const fetchUserDetails = async () => {
    try {
      const response = await UserServices.fetchUserById(userId);
      setUser({
        ...response.data,
        role_id: parseInt(response.data.role_id, 10),
      });
      console.log("Données utilisateur récupérées :", response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des informations de l'utilisateur:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);


  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setUser((prevUser) => ({
      ...prevUser,
      photo: file,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await UserServices.UpdateUser(userId, user);
      toast.success("Utilisateur mis à jour avec succès !");
      navigate(-1);
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      toast.error("Erreur lors de la mise à jour.");
    }
  };

  const handleDelete = async () => {
    try {
      const confirmation = window.confirm("Voulez-vous vraiment supprimer cet utilisateur?");
      if (!confirmation) return;
      await UserServices.deleteUser(userId);
      toast.success("Utilisateur supprimé avec succès!");
      navigate(-1);
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      toast.error("Erreur lors de la suppression.");
    }
  };

  return (
    <AdminLayout>
      <AdminBodyTitle pageTitle={`Modifier ${user.firstname} ${user.lastname}`} />
      <form onSubmit={handleUpdate}>
      <label className="fw-bold">Rôle</label>
      <Form.Select aria-label="Rôle" name="role_id" value={user.role_id} onChange={(e) => setUser({ ...user, role_id: e.target.value })}>
        <option value="1">Admin</option>
        <option value="2">Formateur</option>
        <option value="3">Étudiant</option>
      </Form.Select>

      <Input
        type="text"
        name="firstname"
        labelName="Prénom"
        value={user.firstname}
        changeFunction={(e) => setUser({ ...user, firstname: e.target.value })}
        required={true}
      />

      <Input
        type="text"
        name="lastname"
        labelName="Nom"
        value={user.lastname}
        changeFunction={(e) => setUser({ ...user, lastname: e.target.value })}
        required
      />

      <Input
        type="email"
        name="email"
        labelName="Email"
        value={user.email}
        changeFunction={(e) => setUser({ ...user, email: e.target.value })}
        required
      />

      {parseInt(user.role_id) === 1 &&
        <Input
          type="text"
          name="position"
          labelName="Emploi"
          value={user.position}
          changeFunction={(e) => setUser({ ...user, position: e.target.value })}
          placeholder="Ex : Directeur Technique" 
          required
        />}

      {parseInt(user.role_id) === 1 &&
        <Input
          type="file"
          accept="image/*"
          labelName="Photo"
          changeFunction={(e) => setUser({ ...user, photo: e.target.value })}
        />}
      <Button type="submit" buttonTitle="Enregistrer les modifications" className="bg-fe-orange" />
      <Button buttonTitle="Supprimer l'utilisateur" className="bg-danger" setAction={handleDelete} />
   
      </form>
    </AdminLayout>
  );
}

export default UserDetailsPage;
