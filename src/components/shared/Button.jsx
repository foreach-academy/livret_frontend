import React from "react";

const Button = ({ buttonTitle, className, setAction, type}) => {
  return (
    <button
      className={`d-inline-block p-2 m-1 rounded bg-foreach pointer text-white  ${
        className && className
      }`}
      onClick={setAction}
      type={type}
    >
      {buttonTitle}
    </button>
  );
};

export default Button;
