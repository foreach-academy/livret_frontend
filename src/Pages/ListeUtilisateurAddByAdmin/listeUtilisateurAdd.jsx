import {React, useState} from 'react';
import './ListeUtilisateurAdd.css'; 

const UserList = () => {
  return <>
  <div id='premiere_ligne_liste'>
    <button id='button_addUser' class="button_list">Ajouter un utilisateur</button>
    <h1 id='list_userAndAdd'>Liste des utilisateurs</h1>
  </div>
  <div id='contenu_liste'>
    <div class="block_utilisateur">
      <div class="info_utilisateur">
        <p>Nom utilisateur</p>
        <p>Role</p>
      </div>
      <button class="button_ChangeRole button_list">Changer le role</button>
    </div>
    <div class="block_utilisateur">
      <div class="info_utilisateur">
        <p>Nom utilisateur</p>
        <p>Role</p>
      </div>
      <button  class="button_ChangeRole button_list">Changer le role</button>
    </div>
  </div>
  </>
}
export default UserList;