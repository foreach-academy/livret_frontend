import React, { useState } from "react";

const Accordion = ({ accordionLabel, accordionColor, children }) => {
  const [isDisplayed, setIsDisplayed] = useState(false);

  return (
    <div className="mt-3">
      <div
        className={`d-flex justify-content-between p-2 pointer text-white ${accordionColor ? accordionColor : "bg-fe-gray"} ${
          isDisplayed === false ? "rounded" : "rounded-top"
        }`}
        onClick={() => {
          setIsDisplayed(!isDisplayed);
        }}
      >
        <span>{accordionLabel}</span>
        <span className="material-symbols-outlined text-white">keyboard_arrow_down</span>{" "}
      </div>
      {isDisplayed && <div className="p-2 border bg-fe-light-gray">{children}</div>}
    </div>
  );
};

export default Accordion;
