import React from 'react';
import '../../styles/FormationCard/FormationCard.css';

const FormationCard = ({ title, description, moreInfoLink }) => {
  return (
    <div className="formation-card">
      <div className="card-inner">
        <div className="card-front">
          <h3 id='card-front-font'>{title}</h3>
          <p>{description}</p>
        </div>
        <div className="card-back">
          <button id='button_savoir_plus_formation_card' onClick={() => window.open(moreInfoLink, '_blank', 'noopener,noreferrer')}>
            En savoir plus
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormationCard;
