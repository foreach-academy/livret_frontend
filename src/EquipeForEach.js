// src/EquipeForEach.js
import React from 'react';
import EquipeMember from './EquipeMember';
import './EquipeForEach.css'; // Créez ce fichier CSS pour le style global

// Importez les images
import lauryPhoto from './assets/images/IMG_2147.jpg';
import florePhoto from './assets/images/Flore-1024x1018.png';
import hugoPhoto from './assets/images/Copie_de_brown_white_elegant_welcome_to_our_shop_Instagram_Post.png';

const members = [
  {
    photo: lauryPhoto, // Utilisez l'import pour les images
    name: 'Laury BOSSAERT',
    position: 'Responsable Campus - Référente Handicap',
    email: 'laury.bossaert@foreach-academy.fr'
  },
  {
    photo: florePhoto, // Utilisez l'import pour les images
    name: 'Flore WICART',
    position: 'Référente ARH',
    email: 'flore.wicart@foreach-academy.fr'
  },
  {
    photo: hugoPhoto, // Utilisez l'import pour les images
    name: 'Hugo SANCHEZ',
    position: 'Référent CDA-Assistante administrative',
    email: 'hugo.sanchez@foreach-academy.fr'
  }
];

const EquipeForEach = () => {
  return (
    <div className="equipe-for-each">
      <h2>Equipe ForEach</h2>
      <div className="equipe-member-list">
        {members.map((member, index) => (
          <EquipeMember
            key={index}
            photo={member.photo}
            name={member.name}
            position={member.position}
            email={member.email}
          />
        ))}
      </div>
    </div>
  );
};

export default EquipeForEach;
