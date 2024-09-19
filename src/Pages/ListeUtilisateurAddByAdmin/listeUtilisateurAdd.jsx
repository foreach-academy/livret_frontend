import {React, useState} from 'react';
import './ListeUtilisateurAdd.css'; 

const UserList = () => {
  return (
    <>
      <div id="premiere_ligne_liste">
        <button id="button_addUser" class="button_list">
          Ajouter un utilisateur
        </button>
        <h1 id="list_userAndAdd">Liste des utilisateurs</h1>
      </div>
      <div id="contener_list">
        <div class="title_user_list_contener">
          <h2 class="title_user_list">Liste des Formateurs</h2>
          <div class="display_column_block_users">
            <div class="block_user">
              <div class="info_user">
                <p>Nom utilisateur</p>
                <p>Role</p>
              </div>
              <button class="button_ChangeRole button_list">
                Changer le role
              </button>
            </div>
            <div class="block_user">
              <div class="info_user">
                <p>Nom utilisateur</p>
                <p>Role</p>
              </div>
              <button class="button_ChangeRole button_list">
                Changer le role
              </button>
            </div>
          </div>
          <div class="display_column_block_users">
            <div class="block_user">
              <div class="info_user">
                <p>Nom utilisateur</p>
                <p>Role</p>
              </div>
              <button class="button_ChangeRole button_list">
                Changer le role
              </button>
            </div>
            <div class="block_user">
              <div class="info_user">
                <p>Nom utilisateur</p>
                <p>Role</p>
              </div>
              <button class="button_ChangeRole button_list">
                Changer le role
              </button>
            </div>
          </div>
        </div>
        <div class="title_user_list_contener">
          <h2 class="title_user_list">Liste des Apprenants</h2>
          <div class="display_column_block_users">
            <div class="block_user">
              <div class="info_user">
                <p>Nom utilisateur</p>
                <p>Role</p>
              </div>
              <button class="button_ChangeRole button_list">
                Changer le role
              </button>
            </div>
            <div class="block_user">
              <div class="info_user">
                <p>Nom utilisateur</p>
                <p>Role</p>
              </div>
              <button class="button_ChangeRole button_list">
                Changer le role
              </button>
            </div>
          </div>
          <div class="display_column_block_users">
            <div class="block_user">
              <div class="info_user">
                <p>Nom utilisateur</p>
                <p>Role</p>
              </div>
              <button class="button_ChangeRole button_list">
                Changer le role
              </button>
            </div>
            <div class="block_user">
              <div class="info_user">
                <p>Nom utilisateur</p>
                <p>Role</p>
              </div>
              <button class="button_ChangeRole button_list">
                Changer le role
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default UserList;