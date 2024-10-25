import React, { useState, useEffect } from 'react';
import '../../styles/AddUser/AddUser.css';
import UserServices from '../../Services/UserServices';
import RoleServices from '../../Services/RoleServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify'; // Importer DOMPurify pour sécuriser les entrées utilisateur

// Composant AddUser pour ajouter un utilisateur
function AddUser() {
  // Déclaration des états pour stocker les valeurs des champs du formulaire
  const [first_name, setFirst_name] = useState(''); // Prénom
  const [surname, setSurname] = useState('');       // Nom
  const [email, setEmail] = useState('');           // Email
  const [promo, setPromo] = useState('');           // Promotion
  const [roleId, setRoleId] = useState('');         // Id du rôle sélectionné
  const [company, setCompany] = useState('');       // Entreprise
  const [password, setPassword] = useState('');     // Mot de passe
  const [confirmPassword, setConfirmPassword] = useState(''); // Confirmation du mot de passe
  const [isSubmitting, setIsSubmitting] = useState(false); // Pour empêcher la soumission multiple
  const navigate = useNavigate();

  // Fonction pour naviguer vers une autre route et défiler vers le haut
  const navigateTo = (route) => {
    navigate(route);
    window.scrollTo(0, 0);
  };

  // État pour stocker la liste des rôles disponibles
  const [roles, setRoles] = useState([]);

  // Gestion des erreurs de validation pour chaque champ
  const [errors, setErrors] = useState({});

  // useEffect pour charger les rôles depuis le serveur au montage du composant
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await RoleServices.fetchAllRole(); // Appel au service pour récupérer les rôles
        setRoles(response.data); // Mettre à jour l'état avec les rôles récupérés
      } catch (error) {
        console.error('Erreur lors de la récupération des rôles:', error); // Gérer les erreurs
      }
    };

    fetchRoles(); // Appeler la fonction pour charger les rôles
  }, []);

  // Fonction pour nettoyer les entrées utilisateur avec DOMPurify
  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input); // Évite les injections de code dans les champs
  };

  // Fonction principale pour gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Empêche de soumettre plusieurs fois

    // Vérification des mots de passe avant validation
    if (password !== confirmPassword) {
      setErrors({ confirmPassword: 'Les mots de passe ne correspondent pas' });
      setIsSubmitting(false); // Réactiver le bouton de soumission
      return;
    }

    // Création d'un objet utilisateur avec des valeurs nettoyées
    const sanitizedUser = {
      first_name: sanitizeInput(first_name),
      surname: sanitizeInput(surname),
      email: sanitizeInput(email),
      promo: sanitizeInput(promo),
      role_id: roleId, // Pas nécessaire de nettoyer car c'est un ID
      company: sanitizeInput(company),
      password: sanitizeInput(password),
    };

    // Validation des champs de formulaire
    const validationErrors = validateForm(sanitizedUser);

    // Si des erreurs existent, les afficher et annuler la soumission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors); // Mettre à jour les erreurs dans l'état
      setIsSubmitting(false);
      return;
    }

    try {
      // Tentative d'ajouter l'utilisateur via le service
      const response = await UserServices.addUser(sanitizedUser);
      console.log('Utilisateur ajouté avec succès:', response.data);
      navigateTo('/users'); // Rediriger vers la liste des utilisateurs
      toast.success("Utilisateur ajouté avec succès"); // Message de succès
      resetForm(); // Réinitialiser le formulaire après la soumission
    } catch (error) {
      toast.error('Une erreur est survenue'); // Afficher un message d'erreur
      console.error('Erreur lors de l\'ajout de l\'utilisateur:', error);
    } finally {
      setIsSubmitting(false); // Réactiver le bouton après soumission
    }
  };

  // Fonction de validation pour vérifier chaque champ du formulaire
  const validateForm = (user) => {
    const errors = {};
    if (!user.first_name) errors.firstName = 'Le prénom est requis';
    if (!user.surname) errors.surname = 'Le nom est requis';
    if (!user.email) errors.email = 'L\'email est requis';
    if (!user.promo) errors.promo = 'La promotion est requise';
    if (!user.company) errors.company = 'L\'entreprise est requise';
    if (!user.role_id) errors.role = 'Le rôle est requis';

    // Vérification de la complexité du mot de passe
    if (!user.password) {
      errors.password = 'Le mot de passe est requis';
    } else {
      // Regex pour vérifier les critères du mot de passe
      const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*()_+={}\[\]:;"'<>,.?/~`\\|-])[A-Za-z0-9!@#$%^&*()_+={}\[\]:;"'<>,.?/~`\\|-]{10,}$/;
      if (!passwordRegex.test(user.password)) {
        errors.password = 'Le mot de passe doit contenir au moins 10 caractères, un chiffre et un caractère spécial';
      }
    }

    return errors; // Retourne les erreurs trouvées
  };

  // Fonction pour réinitialiser le formulaire après une soumission réussie
  const resetForm = () => {
    setFirst_name('');
    setSurname('');
    setEmail('');
    setPromo('');
    setRoleId('');
    setCompany('');
    setPassword('');
    setConfirmPassword('');
    setErrors({}); // Efface toutes les erreurs affichées
  };

  // Rendu du formulaire avec champs contrôlés
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
            onChange={(e) => setFirst_name(sanitizeInput(e.target.value))} // Nettoie à la saisie
          />
          {errors.firstName && <span class="error">{errors.firstName}</span>}

          <label id='surname_label_add' class="label_form_blue at_second_label" htmlFor="surname">Nom</label>
          <input
            class="input_form_blue"
            type="text"
            id="surname"
            value={surname}
            onChange={(e) => setSurname(sanitizeInput(e.target.value))} // Nettoie à la saisie
          />
          {errors.surname && <span class="error">{errors.surname}</span>}

          <label id='email_label_add' class="label_form_blue at_second_label" htmlFor="email">Email</label>
          <input
            class="input_form_blue"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(sanitizeInput(e.target.value))} // Nettoie à la saisie
          />
          {errors.email && <span class="error">{errors.email}</span>}

          <label htmlFor="promo" id='promo_label_add' class="label_form_blue at_second_label">Promo</label>
          <input
            type="text"
            class="input_form_blue"
            id="promo"
            value={promo}
            onChange={(e) => setPromo(sanitizeInput(e.target.value))} // Nettoie à la saisie
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
            onChange={(e) => setCompany(sanitizeInput(e.target.value))} // Nettoie à la saisie
          />
          {errors.company && <span class="error">{errors.company}</span>}

          <label id="password_label_add" class="label_form_blue at_second_label" htmlFor="password">Mot de passe</label>
          <input
            class="input_form_blue at_second_label"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(sanitizeInput(e.target.value))}
          />
          {errors.password && <span class="error">{errors.password}</span>}

          <label id="confirm_label_add" class="label_form_blue at_second_label" htmlFor="confirmPassword">Confirmer le mot de passe</label>
          <input
            class="input_form_blue "
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(sanitizeInput(e.target.value))}
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
