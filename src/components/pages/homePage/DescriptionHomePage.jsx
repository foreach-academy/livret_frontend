import React from 'react'
import { Link } from 'react-router-dom'
import DOMPurify from 'dompurify'; 


function DescriptionHomePage() {
    const sanitizeUrl = (url) => {
        return DOMPurify.sanitize(url, { ALLOWED_URI_REGEXP: /^(https?:\/\/[^\s]+)$/ });
      };
  return (
    <div className='d-flex flex-column align-items-center' >
    <h1 >Présentation de l'organisme</h1>
    <div >
      <p className='d-flex flex-column align-items-center p-3'>
        À l’origine du projet ForEach Academy, des professionnels du numérique exerçant dans la Région Hauts-de-France, réunis autour de
        valeurs communes. Depuis des années, cette équipe se retrouve à l’occasion de missions, de sessions de formation ou
        d’évènements professionnels. Ils échangent régulièrement sur leurs envies de prendre une part active à la formation initiale et
        permanente dans l’IT, de partager leurs expériences.
      </p>
      <p className='d-flex flex-column align-items-center p-3'>
        Ainsi est née <Link id="link_presentationA" to={sanitizeUrl("https://www.foreach-academy.fr")} target="_blank">ForEach Academy...</Link>
      </p>
      <p className='d-flex flex-column align-items-center p-3'>
        Nous formons et accompagnons de nombreux stagiaires dans leurs projets professionnels.
        Notre rattachement au groupe BAO, dans lequel est également présente l’ESN Symbol IT, nous permet d’intégrer nos offres de
        formations dans l’écosystème numérique de la métropole Lilloise et de bénéficier de l’expertise des collaborateurs de cette ESN
        dans notre équipe pédagogique.
      </p>
    </div>
  </div>
  )
}

export default DescriptionHomePage