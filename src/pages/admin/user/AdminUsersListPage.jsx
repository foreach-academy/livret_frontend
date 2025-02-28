import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/ListeUtilisateurAdd/ListeUtilisateurAdd.css";
import UserServices from "../../../services/UserServices";
import RoleServices from "../../../services/RoleServices";
import { FRONT_ADMIN_ADD_USERS, FRONT_ADMIN_USERS } from "../../../utils/frontUrl";
import { Table, Form} from "react-bootstrap";
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
    { label: "lastname" },
    { label: "firstname" },
    { label: "email" },
    { label: "userRole", subkey: "name"}
  ];

  const action = {
    url: FRONT_ADMIN_USERS,
    label: "Modifier",
    className: "bg-fe-orange",
  };

  useEffect(() => {
    UserServices.fetchAllUsers(setUsers);
    RoleServices.fetchAllRoles(setRoles);
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
        pageTitle="Utilisateurs"
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


        <Form.Select value={selectedRole} className="w-25 h-75 " onChange={handleRoleChange}>
          <option value="Tous">Tous les rôles</option>
          {roles.map((role) => (
            <option key={role.id} value={role.name}>
              {role.name}
            </option>
          ))}
        </Form.Select>
      </div>

      {/* Liste des utilisateurs */}
      {filteredUsers.length === 0 ? <div className="d-flex justify-content-center mt-5 text-align">Aucun utilisateur trouvé</div>
        : <Table striped bordered hover responsive className="mt-4">
          <Thead theads={Theads} />
          <Tbody data={filteredUsers} columns={columns} action={action}/>
        </Table>}

    </AdminLayout>
  );
};

export default UsersListPage;
