import React from 'react';
import '../../styles/AddUser/AddUser.css';

function AddUser() {
  return <>
    <h1 class="title_Pages">Ajouter un utilisateur</h1>
    <div id='form_add_contener'>
        <form id='form_add'>
            <label class="label_add" htmlFor="">First name</label>

            <input class="input_add" type="text"  />

            <label id='surname_label_add' class="label_add at_second_label" htmlFor="">Surname</label>

            <input class="input_add"  type="text"  />

            <label id='email_label_add' class="label_add at_second_label" htmlFor="">Email</label>

            <input class="input_add" type="email" />

            <label htmlFor="" id='promo_label_add' class='label_add at_second_label'>Promo</label>

            <input type="text" class="input_add"/>

            <label htmlFor="" id='role_label_add' class="label_add at_second_label">Role</label>

            <select name="role" id="role_select_add">
              <option value="Apprenant" default>Apprenant</option>
              <option value="Formateur">Formateur</option>
              <option value="Admin">Admin</option>
            </select>

            <label id='company_label_add' class="label_add at_second_label" htmlFor="">Company</label>

            <input class="input_add" type="text" />

            <label id='password_label_add' class="label_add at_second_label" htmlFor="">Password</label>

            <input class="input_add" type="password" />

            <label id='confirm_label_add' class= "at_second_label" htmlFor="">Confirm Password</label>

            <input class="input_add" type="password" />

            <button id='button_submit_add_user' type='submit'>Ajouter l'utilisateur</button>
        </form>
    </div>
  </>
}

export default AddUser