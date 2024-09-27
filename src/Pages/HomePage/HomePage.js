import React, { useEffect } from 'react';
import '../../styles/HomePage/HomePage.css'; 
import FormationCard from '../../components/FormationCard/FormationCard';
import EquipeForEach from '../../components/EquipeForEach/EquipeForEach';
import StrategicInfo from '../../components/StrategicInfo/StrategicInfo'; 
import headerImage from '../../assets/images/slider-developpeur-web.jpeg'; 

const HomePage = () => {

  useEffect(() => {
    // Déclencher animation au scroll
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // Quand l'élément est visible
        if (entry.isIntersecting) {
          // Ajouter la classe d'animation correspondante
          if (entry.target.classList.contains('presentation-h1')) {
            entry.target.classList.add('presentation-h1-animation');
          } else if (entry.target.classList.contains('presentation-p')) {
            entry.target.classList.add('presentation-p-animation');
          } else if (entry.target.classList.contains('formation-cards')) {
            entry.target.classList.add('formation-cards-animation');
          } else if (entry.target.classList.contains('equipe-member-list')) {
            entry.target.classList.add('equipe-member-list-animation');
          } else if (entry.target.classList.contains('strategic-info')) {
            entry.target.classList.add('strategic-info-animation');
          }
        }
      });
    });
    
    observer.observe(document.querySelector('.presentation-h1'));
    observer.observe(document.querySelector('.presentation-p'));
    observer.observe(document.querySelector('.formation-cards'));
    observer.observe(document.querySelector('.equipe-member-list'));
    observer.observe(document.querySelector('.strategic-info'));

  }, []);

  return (
    <div className="homepage">
      <div className="header-image">
        <img src={headerImage} alt="Accueil" />
      </div>
      <div className="presentation">
        <h1 className="presentation-h1">Présentation de l'organisme</h1>
        <p className='presentation-p'>
          À l’origine du projet ForEach Academy, des professionnels du numérique exerçant dans la Région Hauts-de-France, réunis autour de
          valeurs communes. Depuis des années, cette équipe se retrouve à l’occasion de missions, de sessions de formation ou
          d’évènements professionnels. Ils échangent régulièrement sur leurs envies de prendre une part active à la formation initiale et
          permanente dans l’IT, de partager leurs expériences.
        </p>
        <p className='presentation-p' id='link_PresentationP'>Ainsi est née <a id="link_presentationA" href="https://www.foreach-academy.fr" target="_blank" rel="noopener noreferrer">ForEach Academy...</a></p>
        <p className='presentation-p'>
          Nous formons et accompagnons de nombreux stagiaires dans leurs projets professionnels.
          Notre rattachement au groupe BAO, dans lequel est également présente l’ESN Symbol IT, nous permet d’intégrer nos offres de 
          formations dans l’écosystème numérique de la métropole Lilloise et de bénéficier de l’expertise des collaborateurs de cette ESN 
          dans notre équipe pédagogique.
        </p>
      </div>
      <div className="formations">
        <h2>Nos formations</h2>
        <div className="formation-cards">
          <FormationCard
            title=""
            description="Titre Assistant Ressources Humaines option IT, 1 an en alternance, Bac+2"
            moreInfoLink="/formations/1"
          />
          <FormationCard
            title=""
            description="Bachelor Concepteur développeur d’applications. En 2 ans, à destination des étudiants post-baccalauréat en formation initiale Bac+4"
            moreInfoLink="/formations/2"
          />
          <FormationCard
            title=""
            description="Mastère Architecte Web, 15 mois en alternance, Bac+5"
            moreInfoLink="/formations/3"
          />
        </div>
      </div>
      <EquipeForEach /> 
      <StrategicInfo />
    </div>
  );
};

export default HomePage;
