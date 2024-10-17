import React, { useState, useEffect } from 'react';
import '../../styles/AddUser/AddUser.css';
import UserServices from '../../Services/UserServices';
import RoleServices from '../../Services/RoleServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify'; // Importer DOMPurify pour nettoyer les entrées

function AddUser() {
  // États pour les champs du formulaire
  const [first_name, setFirst_name] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [promo, setPromo] = useState('');
  const [roleId, setRoleId] = useState('');
  const [company, setCompany] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // État pour empêcher la soumission multiple
  const navigate = useNavigate();
  const navigateTo = (route) => {
    navigate(route);
    window.scrollTo(0, 0);
  };

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

  // Nettoyer les entrées utilisateur
  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input);
  };

  // Fonction pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Empêche de soumettre plusieurs fois le formulaire

    // Vérification immédiate des mots de passe avant validation
    if (password !== confirmPassword) {
      setErrors({ confirmPassword: 'Les mots de passe ne correspondent pas' });
      setIsSubmitting(false);
      return;
    }

    const sanitizedUser = {
      first_name: sanitizeInput(first_name),
      surname: sanitizeInput(surname),
      email: sanitizeInput(email),
      promo: sanitizeInput(promo),
      role_id: roleId, // Id du rôle est un entier donc pas nécessaire de nettoyer ici
      company: sanitizeInput(company),
      password: sanitizeInput(password),
    };

    const validationErrors = validateForm(sanitizedUser);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await UserServices.addUser(sanitizedUser);
      console.log('Utilisateur ajouté avec succès:', response.data);
      navigateTo('/users');
      toast.success("Utilisateur ajouté avec succès");
      resetForm();
    } catch (error) {
      toast.error('Une erreur est survenue');
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
    } finally {
      setIsSubmitting(false); // Réactiver le bouton après soumission
    }
  };

  // Fonction pour valider les champs du formulaire
  const validateForm = (user) => {
    const errors = {};
    if (!user.first_name) errors.firstName = 'Le prénom est requis';
    if (!user.surname) errors.surname = 'Le nom est requis';
    if (!user.email) errors.email = 'L\'email est requis';
    if (!user.promo) errors.promo = 'La promotion est requise';
    if (!user.company) errors.company = 'L\'entreprise est requise';
    if (!user.role_id) errors.role = 'Le rôle est requis';

    // Validation du mot de passe
    if (!user.password) {
      errors.password = 'Le mot de passe est requis';
    } else {
      // Vérifiez que le mot de passe a bien les critères requis
      // Mise à jour de la regex pour permettre plus de caractères spéciaux
      const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/~`\\|-])[A-Za-z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/~`\\|-]{10,}$/;
      if (!passwordRegex.test(user.password)) {
        errors.password = 'Le mot de passe doit contenir au moins 10 caractères, un chiffre et un caractère spécial';
      }
    }

    return errors;
  };

  // Fonction pour réinitialiser les champs du formulaire
  const resetForm = () => {
    setFirst_name('');
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
      <div class='form_blue_contener'>
        <form class='form_blue' onSubmit={handleSubmit}>
          <label class="label_form_blue" htmlFor="firstName">Prénom</label>
          <input
            class="input_form_blue"
            type="text"
            id="firstName"
            value={first_name}
            onChange={(e) => setFirst_name(sanitizeInput(e.target.value))} // Nettoyer à la saisie
          />
          {errors.firstName && <span class="error">{errors.firstName}</span>}

          <label id='surname_label_add' class="label_form_blue at_second_label" htmlFor="surname">Nom</label>
          <input
            class="input_form_blue"
            type="text"
            id="surname"
            value={surname}
            onChange={(e) => setSurname(sanitizeInput(e.target.value))} // Nettoyer à la saisie
          />
          {errors.surname && <span class="error">{errors.surname}</span>}

          <label id='email_label_add' class="label_form_blue at_second_label" htmlFor="email">Email</label>
          <input
            class="input_form_blue"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(sanitizeInput(e.target.value))} // Nettoyer à la saisie
          />
          {errors.email && <span class="error">{errors.email}</span>}

          <label htmlFor="promo" id='promo_label_add' class="label_form_blue at_second_label">Promo</label>
          <input
            type="text"
            class="input_form_blue"
            id="promo"
            value={promo}
            onChange={(e) => setPromo(sanitizeInput(e.target.value))} // Nettoyer à la saisie
          />
          {errors.promo && <span class="error">{errors.promo}</span>}

          <label htmlFor="role" id='role_label_add' class="label_form_blue at_second_label">Role</label>
          <select
            name="role"
            id="role_select_add"
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
          >
            <option value="" disabled>Choisissez un rôle</option>
            {roles.map((role) => (
              role.id  && (
                <option key={role.id} value={role.id}>{role.name}</option>
              )
            ))}
          </select>
          {errors.role && <span className="error">{errors.role}</span>}

          <label id='company_label_add' class="label_form_blue at_second_label" htmlFor="company">Entreprise</label>
          <input
            class="input_form_blue"
            type="text"
            id="company"
            value={company}
            onChange={(e) => setCompany(sanitizeInput(e.target.value))} // Nettoyer à la saisie
          />
          {errors.company && <span class="error">{errors.company}</span>}

          <label id='password_label_add' class="label_form_blue at_second_label" htmlFor="password">Password</label>
          <input
            class="input_form_blue"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <span class="error">{errors.password}</span>}

          <label id='confirm_label_add' class="label_form_blue at_second_label" htmlFor="confirmPassword">Confirm Password</label>
          <input
            class="input_form_blue"
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && <span class="error">{errors.confirmPassword}</span>}

          <button 
            className='primary-button primary-button-lg' 
            type='submit' 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Ajout en cours...' : 'Ajouter l\'utilisateur'}
          </button>
        </form>
      </div>
    </>
  );
}

export default AddUser;
