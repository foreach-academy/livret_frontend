import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/ListeUtilisateurAdd/ListeUtilisateurAdd.css";
import UserServices from "../../services/UserServices";
import RoleServices from "../../services/RoleServices";
import { toast } from "react-toastify";
import { FRONT_ADMIN_ADD_USERS } from "../../utils/frontUrl";
import { navigateTo } from "../../utils/navigate";
import { Table, Button, Form, Row, Col } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";

const UsersListPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("Tous");
  const navigate = useNavigate();
  const { isAuthenticated, isAdmin, setIsAuthenticated, setIsAdmin, isTrainer ,setToken } = useContext(AuthContext);

  const fetchAllUsers = async () => {
    try {
      const response = await UserServices.fetchAllUsers();
      setUsers(response.data);
      console.log(response.data);
     
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des utilisateurs:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await RoleServices.fetchAllRoles();
      setRoles(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des rôles:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    fetchAllUsers();
    fetchRoles();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.lastname.toLowerCase().includes(searchTerm) ||
      user.firstname.toLowerCase().includes(searchTerm);

    const matchesRole =
      selectedRole === "Tous" || user.userRole?.name === selectedRole;

    return matchesSearch && matchesRole;
  });

  return (
    <>
      <div className="container-admin">
        {/* En-tête de la liste d'utilisateurs */}
        <div className="d-flex justify-content-between">
          <h1 id="list_userAndAdd">Utilisateurs</h1>
       
          {isAdmin && (<button
              className="primary-button"
              onClick={() => navigateTo(FRONT_ADMIN_ADD_USERS, navigate)}
            >
              <span className="material-icons-outlined">add_circle_outline</span>
              <span>Ajouter un utilisateur</span>
            </button>)}  
  
        </div>

        {/* Zone de filtres */}
        <Row className="mt-3">
          <Col md={6}>
            <Form.Control
              type="text"
              placeholder="🔍 Rechercher par nom ou prénom..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Col>
          <Col md={6}>
            <Form.Select value={selectedRole} onChange={handleRoleChange}>
              <option value="Tous">Tous les rôles</option>
              {roles.map((role) => (
                <option key={role.id} value={role.name}>
                  {role.name}
                </option>
              ))}
            </Form.Select>
          </Col>
        </Row>

        {/* Liste des utilisateurs */}
        <Table striped bordered hover responsive className="mt-4">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Rôle</th>
             {isAdmin && (<th>Actions</th>)} 
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.lastname}</td>
                <td>{user.firstname}</td>
                <td>{user.email}</td>
                <td>
                  <span
                    className={`badge ${
                      user.userRole?.name === "Admin"
                        ? "bg-purple"
                        : user.userRole?.name === "Formateur"
                        ? "bg-success"
                        : user.userRole?.name === "Etudiant"
                        ? "bg-primary"
                        : "bg-danger"
                    }`}
                  >
                    {user.userRole?.name || "Aucun rôle"}
                  </span>
                </td>
                {isAdmin && (<td>
                 <Button
                    variant="warning"
                    size="sm"
                    onClick={() => navigate(`/admin/users/${user.id}`)}
                  >
                    Modifier
                  </Button>
                </td>)} 
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default UsersListPage;
