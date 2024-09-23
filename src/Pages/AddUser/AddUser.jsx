import React, { useState, useEffect } from 'react';
import '../../styles/AddUser/AddUser.css';
import UserServices from '../../Services/UserServices';
import RoleServices from '../../Services/RoleServices';

function AddUser() {
  // États pour les champs du formulaire
  const [firstName, setFirstName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [promo, setPromo] = useState('');
  const [roleId, setRoleId] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // État pour les rôles
  const [roles, setRoles] = useState([]);

  // Gestion des erreurs de validation
  const [errors, setErrors] = useState({});

  // Charger les rôles lors du montage du composant
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await RoleServices.fetchAllRole();
        setRoles(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des rôles:', error);
      }
    };

    fetchRoles();
  }, []);

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const user = { 
        firstName, 
        surname, 
        email, 
        promo, 
        role_id: roleId, 
        company, 
        password 
      };
      const response = await UserServices.addUser(user);
      console.log('Utilisateur ajouté avec succès:', response.data);
      resetForm();
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
    }
  };

  // Fonction pour valider les champs du formulaire
  const validateForm = () => {
    const errors = {};
    if (!firstName) errors.firstName = 'Le prénom est requis';
    if (!surname) errors.surname = 'Le nom est requis';
    if (!email) errors.email = 'L\'email est requis';
    if (!promo) errors.promo = 'La promotion est requise';
    if (!company) errors.company = 'L\'entreprise est requise';
    if (!roleId) errors.role = 'Le rôle est requis';
    
    // Validation du mot de passe
    if (!password) {
        errors.password = 'Le mot de passe est requis';
    } else {
      const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{10,}$/;
        if (!passwordRegex.test(password)) {
            errors.password = 'Le mot de passe doit contenir au moins 10 caractères, une lettre majuscule et 1 caratére special';
        }
    }
    
    if (password !== confirmPassword) errors.confirmPassword = 'Les mots de passe ne correspondent pas';

    return errors;
  };

  // Fonction pour réinitialiser les champs du formulaire
  const resetForm = () => {
    setFirstName('');
    setSurname('');
    setEmail('');
    setPromo('');
    setRoleId('');
    setCompany('');
    setPassword('');
    setConfirmPassword('');
    setErrors({});
  };

  return (
    <>
      <h1 class="title_Pages">Ajouter un utilisateur</h1>
      <div id='form_add_contener'>
        <form id='form_add' onSubmit={handleSubmit}>
          <label class="label_add" htmlFor="firstName">First name</label>
          <input
            class="input_add"
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {errors.firstName && <span class="error">{errors.firstName}</span>}

          <label id='surname_label_add' class="label_add at_second_label" htmlFor="surname">Surname</label>
          <input
            class="input_add"
            type="text"
            id="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          {errors.surname && <span class="error">{errors.surname}</span>}

          <label id='email_label_add' class="label_add at_second_label" htmlFor="email">Email</label>
          <input
            class="input_add"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span class="error">{errors.email}</span>}

          <label htmlFor="promo" id='promo_label_add' class="label_add at_second_label">Promo</label>
          <input
            type="text"
            class="input_add"
            id="promo"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
          />
          {errors.promo && <span class="error">{errors.promo}</span>}

          <label htmlFor="role" id='role_label_add' class="label_add at_second_label">Role</label>
          <select
            name="role"
            id="role_select_add"
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
          >
            <option value="1">Apprenant</option> {/* Option par défaut */}
            {roles.map((role) => (
              role.id !== 1 && (
                <option key={role.id} value={role.id}>{role.name}</option>
              )
            ))}
          </select>
          {errors.role && <span className="error">{errors.role}</span>}

          <label id='company_label_add' class="label_add at_second_label" htmlFor="company">Company</label>
          <input
            class="input_add"
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
          {errors.company && <span class="error">{errors.company}</span>}

          <label id='password_label_add' class="label_add at_second_label" htmlFor="password">Password</label>
          <input
            class="input_add"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span class="error">{errors.password}</span>}

          <label id='confirm_label_add' class="label_add at_second_label" htmlFor="confirmPassword">Confirm Password</label>
          <input
            class="input_add"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <span class="error">{errors.confirmPassword}</span>}

          <button id='button_submit_add_user' type='submit'>Ajouter l'utilisateur</button>
        </form>
      </div>
    </>
  );
}
export default AddUser;