import React, { useState } from 'react';
import './FormationCard.css';

const FormationCard = ({ title, description, moreInfoLink }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`formation-card ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
      <div className="card-front">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <div className="card-back">
        {/* Modification du onClick pour ouvrir dans un nouvel onglet */}
        <button onClick={() => window.open(moreInfoLink, '_blank', 'noopener,noreferrer')}>
          En savoir plus
        </button>
      </div>
    </div>
  );
};

export default FormationCard;
