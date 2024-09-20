import React, { useState, useEffect } from 'react';
import '../../styles/ListeUtilisateurAdd/ListeUtilisateurAdd.css'; 
import UserServices from '../../Services/UserServices';

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fonction pour récupérer tous les utilisateurs
    const fetchAllUsers = async () => {
      try {
        const response = await UserServices.fetchAllUser();
        console.log(response);
        setUsers(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:',  error.response ? error.response.data : error.message);
      }
    };

    // Appel initial pour charger les utilisateurs
    fetchAllUsers();

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
            {users.filter(user => user.role.name === 'Formateur').map(user => (
              <div className="block_user" key={user.id}>
                <div className="info_user">
                  <p>{user.first_name}</p>
                  <p>{user.surname}</p>
                </div>
                <button className="button_ChangeRole button_list">
                  Changer le role
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="title_user_list_contener">
          <h2 className="title_user_list">Liste des Apprenants</h2>
          <div className="display_column_block_users">
            {users.filter(user => user.role.name === 'Apprenant').map(user => (
              <div className="block_user" key={user.id}>
                <div className="info_user">
                  <p>{user.first_name}</p>
                  <p>{user.surname}</p>
                </div>
                <button className="button_ChangeRole button_list">
                  Changer le role
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
