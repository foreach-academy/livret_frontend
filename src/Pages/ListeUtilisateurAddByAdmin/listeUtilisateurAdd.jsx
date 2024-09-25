import React, { useState, useEffect } from 'react';
import '../../styles/ListeUtilisateurAdd/ListeUtilisateurAdd.css'; 
import UserServices from '../../Services/UserServices';
import { useNavigate } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const navigateTo = (route) => {
      navigate(route);
      window.scrollTo(0,0);
  }

  // Fonction pour récupérer tous les utilisateurs
  const fetchAllUsers = async () => {
    try {
      const response = await UserServices.fetchAllUser();
      setUsers(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error.response ? error.response.data : error.message);
    }
  };

  useEffect(() => {
    UserServices.checkToken();
    const isAdmin = UserServices.isAdmin(); // Stocke le résultat de isAdmin
    console.log("L'utilisateur est administrateur :", isAdmin); 
    fetchAllUsers();

    // Polling toutes les 50 secondes pour mettre à jour la liste
    const intervalId = setInterval(fetchAllUsers, 50000); // 50000ms = 50s

    // Nettoyage à la destruction du composant
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <div id="first_line_list">
        <div>
          <button className="primary-button" onClick={() => {navigateTo('/add')}}>
              <span class="material-icons-outlined">add_circle_outline</span>
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
                <button className="button_ChangeRole button_list">
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
                <button className="button_ChangeRole button_list">
                  Changer le rôle
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserList;
