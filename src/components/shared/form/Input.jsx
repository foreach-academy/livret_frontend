import React from "react";

function Input({ labelName, type, value, changeFunction, className }) {
  return (
    <div className={`d-flex flex-column ${className}`}>
      <label>{labelName}</label>
      <input className="p-1" type={type} value={value} onChange={changeFunction} />
    </div>
  );
}

export default Input;
