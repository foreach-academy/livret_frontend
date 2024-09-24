import React, { useEffect } from 'react';
import illustrationErrorPage from "../../assets/images/illustration-404.svg";
import "../../styles/ErrorPage/error-page.css"
import { useNavigate } from "react-router-dom"

function ErrorPage() {
  const navigate = useNavigate();
  const navigateTo = (route) => {
    navigate(route);
    window.scrollTo(0, 0);
  }
  useEffect(()=> {
      document.body.style.backgroundColor = "rgb(249, 246, 246)";
    return () => {
      document.body.style.backgroundColor = "";
    }
  }, [])
  return (
    <section className='error-page-section'>
      <div className='error-page-image'>
        <img src={illustrationErrorPage} alt='illustration 404'/>
      </div>
      <div className='error-page-content'>
        <p className='error-page-title'>Cette page n'existe pas</p>
        <button className='primary-button' onClick={() => navigateTo('/')}>Retour à la page d'accueil</button>
      </div>
    </section>
  );
}

export default ErrorPage;
