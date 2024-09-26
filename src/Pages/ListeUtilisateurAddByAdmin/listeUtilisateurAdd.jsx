import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/ListeUtilisateurAdd/ListeUtilisateurAdd.css'; 
import UserServices from '../../Services/UserServices';
import RoleServices from '../../Services/RoleServices';
import {toast} from 'react-toastify';


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour gérer la modale
  const [newRoleId, setNewRoleId] = useState(''); // État pour gérer le rôle sélectionné
  const [selectedUser, setSelectedUser] = useState(null); // État pour stocker l'utilisateur sélectionné
  const [roles, setRoles] = useState([]); // État pour stocker les rôles disponibles
  const navigate = useNavigate();

  const navigateTo = (route) => {
    navigate(route);
    window.scrollTo(0, 0);
  };

  // Fonction pour récupérer tous les utilisateurs
  const fetchAllUsers = async () => {
    try {
      const response = await UserServices.fetchAllUser();
      setUsers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error.response ? error.response.data : error.message);
    }
  };

  // Fonction pour récupérer les rôles
  const fetchRoles = async () => {
    try {
      const response = await RoleServices.fetchAllRole(); // Assurez-vous d'avoir une fonction pour obtenir les rôles
      setRoles(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des rôles:', error.response ? error.response.data : error.message);
    }
  };

  // Fonction pour ouvrir la modale
  const openModal = (user) => {
    setSelectedUser(Number(user.id)); // Stocke l'utilisateur dont le rôle sera modifié
    setIsModalOpen(true);
  };

  const handleRoleIdChange = (event) => {
    const selectedRoleId = Number(event.target.value);
    setNewRoleId(selectedRoleId);
  };
  

  // Fonction pour fermer la modale
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Fermer la modale en cliquant à l'extérieur
  const handleClickOutside = (event) => {
    if (event.target.id === 'myModal') {
      closeModal(); // Utiliser closeModal pour éviter de dupliquer le code
    }
  };

  // Fonction pour mettre à jour le rôle de l'utilisateur
  const updateUserRole = async () => {
    try {
      await UserServices.UpdateUser(selectedUser, newRoleId);
      toast.success('Modifications enregistrées');
      fetchAllUsers();
      closeModal();
    } catch (error) {
      console.error('Erreur lors de la mise à jour du rôle:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    UserServices.checkToken();
    fetchAllUsers();
    fetchRoles(); // Récupération des rôles disponibles

    // Polling toutes les 50 secondes pour mettre à jour la liste
    const intervalId = setInterval(fetchAllUsers, 50000); // 50000ms = 50s

    // Nettoyage à la destruction du composant
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div id="first_line_list">
        <div>
          <button className="primary-button" onClick={() => { navigateTo('/add') }}>
            <span className="material-icons-outlined">add_circle_outline</span>
            <span>Ajouter un utilisateur</span>
          </button>
        </div>
        <h1 id="list_userAndAdd">Liste des utilisateurs</h1>
      </div>
      <div id="contener_list">
        <div className="title_user_list_contener">
          <h2 className="title_user_list">Liste des Formateurs</h2>
          <div className="display_column_block_users">
            {users.filter(user => user.role && user.role.name === 'Formateur').map(user => (
              <div className="block_user" key={user.id}>
                <div className="info_user">
                  <p>{user.first_name}</p>
                  <p>{user.surname}</p>
                </div>
                <button className="button_ChangeRole button_list" onClick={() => openModal(user)}>
                  Changer le rôle
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="title_user_list_contener">
          <h2 className="title_user_list">Liste des Apprenants</h2>
          <div className="display_column_block_users">
            {users.filter(user => user.role && user.role.name === 'Apprenant').map(user => (
              <div className="block_user" key={user.id}>
                <div className="info_user">
                  <p>{user.first_name}</p>
                  <p>{user.surname}</p>
                </div>
                <button className="button_ChangeRole button_list" onClick={() => openModal(user)}>
                  Changer le rôle
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* -- La Modale -- */}
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
                  {roles.map((role) => (
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
