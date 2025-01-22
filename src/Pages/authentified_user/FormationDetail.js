import React from 'react';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';

const FormationDetail = () => {
  const { id } = useParams();

  // Validation basique de l'ID (ici, on s'attend à ce que ce soit un nombre)
  const sanitizedId = DOMPurify.sanitize(id); // Nettoyage du paramètre

  if (!/^\d+$/.test(sanitizedId)) {
    // Si l'ID n'est pas un nombre valide, on peut afficher un message d'erreur ou rediriger
    return <div>Erreur: ID de formation invalide.</div>;
  }

  return (
    <div>
      <h1>Détails de la Formation {sanitizedId}</h1>
      <p>Contenu détaillé de la formation {sanitizedId}...</p>
    </div>
  );
};

export default FormationDetail;
