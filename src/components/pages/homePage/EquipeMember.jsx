import React from 'react';
import '../../../styles/EquipeMember/EquipeMember.css';
import DOMPurify from 'dompurify';

const EquipeMember = ({ photo, name, position, email }) => {
  return (
    <div className="equipe-member">
      <img src={photo} alt={name} className="equipe-member-photo" />
      <div className="equipe-member-info">
        <h3 className="equipe-member-name">{name}</h3>
        <p className="equipe-member-position">{position}</p>
        <p className="equipe-member-email">{DOMPurify.sanitize(email)}</p>
      </div>
    </div>
  );
};

export default EquipeMember;
