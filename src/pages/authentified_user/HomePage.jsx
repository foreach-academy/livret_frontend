import React, { useEffect, useState } from 'react';
import '../../styles/HomePage/HomePage.css';
import FormationCard from '../../components/pages/FormationCard';
import EquipeForEach from '../../components/pages/homePage/EquipeForEach';
import StrategicInfo from '../../components/pages/homePage/StrategicInfo';
import DOMPurify from 'dompurify'; // Importation de DOMPurify
import { Link } from 'react-router-dom'; // Importation de Link pour la navigation interne
import TrainingServices from '../../services/TrainingServices';
import Header from '../../components/shared/navbar/Header'


const HomePage = () => {
  const [trainings, setTrainings] = useState([]);
  const [headerHeight, setHeaderHeight] = useState(null);
  const fetchAllTrainings = async () => {
await TrainingServices.fetchAllTrainings(setTrainings);
}

  useEffect(() => {
    fetchAllTrainings();
  }, []);

  useEffect(() => {
    // Déclencher animation au scroll
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // Quand l'élément est visible
        if (entry.isIntersecting) {
          // Ajouter la classe d'animation correspondante
          const classes = entry.target.classList;
          if (classes.contains('presentation-h1')) {
            classes.add('presentation-h1-animation');
          } else if (classes.contains('presentation-section')) {
            classes.add('presentation-section-animation');
          } else if (classes.contains('formation-cards')) {
            classes.add('formation-cards-animation');
          } else if (classes.contains('equipe-member-list')) {
            classes.add('equipe-member-list-animation');
          } else if (classes.contains('strategic-info')) {
            classes.add('strategic-info-animation');
          }
        }
      });
    });

    // Éléments à observer
    const elementsToObserve = [
      '.presentation-h1',
      '.presentation-section',
      '.formation-cards',
      '.equipe-member-list',
      '.strategic-info'
    ];

    elementsToObserve.forEach(selector => {
      const element = document.querySelector(selector);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect(); // Déconnexion de l'observateur lors du démontage
  }, []);

  // Fonction pour sanitiser les liens
  const sanitizeUrl = (url) => {
    return DOMPurify.sanitize(url, { ALLOWED_URI_REGEXP: /^(https?:\/\/[^\s]+)$/ });
  };

  return (
    <>
  <Header setHeaderHeight={setHeaderHeight}/>
      <div className="homepage" style={{height: 'calc(100vh - 80px)'}}>
        <div className="header-image">
          <img src={process.env.PUBLIC_URL + "/images/bg/slider-developpeur-web.jpeg"} alt="Accueil" />
        </div>
        <div className="presentation">
          <h1 className="presentation-h1">Présentation de l'organisme</h1>
          <div className='presentation-section'>
            <p className='presentation-p'>
              À l’origine du projet ForEach Academy, des professionnels du numérique exerçant dans la Région Hauts-de-France, réunis autour de
              valeurs communes. Depuis des années, cette équipe se retrouve à l’occasion de missions, de sessions de formation ou
              d’évènements professionnels. Ils échangent régulièrement sur leurs envies de prendre une part active à la formation initiale et
              permanente dans l’IT, de partager leurs expériences.
            </p>
            <p className='presentation-p' id='link_PresentationP'>
              Ainsi est née <Link id="link_presentationA" to={sanitizeUrl("https://www.foreach-academy.fr")} target="_blank" rel="noopener noreferrer">ForEach Academy...</Link>
            </p>
            <p className='presentation-p'>
              Nous formons et accompagnons de nombreux stagiaires dans leurs projets professionnels.
              Notre rattachement au groupe BAO, dans lequel est également présente l’ESN Symbol IT, nous permet d’intégrer nos offres de
              formations dans l’écosystème numérique de la métropole Lilloise et de bénéficier de l’expertise des collaborateurs de cette ESN
              dans notre équipe pédagogique.
            </p>
          </div>
        </div>
        <div className="text-center mb-5">
          <h2 className='mb-5'>Nos formations</h2>
          <div className="d-flex justify-content-center flex-wrap">
            {trainings && trainings.map((training)=>(
              <FormationCard
                key={training.id}
                title={training.title}
                description={training.description}
                moreInfoLink={`/formations/${training.id}`}
              />
            ))}
          </div>
        </div>
        <EquipeForEach />
        <StrategicInfo />
      </div>
    </>
  );
};

export default HomePage;
