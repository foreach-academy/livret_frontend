import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ListeUtilisateurAdd/ListeUtilisateurAdd.css";
import UserServices from "../../services/UserServices";
import RoleServices from "../../services/RoleServices";
import { toast } from "react-toastify";
import { FRONT_ADMIN_ADD_USERS } from "../../utils/frontUrl";
import { navigateTo } from "../../utils/navigate";
import { Table, Button, Modal } from "react-bootstrap"


const UsersListPage = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoleId, setNewRoleId] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  const fetchAllUsers = async () => {
    try {
      const response = await UserServices.fetchAllUsers();
      setUsers(response.data);
    } catch (error) {
      const errorMessage = error.response ? error.response.data : error.message;
      console.error(
        "Erreur lors de la récupération des utilisateurs:",
        errorMessage
      );
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await RoleServices.fetchAllRoles();
      setRoles(response.data);
    } catch (error) {
      const errorMessage = error.response ? error.response.data : error.message;
      console.error("Erreur lors de la récupération des rôles:", errorMessage);
    }
  };

  const openModal = (user) => {
    setSelectedUser(Number(user.id));
    setIsModalOpen(true);
    setNewRoleId("");
  };

  const handleRoleIdChange = (event) => {
    const selectedRoleId = Number(event.target.value);
    setNewRoleId(selectedRoleId);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleClickOutside = (event) => {
    if (event.target.id === "myModal") {
      closeModal();
    }
  };

  const updateUserRole = async () => {
    try {
      await UserServices.UpdateUser(selectedUser, newRoleId);
      toast.success("Modifications enregistrées");
      fetchAllUsers();
      closeModal();
    } catch (error) {
      const errorMessage = error.response ? error.response.data : error.message;
      console.error("Erreur lors de la mise à jour du rôle:", errorMessage);
    }
  };

  useEffect(() => {
    // UserServices.checkToken();
    fetchAllUsers();
    fetchRoles();

    // const intervalId = setInterval(fetchAllUsers, 50000);
    // return () => clearInterval(intervalId);
  }, []);

  return (
    <>
     <div className="container-admin">
      {/* En-tête de la liste d'utilisateurs */}
      <div id="first_line_list">
      <h1 id="list_userAndAdd">Utilisateurs</h1>
        <div>
          <button
            className="primary-button"
            onClick={() => navigateTo(FRONT_ADMIN_ADD_USERS, navigate)}
          >
            <span className="material-icons-outlined">add_circle_outline</span>
            <span>Ajouter un utilisateur</span>
          </button>
        </div>
      </div>

      {/* Liste des utilisateurs */}
      <Table striped bordered hover responsive className="mt-4">
  <thead>
    <tr>
      <th>Nom</th>
      <th>Prénom</th>
      <th>Email</th>
      <th>Rôle</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user) => (
      <tr key={user.id}>
        <td>{user.lastname}</td>
        <td>{user.firstname}</td>
        <td>{user.email}</td>
        <td>
  <span
    className={`badge ${
      user.role?.name === "Admin"
        ? "bg-purple"
        : user.role?.name === "Formateur"
        ? "bg-success"
        : user.role?.name === "Etudiant"
        ? "bg-primary"
        : "bg-danger"
    }`}
  >
    {user.role?.name || "Aucun rôle"}
  </span>
</td>

        <td>
          <Button variant="warning" size="sm" onClick={() => navigate(`/admin/users/${user.id}`)}>
            Modifier
          </Button>
        </td>
      </tr>
    ))}
  </tbody>
</Table>


</div>

    </>
  );
};

export default UsersListPage;
