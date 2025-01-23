import React, { useState, useEffect } from "react";
import "../../styles/AddUser/AddUser.css";
import UserServices from "../../services/UserServices";
import RoleServices from "../../services/RoleServices";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import DOMPurify from "dompurify";
import { FRONT_ADMIN_USERS } from "../../utils/frontUrl";
import { navigateTo } from "../../utils/navigate";

function AddUserPage() {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    roleId: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState({});

  const fetchRoles = async () => {
    try {
      const response = await RoleServices.fetchAllRoles();
      setRoles(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des rôles:", error);
    }
  };

  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input); // Évite les injections de code dans les champs
  };

  const addUser = async (e) => {
    setIsSubmitting(true);

    if (user.password !== user.confirmPassword) {
      setErrors({ confirmPassword: "Les mots de passe ne correspondent pas" });
      setIsSubmitting(false);
      return;
    }

    const sanitizedUser = {
      firstname: sanitizeInput(user.firstname),
      lastname: sanitizeInput(user.lastname),
      email: sanitizeInput(user.email),
      role_id: user.roleId,
      password: sanitizeInput(user.password),
    };
    const validationErrors = validateForm(sanitizedUser);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      await UserServices.addUser(sanitizedUser);
      navigateTo(FRONT_ADMIN_USERS, navigate);
      toast.success("Utilisateur ajouté avec succès");
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateForm = (user) => {
    const errors = {};
    if (!user.first_name) errors.firstName = "Le prénom est requis";
    if (!user.surname) errors.surname = "Le nom est requis";
    if (!user.email) errors.email = "L'email est requis";
    if (!user.promo) errors.promo = "La promotion est requise";
    if (!user.company) errors.company = "L'entreprise est requise";
    if (!user.role_id) errors.role = "Le rôle est requis";

    // Vérification de la complexité du mot de passe
    if (!user.password) {
      errors.password = "Le mot de passe est requis";
    } else {
      // Regex pour vérifier les critères du mot de passe
      const passwordRegex =
        /^(?=.*[0-9])(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/~`\\|-])[A-Za-z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/~`\\|-]{10,}$/;
      if (!passwordRegex.test(user.password)) {
        errors.password =
          "Le mot de passe doit contenir au moins 10 caractères, un chiffre et un caractère spécial";
      }
    }

    return errors; // Retourne les erreurs trouvées
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return (
    <>
      <h1 className="title_Pages">Ajouter un utilisateur</h1>
      <div className="form_blue_contener">
        <div className="form_blue">
          <label className="label_form_blue" htmlFor="firstName">
            Prénom
          </label>
          <input
            className="input_form_blue"
            type="text"
            id="firstName"
            value={user.firstname}
            onChange={(e) =>
              setUser((prevState) => ({
                ...prevState,
                firstname: e.target.value,
              }))
            }
          />
          {errors.firstName && <span className="error">{errors.firstName}</span>}

          <label
            id="surname_label_add"
            className="label_form_blue at_second_label"
            htmlFor="surname"
          >
            Nom
          </label>
          <input
            className="input_form_blue"
            type="text"
            id="surname"
            value={user.lastname}
            onChange={(e) =>
              setUser((prevState) => ({
                ...prevState,
                lastname: e.target.value,
              }))
            }
          />
          {errors.surname && <span className="error">{errors.surname}</span>}

          <label
            id="email_label_add"
            className="label_form_blue at_second_label"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="input_form_blue"
            type="email"
            id="email"
            value={user.email}
            onChange={(e) =>
              setUser((prevState) => ({
                ...prevState,
                email: e.target.value,
              }))
            }
          />
          {errors.email && <span className="error">{errors.email}</span>}

          <label
            htmlFor="role"
            id="role_label_add"
            className="label_form_blue at_second_label"
          >
            Role
          </label>
          <select
            name="role"
            id="role_select_add"
            value={user.roleId}
            onChange={(e) => {
              setUser((prevState) => ({
                ...prevState,
                roleId: e.target.value,
              }));
            }}
          >
            <option value="" disabled>
              Choisissez un rôle
            </option>
            {roles.map(
              (role) =>
                role.id && (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                )
            )}
          </select>
          {errors.role && <span className="error">{errors.role}</span>}

          <label
            id="password_label_add"
            className="label_form_blue at_second_label"
            htmlFor="password"
          >
            Mot de passe
          </label>
          <input
            className="input_form_blue at_second_label"
            type="password"
            id="password"
            value={user.password}
            onChange={(e) =>
              setUser((prevState) => ({
                ...prevState,
                password: e.target.value,
              }))
            }
          />
          {errors.password && <span className="error">{errors.password}</span>}

          <label
            id="confirm_label_add"
            className="label_form_blue at_second_label"
            htmlFor="confirmPassword"
          >
            Confirmer le mot de passe
          </label>
          <input
            className="input_form_blue "
            type="password"
            value={user.confirmPassword}
            onChange={(e) =>
              setUser((prevState) => ({
                ...prevState,
                confirmPassword: e.target.value,
              }))
            }
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}

          <button
            className="primary-button primary-button-lg"
            disabled={isSubmitting}
            onClick={() => {
              addUser();
            }}
          >
            {isSubmitting ? "Ajout en cours..." : "Ajouter l'utilisateur"}
          </button>
        </div>
      </div>
    </>
  );
}

export default AddUserPage;
