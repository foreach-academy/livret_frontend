import React, { useState, useEffect } from "react";
import "../../styles/AddUser/AddUser.css";
import UserServices from "../../services/UserServices";
import RoleServices from "../../services/RoleServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { FRONT_ADMIN_USERS } from "../../utils/frontUrl";
import { navigateTo } from "../../utils/navigate";
import TrainingServices from "../../services/TrainingServices";
import PromotionsService from "../../services/PromotionsService";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});
  const [trainings, setTrainings] = useState([]);
  const [promotions, setPromotions] = useState([]);

  const fetchAllTrainings = async () => {
    try {
      const response = await TrainingServices.fetchAllTraining();
      setTrainings(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des formations:", error);
    }
  };
  const fetchAllPromotions = async () => {
    try {
      const response = await PromotionsService.fetchAllPromotions();
      console.log(response.data);
      setPromotions(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des promotions:", error);
    }
  };

  useEffect(() => {
    fetchAllPromotions();
  }, []);

  useEffect(() => {
    fetchAllTrainings();
  }, []);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await RoleServices.fetchAllRoles();
        setRoles(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des rôles:", error);
      }
    };
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

  const handleSubmit = async () => {
    setIsSubmitting(true);

    if (user.password !== user.confirmPassword) {
      setErrors({ confirmPassword: "Les mots de passe ne correspondent pas" });
      setIsSubmitting(false);
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="container-admin">
        <h1 className="title_Pages">Ajouter un utilisateur</h1>
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
                <div className="d-flex flex-wrap w-100">
                  <div className="d-flex justify-content-between gap-5 w-100">
                    <div className="input-group d-flex flex-column ">
                      <label>Prénom</label>
                      <input type="text" value={user.firstname} onChange={(e) => setUser({ ...user, firstname: e.target.value })} />
                    </div>
                    <div className="input-group d-flex flex-column ">
                      <label>Nom</label>
                      <input type="text" value={user.lastname} onChange={(e) => setUser({ ...user, lastname: e.target.value })} />
                    </div>
                  </div>

                  <div className="d-flex justify-content-between gap-5  w-100">
                    <div className="input-group d-flex flex-column">
                      <label>Email</label>
                      <input type="email" value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                    </div>
                    <div className="input-group d-flex flex-column">
                      <label>Date de naissance</label>
                      <input type="date" value={user.birthdate} onChange={(e) => setUser({ ...user, birthdate: e.target.value })} />
                    </div>
                  </div>

                  <div className="d-flex justify-content-between  gap-5 w-100">
                    <div className="input-group d-flex flex-column">
                      <label>Mot de passe</label>
                      <input type="password" value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                    </div>
                    <div className="input-group d-flex flex-column">
                      <label>Confirmer le mot de passe</label>
                      <input type="password" value={user.confirmPassword} onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} />
                    </div>
                  </div>

                  {selectedRole === "1" && (
                    <>
                      <div className="input-group d-flex flex-column">
                        <label>Emploi</label>
                        <input type="text" value={user.position} onChange={(e) => setUser({ ...user, position: e.target.value })} />
                      </div>
                      <div className="input-group d-flex flex-column">
                        <label>Photo</label>
                        <input type="file" accept="image/*" onChange={handleFileChange} />
                      </div>
                    </>
                  )}
                  {selectedRole === "3" && (
                    <>
                      <div className="d-flex justify-content-between gap-5 w-100">
                        <div className="input-group d-flex flex-column w-50">
                          <label>Formation en cours</label>
                          <select>
                            <option value="" disabled>Choisissez une formation</option>
                            {trainings.map((training) => (
                              <option key={training.id} value={training.id}>{training.title}</option>
                            ))}
                          </select>
                        </div>

                        <div className="input-group d-flex flex-column w-50">
                          <label>Promotion en cours</label>
                          <select onChange={(e) => setUser({ ...user, promo: e.target.value })}>
                            <option value="" disabled>Choisissez une promotion</option>
                            {promotions.map((promot) => (
                              <option key={promot.id} value={promot.id}>
                                {promot.title}
                              </option>
                            ))}
                          </select>

                        </div>
                      </div>
                    </>
                  )}



                  <div className="d-flex justify-content-end mt-4">
                    <button className="primary-button" onClick={handleSubmit} disabled={isSubmitting}>
                      {isSubmitting ? "Ajout en cours..." : "Ajouter l'utilisateur"}
                    </button>
                  </div>

                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default AddUserPage;
