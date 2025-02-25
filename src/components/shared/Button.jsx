import React from "react";

const Button = ({ buttonTitle, className, setAction }) => {
  return (
    <span
      className={`d-inline-block p-2 m-1 rounded bg-foreach pointer text-white ${
        className && className
      }`}
      onClick={setAction}
    >
      {buttonTitle}
    </span>
  );
};

export default Button;
