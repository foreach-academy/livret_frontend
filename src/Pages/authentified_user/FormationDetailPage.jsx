import React from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../components/shared/navbar/Navbar';

const FormationDetailPage = () => {
  const { id } = useParams();


  return (
    <div>
      <Navbar/>
      <h1>Détails de la Formation {id}</h1>
      <p>Contenu détaillé de la formation {id}...</p>
      
      <p>Promotion(s) en cours</p>
      
      <p>Anciennes Promotion(s)</p>
    </div>
  );
};

export default FormationDetailPage;
