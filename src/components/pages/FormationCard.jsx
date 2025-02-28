import React from "react";
import "../../styles/FormationCard/FormationCard.css";

const FormationCard = ({
  title,
  description,
  moreInfoLink,
}) => {

  return (
    <div className="w-25 d-inline-block me-2 p-2 text-center rounded" style={{backgroundColor: "rgba(0,0,255,.1)"}}>
      <h3>{title}</h3>
      <p className="truncateText">{description}</p>

      <button
        id="button_savoir_plus_formation_card"
        onClick={() =>
          window.open(moreInfoLink, "_blank", "noopener,noreferrer")
        }

      >
        En savoir plus
      </button>
    </div>
  );
};

export default FormationCard;
