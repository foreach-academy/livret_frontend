// Importation des bibliothèques et styles nécessaires
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/ListeUtilisateurAdd/ListeUtilisateurAdd.css'; 
import UserServices from '../../Services/UserServices';
import RoleServices from '../../Services/RoleServices';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify'; // Pour la sécurité des données

// Composant principal de la liste d'utilisateurs
const UserList = () => {
  // États pour la liste des utilisateurs, les rôles et la gestion de la modale
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoleId, setNewRoleId] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();

  // Fonction pour naviguer vers une autre route et scroll en haut de la page
  const navigateTo = (route) => {
    navigate(route);
    window.scrollTo(0, 0);
  };

  // Fonction pour récupérer la liste de tous les utilisateurs
  const fetchAllUsers = async () => {
    try {
      const response = await UserServices.fetchAllUser();
      setUsers(response.data); // Mettre à jour l'état avec les données récupérées
    } catch (error) {
      const errorMessage = error.response ? error.response.data : error.message;
      toast.error(`Erreur lors de la récupération des utilisateurs: ${errorMessage}`);
      console.error('Erreur lors de la récupération des utilisateurs:', errorMessage);
    }
  };

  // Fonction pour récupérer la liste de tous les rôles
  const fetchRoles = async () => {
    try {
      const response = await RoleServices.fetchAllRole();
      setRoles(response.data); // Mettre à jour l'état avec les rôles récupérés
    } catch (error) {
      const errorMessage = error.response ? error.response.data : error.message;
      toast.error(`Erreur lors de la récupération des rôles: ${errorMessage}`);
      console.error('Erreur lors de la récupération des rôles:', errorMessage);
    }
  };

  // Ouvrir la modale de changement de rôle pour un utilisateur spécifique
  const openModal = (user) => {
    setSelectedUser(Number(user.id));
    setIsModalOpen(true);
    setNewRoleId(''); // Réinitialisation de l'ID du rôle
  };

  // Mise à jour de l'état avec l'ID du rôle sélectionné
  const handleRoleIdChange = (event) => {
    const selectedRoleId = Number(event.target.value);
    setNewRoleId(selectedRoleId);
  };

  // Fermeture de la modale
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Gestion de la fermeture de la modale en cliquant à l'extérieur
  const handleClickOutside = (event) => {
    if (event.target.id === 'myModal') {
      closeModal();
    }
  };

  // Mise à jour du rôle de l'utilisateur sélectionné
  const updateUserRole = async () => {
    try {
      await UserServices.UpdateUser(selectedUser, newRoleId);
      toast.success('Modifications enregistrées');
      fetchAllUsers(); // Rafraîchir la liste des utilisateurs
      closeModal();
    } catch (error) {
      const errorMessage = error.response ? error.response.data : error.message;
      toast.error(`Erreur lors de la mise à jour du rôle: ${errorMessage}`);
      console.error('Erreur lors de la mise à jour du rôle:', errorMessage);
    }
  };
  // Affichage de la liste utilisateur en fonction du role
  const showUsersList = (event, userList) => {
    const titleContainers = document.getElementsByClassName("title_user_list_contener");
    for (let i = 0; i < titleContainers.length; i++) {
      titleContainers[i].style.display = 'none';
    }
    document.getElementById(userList).style.display = "block";

    const tabButtons = document.getElementsByClassName('tab-button');
    for (let i = 0; i < tabButtons.length; i++) {
      tabButtons[i].classList.remove("active");
    }
    event.currentTarget.classList.add("active");
  };

  useEffect(() => {
    UserServices.checkToken();
    fetchAllUsers();
    fetchRoles();

    const intervalId = setInterval(fetchAllUsers, 50000);
    return () => clearInterval(intervalId);
  }, []);

  // Affichage de la liste des utilisateurs pour un rôle spécifique
  const renderUserList = (roleName) => {
    return users
      .filter(user => user.role && user.role.name === roleName)
      .map(user => (
        <div className="block_user" key={user.id}>
          <div className="info_user">
            <p>{user.first_name}</p>
            <p>{user.surname}</p>
          </div>
          <button className="button_ChangeRole button_list" onClick={() => openModal(user)}>
            Changer le rôle
          </button>
        </div>
      ));
  };

  // Chargement des utilisateurs et des rôles à la première exécution
  useEffect(() => {
    UserServices.checkToken(); // Vérification du token
    fetchAllUsers();
    fetchRoles();

    // Mise à jour automatique des utilisateurs toutes les 50 secondes
    const intervalId = setInterval(fetchAllUsers, 50000);
    return () => clearInterval(intervalId); // Nettoyage à la fin
  }, []);

  // Affichage du composant
  return (
    <>
      {/* En-tête de la liste d'utilisateurs */}
      <div id="first_line_list">
        <div>
          <button className="primary-button" onClick={() => navigateTo('/add')}>
            <span className="material-icons-outlined">add_circle_outline</span>
            <span>Ajouter un utilisateur</span>
          </button>
        </div>
        <h1 id="list_userAndAdd">Liste des utilisateurs</h1>
      </div>

      {/* Onglets pour filtrer les utilisateurs par rôle */}
      <div className='tabs'>
        <button className='tab-button active' onClick={(event) => showUsersList(event, 'apprenants')}>Apprenant·e·s</button>
        <button className='tab-button' onClick={(event) => showUsersList(event, 'formateurs')}>Formateurs</button>
        <button className='tab-button' onClick={(event) => showUsersList(event, 'administrateurs')}>Administrateurs</button>
        <div className="tab-line"></div>
      </div>

      {/* Conteneur pour afficher les utilisateurs */}
      <div id="contener_list">
        <div className="title_user_list_contener" id='apprenants' style={{ display: "block" }}>
          <div className="display_column_block_users">
            {renderUserList('Apprenant')}
          </div>
        </div>
        <div className="title_user_list_contener" id='formateurs'>
          <div className="display_column_block_users">
            {renderUserList('Formateur')}
          </div>
        </div>
        <div className="title_user_list_contener" id='administrateurs'>
          <div className="display_column_block_users">
            {renderUserList('Admin')}
          </div>
        </div>

        {/* Modale pour changer le rôle de l'utilisateur */}
        {isModalOpen && (
          <div id="myModal" className="modal" onClick={handleClickOutside}>
            <div className="modal-content">
              <div className="modal-header">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2>Modifier le Rôle</h2>
              </div>
              <div className="modal-body"> 
                <label id='label_changeRole' htmlFor="role">Nouveau rôle</label>
                <select name="role" id="role_select_changeRole" value={newRoleId} onChange={handleRoleIdChange}>
                  <option value="" disabled hidden>Nouveau rôle</option>
                  {roles.map(role => (
                    <option key={role.id} value={role.id}>{role.name}</option>
                  ))}
                </select>
              </div>
              <div className="modal-footer">
                <button id='button_form_changeRole' onClick={updateUserRole} className='button_ChangeRole button_list'>Valider</button>
              </div>
            </div> 
          </div>
        )}
      </div>
    </>
  );
};

export default UserList;
