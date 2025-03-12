import React, { useState } from 'react'
import Header from '../components/shared/navbar/Header'
import Input from '../components/shared/form/Input';
import Button from '../components/shared/Button';
import AuthenticateService from '../services/AuthenticateServices';
import { useNavigate } from 'react-router-dom';

function ForgetPassword() {
  const [headerHeight, setHeaderHeight] = useState(null);
  const [user, setUser] = useState({ email: "" });
  const navigate = useNavigate()

  const forgetMail = async (e) => {
    e.preventDefault();
    await AuthenticateService.sendForgotPasswordMail(user, navigate)
  }
  return (
    <>
      <Header setHeaderHeight={setHeaderHeight} />
      <div className="d-flex justify-content-center flex-column align-items-center mt-5 form_blue_contener bg-fe-blue">
        <span className='d-flex mb-2'>Pour générer votre nouveau mot de passe, veuillez renseigner votre adresse mail</span>
        <Input
          labelName="Email"
          type="email"
          value={user.email}
          changeFunction={(e) => setUser((prevState) => ({ ...prevState, email: e.target.value }))}
          className="color-black-text align-items-center"
          required={true}
        />
        <Button type="form" buttonTitle="Mot de passe oublié" setAction={(e) => forgetMail(e)} className="bg-fe-orange" />
      </div>
    </>
  )
}

export default ForgetPassword