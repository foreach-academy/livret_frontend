import React, { forwardRef, useEffect, useState } from 'react';
import EquipeMember from './EquipeMember';
import '../../../styles/EquipeForEach/EquipeForEach.css'; 
import DOMPurify from 'dompurify';
import UserServices from '../../../services/UserServices';

// const members = [
//   {
//     photo: process.env.PUBLIC_URL + "/images/workers/laury.jpg", 
//     name: 'Laury BOSSAERT',
//     position: 'Responsable Campus - Référente Handicap',
//     email: 'laury.bossaert@foreach-academy.fr'
//   },
//   {
//     photo: process.env.PUBLIC_URL + "/images/workers/flore.png", 
//     name: 'Flore WICART',
//     position: 'Conseillère formation',
//     email: 'flore.wicart@foreach-academy.fr'
//   },
//   {
//     photo: process.env.PUBLIC_URL + "/images/workers/ines.png", 
//     name: 'Inès HIMOUR',
//     position: 'Assistante administrative',
//     email: 'ines.himour@foreach-academy.fr'
//   }
// ];




// Utiliser forwardRef pour accepter une ref
const EquipeForEach = forwardRef((props, ref) => {
  const [members,SetMembers] = useState([]);

const fetchMembersByRole = async () => {
  const response = await UserServices.getUserByRole(1)
  SetMembers(response.data)
  console.log(response.data)
}

useEffect(() => {
fetchMembersByRole()
}, []);
  return (
    <div className="equipe-for-each" ref={ref}>
      <h2>Equipe ForEach Academy</h2>
      <div className="equipe-member-list">
        {members.map((member, index) => (
          <EquipeMember
            key={index}
            photo={member.photo}
            name={`${member.firstname} ${member.lastname}`}
            position={member.position}
            email={DOMPurify.sanitize(member.email)} 
          />
        ))}
      </div>
    </div>
  );
});

export default EquipeForEach;
