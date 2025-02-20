import React from 'react'

function Input({labelName,type,value,changeFunction, className}) {
  return (
    <>
     <div className={`input-group d-flex flex-column  ${className} `}>
    <label>{labelName}</label>
    <input type={type} value={value} onChange={changeFunction} />
    </div>
    </>
  )
}

export default Input