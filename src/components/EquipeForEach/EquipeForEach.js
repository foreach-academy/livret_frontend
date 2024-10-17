import React, { forwardRef } from 'react';
import EquipeMember from '../EquipeMember/EquipeMember';
import '../../styles/EquipeForEach/EquipeForEach.css'; 
import DOMPurify from 'dompurify';

import lauryPhoto from '../../assets/images/IMG_2147.jpg';
import florePhoto from '../../assets/images/Flore-1024x1018.png';
import inesPhoto from '../../assets/images/img_ines_forEach_Livret.png';

const members = [
  {
    photo: lauryPhoto, 
    name: 'Laury BOSSAERT',
    position: 'Responsable Campus - Référente Handicap',
    email: 'laury.bossaert@foreach-academy.fr'
  },
  {
    photo: florePhoto, 
    name: 'Flore WICART',
    position: 'Conseillère formation',
    email: 'flore.wicart@foreach-academy.fr'
  },
  {
    photo: inesPhoto,
    name: 'Inès HIMOUR',
    position: 'Assistante administrative',
    email: 'ines.himour@foreach-academy.fr'
  }
];

// Utiliser forwardRef pour accepter une ref
const EquipeForEach = forwardRef((props, ref) => {
  return (
    <div className="equipe-for-each" ref={ref}>
      <h2>Equipe ForEach Academy</h2>
      <div className="equipe-member-list">
        {members.map((member, index) => (
          <EquipeMember
            key={index}
            photo={member.photo}
            name={member.name}
            position={member.position}
            email={DOMPurify.sanitize(member.email)} 
          />
        ))}
      </div>
    </div>
  );
});

export default EquipeForEach;
