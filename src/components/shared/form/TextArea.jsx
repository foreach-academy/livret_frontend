import React from 'react'

function TextArea({ value, onChange, labelName, required }) {
  return (
    <div className="d-flex flex-column">
      {labelName && (
        <label className='fw-bold'>
          {labelName} {required && <span style={{ color: "red" }}>*</span>}
        </label>
      )}
      <textarea value={value} onChange={onChange} required={required} className="p-1" />
    </div>
  )
}

export default TextArea;
