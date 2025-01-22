import React, { useEffect } from 'react';
import "../styles/ErrorPage/error-page.css"
import { useNavigate } from "react-router-dom"
import { navigateTo } from '../utils/navigate';
import { FRONT_HOME_PAGE } from '../utils/frontUrl';

function ErrorPage() {
  const navigate = useNavigate();

  useEffect(()=> {
      document.body.style.backgroundColor = "rgb(249, 246, 246)";
    return () => {
      document.body.style.backgroundColor = "";
    }
  }, [])
  return (
    <section className='error-page-section'>
      <div className='error-page-image'>
        <img src={process.env.PUBLIC_URL + "/images/illustration-404.png"} alt='illustration 404'/>
      </div>
      <div className='error-page-content'>
        <p className='error-page-title'>Cette page n'existe pas</p>
        <button className='primary-button' onClick={() => navigateTo(FRONT_HOME_PAGE, navigate)}>Retour à la page d'accueil</button>
      </div>
    </section>
  );
}

export default ErrorPage;
