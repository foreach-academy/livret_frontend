// src/FormationDetail.js
import React from 'react';
import { useParams } from 'react-router-dom';

const FormationDetail = () => {
  const { id } = useParams();

  return (
    <div>
      <h1>Détails de la Formation {id}</h1>
      <p>Contenu détaillé de la formation {id}...</p>
    </div>
  );
};

export default FormationDetail;
