import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ListeUtilisateurAdd/ListeUtilisateurAdd.css";
import UserServices from "../../services/UserServices";
import RoleServices from "../../services/RoleServices";
import { toast } from "react-toastify";
import { FRONT_ADMIN_ADD_USERS } from "../../utils/frontUrl";
import { navigateTo } from "../../utils/navigate";
import Navbar from "../../components/NavBar/Navbar";

const UsersList = () => {
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
      <Navbar />
      {/* En-tête de la liste d'utilisateurs */}
      <div id="first_line_list">
        <div>
          <button
            className="primary-button"
            onClick={() => navigateTo(FRONT_ADMIN_ADD_USERS, navigate)}
          >
            <span className="material-icons-outlined">add_circle_outline</span>
            <span>Ajouter un utilisateur</span>
          </button>
        </div>
        <h1 id="list_userAndAdd">Liste des utilisateurs</h1>
      </div>

      {/* Onglets pour filtrer les utilisateurs par rôle */}
      <div className="tabs">
        {roles.map((role, index) => {
          return (
            <button key={index} className="tab-button">
              {role.name}
            </button>
          );
        })}
        <div className="tab-line"></div>
      </div>

      {/* Conteneur pour afficher les utilisateurs */}
      <div id="contener_list">
        <table>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr>
                  <td>
                    {user.firstname}
                    {user.lastname}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Modale pour changer le rôle de l'utilisateur */}
        {isModalOpen && (
          <div id="myModal" className="modal" onClick={handleClickOutside}>
            <div className="modal-content">
              <div className="modal-header">
                <span className="close" onClick={closeModal}>
                  &times;
                </span>
                <h2>Modifier le Rôle</h2>
              </div>
              <div className="modal-body">
                <label id="label_changeRole" htmlFor="role">
                  Nouveau rôle
                </label>
                <select
                  name="role"
                  id="role_select_changeRole"
                  value={newRoleId}
                  onChange={handleRoleIdChange}
                >
                  <option value="" disabled hidden>
                    Nouveau rôle
                  </option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-footer">
                <button
                  id="button_form_changeRole"
                  onClick={updateUserRole}
                  className="button_ChangeRole button_list"
                >
                  Valider
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UsersList;
