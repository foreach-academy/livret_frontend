import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/ListeUtilisateurAdd/ListeUtilisateurAdd.css";
import UserServices from "../../../services/UserServices";
import RoleServices from "../../../services/RoleServices";
import { FRONT_ADMIN_ADD_USERS, FRONT_ADMIN_USERS } from "../../../utils/frontUrl";
import { navigateTo } from "../../../utils/navigate";
import { Table, Form, Row, Col } from "react-bootstrap";
import AuthContext from "../../../context/AuthContext";
import AdminLayout from "../../../components/pages/admin/AdminLayout";
import Thead from "../../../components/shared/form/Thead";
import Tbody from "../../../components/shared/form/Tbody";
import AdminBodyTitle from "../../../components/shared/AdminBodyTitle";
import Button from "../../../components/shared/Button";
import Input from "../../../components/shared/form/Input";

const UsersListPage = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState("Tous");
  const navigate = useNavigate();
  const { isAdmin } = useContext(AuthContext);
  const Theads = [
    { id: "lastname", label: "Nom" },
    { id: "firstname", label: "Prénom" },
    { id: "email", label: "Email" },
    { id: "userRole.name", label: "Rôle" },
    ...(isAdmin ? [{ id: "action", label: "Actions" }] : []),
  ];

  const columns = [
    { key: "lastname" },
    { key: "firstname" },
    { key: "email" },
    {
      key: "userRole?.name",
      render: (user) => (
        <span
          className={`badge ${user.userRole?.name === "Admin"
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
      ),
    },
  ];

  if (isAdmin) {
    columns.push({
      key: "action",
      render: (user) => (
        <Button
          buttonTitle="Modifier"
          className="bg-fe-orange"
          setAction={() => navigate(`${FRONT_ADMIN_USERS}/${user.id}`)}
        />
      ),
    });
  }

  const fetchAllUsers = async () => {
    try {
      const response = await UserServices.fetchAllUsers();
      setUsers(response.data);
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des utilisateurs:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const fetchRoles = async () => {
    await RoleServices.fetchAllRoles(setRoles);
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
    <AdminLayout>
      <AdminBodyTitle
        isAdmin={isAdmin}
        buttonTitle="Ajouter un utilisateur"
        navigateUrl={FRONT_ADMIN_ADD_USERS}
        icon="add"
        pageTitle="Utlisateurs"
        navigate={navigate}
      />
<div className="d-flex align-items-end">
          <Input
          className="w-75 me-2"
          labelName="Recherche un utilisateur :"
            type="search"
            value={searchTerm}
            changeFunction={handleSearchChange}
       
          />


          <Form.Select value={selectedRole} className="w-25 h-75 "onChange={handleRoleChange}>
            <option value="Tous">Tous les rôles</option>
            {roles.map((role) => (
              <option key={role.id} value={role.name}>
                {role.name}
              </option>
            ))}
          </Form.Select>
</div>

      {/* Liste des utilisateurs */}
      <Table striped bordered hover responsive className="mt-4">
        <Thead theads={Theads} />
        <Tbody data={filteredUsers} columns={columns} />
      </Table>
    </AdminLayout>
  );
};

export default UsersListPage;
