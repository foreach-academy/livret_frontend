// src/EquipeMember.js
import React from 'react';
import './EquipeMember.css';

const EquipeMember = ({ photo, name, position, email }) => {
  return (
    <div className="equipe-member">
      <img src={photo} alt={name} className="equipe-member-photo" />
      <div className="equipe-member-info">
        <h3 className="equipe-member-name">{name}</h3>
        <p className="equipe-member-position">{position}</p>
        <p className="equipe-member-email">{email}</p>
      </div>
    </div>
  );
};

export default EquipeMember;
