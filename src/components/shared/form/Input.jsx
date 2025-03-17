import React from "react";

function Input({ labelName, type, value, changeFunction, className, placeholder, required , min , max }) {
  return (
    <div className={`d-flex flex-column ${className}`}>
      {labelName && (
        <label className="fw-bold">
          {labelName} {required && <span style={{ color: "red" }}>*</span>}
        </label>
      )}
      <input
        placeholder={placeholder}
        className="p-1"
        type={type}
        value={value}
        onChange={changeFunction}
        required={required}
        min={min}
        max={max}
      />
    </div>
  );
}

export default Input;
