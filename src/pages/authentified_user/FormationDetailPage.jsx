import React from 'react';
import { useParams } from 'react-router-dom';


const FormationDetailPage = () => {
  const { id } = useParams();


  return (
    <div>

      <h1>Détails de la Formation {id}</h1>
      <p>Contenu détaillé de la formation {id}...</p>
      
      <p>Promotion(s) en cours</p>
      
      <p>Anciennes Promotion(s)</p>
    </div>
  );
};

export default FormationDetailPage;
