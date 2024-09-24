import React, { useState, useEffect } from 'react';
import '../../styles/ListeUtilisateurAdd/ListeUtilisateurAdd.css'; 
import UserServices from '../../Services/UserServices';
import RoleServices from '../../Services/RoleServices';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour gérer la modale
  const [roleId, setRoleId] = useState(''); // État pour gérer le rôle sélectionné
  const [selectedUser, setSelectedUser] = useState(null); // État pour stocker l'utilisateur sélectionné
  const [roles, setRoles] = useState([]); // État pour stocker les rôles disponibles

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
    setSelectedUser(user); // Stocke l'utilisateur dont le rôle sera modifié
    setRoleId(user.role.id); // Prend le rôle actuel de l'utilisateur
    setIsModalOpen(true);
  };

  // Fonction pour fermer la modale
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Fermer la modale en cliquant à l'extérieur
  const handleClickOutside = (event) => {
    if (event.target.id === 'myModal') {
      setIsModalOpen(false);
    }
  };

  // Fonction pour mettre à jour le rôle de l'utilisateur
  const updateUserRole = async () => {
    try {
      if (selectedUser) {
        await UserServices.UpdateUser(selectedUser.id, roleId); // Assurez-vous d'avoir une méthode pour mettre à jour le rôle
        console.log("mise a jour reussie")
        fetchAllUsers(); // Recharger la liste des utilisateurs
        closeModal(); // Fermer la modale après mise à jour
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour du rôle:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    UserServices.checkToken();
    const isAdmin = UserServices.isAdmin();
    console.log("L'utilisateur est administrateur :", isAdmin); 
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
        <button id="button_addUser" className="button_list">
          <a id='link_form_add' href="/add">
            Ajouter un utilisateur
          </a>
        </button>
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
                <select
                  name="role"
                  id="role_select_changeRole"
                  value={roleId}
                  onChange={(e) => setRoleId(e.target.value)}
                >
                  {roles.map((role) => (
                    role.id && (
                      <option key={role.id} value={role.id}>{role.name}</option>
                    )
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
