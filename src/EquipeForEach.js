// src/EquipeForEach.js
import React from 'react';
import EquipeMember from './EquipeMember';
import './EquipeForEach.css'; // Créez ce fichier CSS pour le style global

const members = [
  {
    photo: 'https://via.placeholder.com/100',
    name: 'Laury BOSSAERT ',
    position: 'Responsable Campus - Référente Handicap',
    email: 'laury.bossaert@foreach-academy.fr'
  },
  {
    photo: 'https://via.placeholder.com/100',
    name: 'Flore WICART ',
    position: 'Référente ARH',
    email: 'flore.wicart@foreach-academy.fr'
  },
  {
    photo: 'https://via.placeholder.com/100',
    name: 'Hugo SANCHEZ ',
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
