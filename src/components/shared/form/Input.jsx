import React from "react";

function Input({ labelName, type, value, changeFunction, className, placeholder }) {
  return (
    <div className={`d-flex flex-column ${className}`}>
      {labelName && <label>{labelName}</label>}
      <input
        placeholder={placeholder && placeholder}
        className="p-1"
        type={type}
        value={value}
        onChange={changeFunction}
      />
    </div>
  );
}

export default Input;
