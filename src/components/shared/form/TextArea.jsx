import React from 'react'

function TextArea({value, onChange}) {
  return (
    <textarea value={value} onChange={onChange}/>
  )
}

export default TextArea