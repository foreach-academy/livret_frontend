import React, { useState, useEffect } from "react";
import "../../../styles/AddUser/AddUser.css";
import UserServices from "../../../services/UserServices";
import RoleServices from "../../../services/RoleServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../../components/pages/admin/AdminLayout";
import Input from "../../../components/shared/form/Input";
import Button from "../../../components/shared/Button";
import AdminBodyTitle from "../../../components/shared/AdminBodyTitle";
import SelectInputGeneric from "../../../components/shared/form/SelectInputGeneric";

function AddUserPage() {
  const [user, setUser] = useState({});
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    RoleServices.fetchAllRoles(setRoles);
  }, []);

  const handleRoleChange = (e) => {
    const selected = e.target.value;
    setSelectedRole(selected);
    setUser((prevState) => ({
      ...prevState,
      role_id: selected
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
      toast.error("Les mots de passe ne correspondent pas.");
      return;
    }
    await UserServices.addUser(user, navigate, toast);
  };

  return (
    <AdminLayout>
      <AdminBodyTitle
        pageTitle="Ajouter un utilisateur"
      />
      <div className="form_blue_contener wider">
        <div className="form_blue">
          <SelectInputGeneric
            label="Rôle"
            options={roles}
            selectedValue={selectedRole}
            onChange={handleRoleChange}
            getOptionLabel={(role) => role.name}
          />
          {selectedRole && (
            <>
              <form onSubmit={handleSubmit}>
                <div className="d-flex flex-wrap w-100">
                  <div className="d-flex justify-content-between w-100">

                    <Input className="color-black-text w-25" changeFunction={(e) => setUser({ ...user, firstname: e.target.value })} labelName="Prénom" type="text" value={user.firstname} required={true} />
                    <Input className="color-black-text w-25" changeFunction={(e) => setUser({ ...user, lastname: e.target.value })} labelName="Nom" type="text" value={user.lastname} required={true} />
                  </div>

                  <div className="d-flex justify-content-between   w-100">
                    <Input className="color-black-text w-25" changeFunction={(e) => setUser({ ...user, email: e.target.value })} labelName="E-mail" type="text" value={user.email} required={true} />
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
                      buttonTitle="Ajouter l'utilisateur" />
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
