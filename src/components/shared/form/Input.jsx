import React from 'react'

function Input({labelName,type,value,changeFunction}) {
  return (
    <>
     <div className="input-group d-flex flex-column color-black-text">
    <label>{labelName}</label>
    <input type={type} value={value} onChange={changeFunction} />
    </div>
    </>
  )
}

export default Input