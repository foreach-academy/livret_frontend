import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import UserServices from "../../services/UserServices";
import { toast } from "react-toastify";
import { Table, Button, Form } from "react-bootstrap";

function UserDetailsPage() {
  const { id: userId } = useParams(); // Récupération correcte de l'ID
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    role_id: "",
    position: "",
    formation: "",
    promotion: "",
    photo: "",
  });

  // Récupération des informations de l'utilisateur
  const fetchUserDetails = async () => {
    try {
      const response = await UserServices.fetchUserById(userId);
      setUser(response.data);
      console.log(response.data); // Affichage des données pour le debuggage
    } catch (error) {
      console.error("Erreur lors de la récupération des informations de l'utilisateur:", error);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, []);

  // Gestion des changements dans les inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Gestion du changement de photo (uniquement pour Admin)
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setUser((prevUser) => ({
      ...prevUser,
      photo: file,
    }));
  };

  // Envoi des modifications
  const handleUpdate = async () => {
    try {
      await UserServices.UpdateUser(userId, user);
      toast.success("Utilisateur mis à jour avec succès !");
      navigate(-1); // Retourner à la page précédente
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      toast.error("Erreur lors de la mise à jour.");
    }
  };

  return (
    <>
      <div className="container-admin">
        <h1>Modifier {user.firstname} {user.lastname}</h1>


        <Table striped bordered hover className="mt-4">
          <tbody>
            <tr>
              <th>Prénom</th>
              <td>
                <Form.Control
                  type="text"
                  name="firstname"
                  value={user.firstname}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>Nom</th>
              <td>
                <Form.Control
                  type="text"
                  name="lastname"
                  value={user.lastname}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>Email</th>
              <td>
                <Form.Control
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr>
              <th>Rôle</th>
              <td>
                <Form.Select name="role_id" value={user.role_id} onChange={handleChange}>
                  <option value="1">Admin</option>
                  <option value="2">Formateur</option>
                  <option value="3">Étudiant</option>
                </Form.Select>
              </td>
            </tr>
            {user.role_id === 1 && (
              <tr>
                <th>Emploi (Position)</th>
                <td>
                  <Form.Control
                    type="text"
                    name="position"
                    value={user.position}
                    onChange={handleChange}
                    placeholder="Ex : Directeur Technique"
                  />
                </td>
              </tr>
            )}
            {user.role_id === 3 && (
              <>
                <tr>
                  <th>Formation en cours</th>
                  <td>
                    <Form.Control
                      type="text"
                      name="formation"
                      value={user.formation}
                      onChange={handleChange}
                      placeholder="Ex : Développement Web"
                    />
                  </td>
                </tr>
                <tr>
                  <th>Promotion en cours</th>
                  <td>
                    <Form.Control
                      type="text"
                      name="promotion"
                      value={user.promotion}
                      onChange={handleChange}
                      placeholder="Ex : 2024-2025"
                    />
                  </td>
                </tr>
              </>
            )}


            {user.role_id === 1 && (
              <tr>
                <th>Photo</th>
                <td>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        <Button variant="success" onClick={handleUpdate} className="mt-3">
          Enregistrer les modifications
        </Button>
      </div>
    </>
  );
}

export default UserDetailsPage;
