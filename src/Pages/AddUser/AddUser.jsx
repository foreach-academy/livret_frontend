import React from 'react';
import './AddUser.css';

function AddUser() {
  return <>
    <h1 class="title_Pages">Ajouter un utilisateur</h1>
    <div id='form_add_contener'>
        <form id='form_add'>
            <label class="label_add" htmlFor="">First name</label>

            <input class="input_add" type="text" placeholder="Le prenom de l'utilisateur.." />

            <label class="label_add" htmlFor="">Surname</label>

            <input class="input_add"  type="text" placeholder="Le nom de l'utilisateur.." />

            <label class="label_add" htmlFor="">Email</label>

            <input class="input_add" type="email" placeholder="L'email de l'utilisateur" />
        </form>
    </div>
  </>
}

export default AddUser