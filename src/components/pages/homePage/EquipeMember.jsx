import React from 'react';
import '../../../styles/EquipeMember/EquipeMember.css';
import { Card } from 'react-bootstrap';


const EquipeMember = ({ photo, name, position, email }) => {
  return (
    <Card className="m-4 rounded" style={{width:"15rem", height:"25rem" }}>
    {photo ? <Card.Img variant="top" src={photo} /> : <Card.Img variant="top" src="/images/workers/fe-avatar.png" />}
    <Card.Body className="bg-fe-black-blue rounded-bottom d-flex flex-column align-items-center">
      <Card.Title className="text-white fw-bold ">{name}</Card.Title>
      <Card.Text  className="text-white fst-italic truncateText  d-flex flex-column align-items-center">
        {position}<br />
    <span className="text-orange"> {email}</span>
      </Card.Text>
    </Card.Body>
    </Card>
  );
};

export default EquipeMember;
