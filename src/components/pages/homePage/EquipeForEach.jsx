import React, { forwardRef, useEffect, useState } from 'react';
import EquipeMember from './EquipeMember';
import '../../../styles/EquipeForEach/EquipeForEach.css'; 
import DOMPurify from 'dompurify';
import UserServices from '../../../services/UserServices';
import RoleServices from '../../../services/RoleServices';
import { admin } from '../../../utils/roleList';

const EquipeForEach = forwardRef((props, ref) => {
  const [members,SetMembers] = useState([]);
  const [roles, setRoles] = useState([]);
  const AdminRole = roles.find(role => role.name === admin);

  console.log(AdminRole)
  const fetchMembersByRole = async () => {

  const response = await UserServices.getUserByRole(AdminRole.id)
  SetMembers(response.data)
}

useEffect(() => {
  RoleServices.fetchAllRoles(setRoles);
}, []);

useEffect(() => {
  if (AdminRole) {
    fetchMembersByRole();
  }
}, [AdminRole]);
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
