import React from 'react';
import '../../../styles/EquipeMember/EquipeMember.css';
import { Card } from 'react-bootstrap';


const EquipeMember = ({ photo, name, position, email }) => {
  return (
    <Card className="m-4 rounded" style={{ width: '18rem' }}>
    {photo && <Card.Img variant="top" src={photo} />}
    <Card.Body className="bg-fe-black-blue rounded-bottom">
      <Card.Title className="text-white fw-bold">{name}</Card.Title>
      <Card.Text  className="text-white fst-italic truncateText">
        {position}<br />
    <span className="text-orange"> {email}</span>
      </Card.Text>
    </Card.Body>
    </Card>
  );
};

export default EquipeMember;
