import React, { useState, useEffect } from "react";
import "../../../styles/AddUser/AddUser.css";
import UserServices from "../../../services/UserServices";
import RoleServices from "../../../services/RoleServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { FRONT_ADMIN_USERS } from "../../../utils/frontUrl";
import { navigateTo } from "../../../utils/navigate";
import TrainingServices from "../../../services/TrainingServices";
import PromotionsService from "../../../services/PromotionsService";
import AdminLayout from "../../../components/pages/admin/AdminLayout";
import Input from "../../../components/shared/form/Input";
import SelectInputGeneric from "../../../components/shared/form/SelectInputGeneric";
import Button from "../../../components/shared/Button";
import AdminBodyTitle from "../../../components/shared/AdminBodyTitle";

function AddUserPage() {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    roleId: "",
    password: "",
    confirmPassword: "",
    birthdate: "",
    position: "",
    photo: null,
    promo: null
  });
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);



  const fetchRoles = async () => {
    await RoleServices.fetchAllRoles(setRoles);
  }
  useEffect(() => {
    fetchRoles();
  }, []);

  const handleRoleChange = (e) => {
    const selected = e.target.value;
    setSelectedRole(selected);
    setUser((prevState) => ({
      ...prevState,
      roleId: selected,
    }));
  };

  const handleFileChange = (e) => {
    setUser((prevState) => ({
      ...prevState,
      photo: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
e.preventDefault();

    if (user.password !== user.confirmPassword) {
      return;
    }

    const sanitizedUser = {
      firstname: DOMPurify.sanitize(user.firstname),
      lastname: DOMPurify.sanitize(user.lastname),
      email: DOMPurify.sanitize(user.email),
      birthdate: user.birthdate,
      role_id: user.roleId,
      password: DOMPurify.sanitize(user.password),
      position: user.position,
      photo: user.photo,
      promo: user.promo || null,
    };

    try {
      await UserServices.addUser(sanitizedUser);

      navigateTo(FRONT_ADMIN_USERS, navigate);
      toast.success("Utilisateur ajouté avec succès");
    } catch (error) {
      console.log(sanitizedUser)
      console.error("Erreur lors de l'ajout de l'utilisateur:", error);
      toast.error("Erreur lors de l'ajout de l'utilisateur");
    }
  };

  return (
    <AdminLayout>
      <AdminBodyTitle
        pageTitle="Ajouter un utilisateur"
      />

      <div className="form_blue_contener wider">
        <div className="form_blue">

          <label>Rôle</label>
          <select value={selectedRole} onChange={handleRoleChange}>
            <option value="" disabled>Choisissez un rôle</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>{role.name}</option>
            ))}
          </select>

          {selectedRole && (
            <>
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-wrap w-100">
                  <div className="d-flex justify-content-between w-100">

                    <Input className="color-black-text w-25" changeFunction={(e) => setUser({ ...user, firstname: e.target.value })} labelName="Prénom" type="text" value={user.firstname} required={true} />
                    <Input className="color-black-text w-25" changeFunction={(e) => setUser({ ...user, lastname: e.target.value })} labelName="Nom" type="text" value={user.lastname} required={true} />
                  </div>

                  <div className="d-flex justify-content-between   w-100">
                    <Input className="color-black-text w-25" changeFunction={(e) => setUser({ ...user, email: e.target.value })} labelName="E-mail" type="email" value={user.email} required={true} />
                    <Input className="color-black-text w-25" changeFunction={(e) => setUser({ ...user, birthdate: e.target.value })} labelName="Date de naissance" type={"date"} value={user.birthdate} required={true} />
                  </div>

                  <div className="d-flex justify-content-between   w-100">
                    <Input className="color-black-text w-25" changeFunction={(e) => setUser({ ...user, password: e.target.value })} labelName="Mot de passe" type="password" value={user.password} required={true} />
                    <Input className="color-black-text w-25" changeFunction={(e) => setUser({ ...user, confirmPassword: e.target.value })} labelName="Confirmer le mot de passe" type="password" value={user.confirmPassword} required={true} />
                  </div>

                  {selectedRole === "1" && (
                    <>
                      <Input className="color-black-text w-25" changeFunction={(e) => setUser({ ...user, position: e.target.value })} labelName="Emploi" type="text" value={user.position} required={true} />
                      <div className="input-group d-flex flex-column">
                        <label className="color-black-text fw-bold">Photo</label>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                      </div>
                    </>
                  )}
                  <div className="d-flex justify-content-end mt-4">
                    <Button
                      className="bg-fe-orange"
                      type="submit"
                      buttonTitle="Ajouter l'utilisateur"

                    />

                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default AddUserPage;
