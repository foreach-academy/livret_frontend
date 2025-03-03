import React from "react";
import "../../styles/FormationCard/FormationCard.css";
import Card from 'react-bootstrap/Card';
import Button from "../shared/Button"
import { useNavigate } from "react-router-dom";

const FormationCard = ({
  title,
  description,
  url
}) => {
  const navigate = useNavigate();

  return (
<Card className="m-4 rounded" style={{ width: '18rem' }}>
<Card.Body className="bg-fe-black-blue rounded d-flex flex-column align-items-center text-center">
  <Card.Title className="text-white">{title}</Card.Title>
  <Card.Text  className="text-white truncateText">
{description}
  </Card.Text>
  <Button 
  buttonTitle="En savoir plus"
  className="bg-fe-orange"
  setAction={() => navigate(`/${url}`)}
  />
</Card.Body>
</Card>
  );
};

export default FormationCard;
